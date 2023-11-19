'use client'

import { useControls } from '@/lib/stores/useControls';
import * as SPLAT from 'gsplat'
import { useEffect, useRef, useState } from 'react';
interface CanvasProps {
    splatUrl?: string
    cameraParams: {
        near?: number;
        far?: number;
        fov?: number;
        aspect?: number;
        position?: { x: number; y: number; z: number };
        rotation?: { x: number; y: number; z: number };
    };
}
const Canvas: React.FC<CanvasProps> = ({ splatUrl }) => {
    const {
        near, setNear,
        far, setFar,
        fov, setFov,
        center, setCenter,
        setCameraPosition, cameraPosition,
        setCameraRotation, cameraRotation
    } = useControls();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const [url, setUrl] = useState<string | "">(splatUrl || "");
    const scene = useRef<SPLAT.Scene>(new SPLAT.Scene());
    const camera = useRef<SPLAT.Camera>(new SPLAT.Camera());
    const renderer = useRef<SPLAT.WebGLRenderer | null>(null);
    const controls = useRef<SPLAT.OrbitControls | null>(null);
    // const [cameraNear, setCameraNear] = useState(0.1);
    // const [cameraFar, setCameraFar] = useState(1000);



    useEffect(() => {
        const initSplatScene = async () => {
            renderer.current = new SPLAT.WebGLRenderer();

            camera.current.near = near; // Near clipping plane
            camera.current.far = far; // Far clipping plane

            // setFov(fov);
            const width = renderer.current.domElement.clientWidth; // Width of the canvas
            const height = renderer.current.domElement.clientHeight; // Height of the canvas
            const fx = 0.5 * width / Math.tan(0.5 * fov * Math.PI / 180);
            const fy = 0.5 * height / Math.tan(0.5 * fov * Math.PI / 180);
            camera.current.fx = fx;
            camera.current.fy = fy;

            // Update the camera
            camera.current.update(width, height);

            // Initialize the controls
            controls.current = new SPLAT.OrbitControls(camera.current!, renderer.current!.domElement);

            // Set the center of the scene

            // Load the scene from the URL
            if (url) { // Check if url is defined
                await SPLAT.Loader.LoadAsync(url, scene.current, () => { });
            } else {
                console.error('URL is undefined');
            }

            // Define the frame function
            const frame = () => {
                setCameraPosition({
                    x: camera.current.position.x,
                    y: camera.current.position.y,
                    z: camera.current.position.z
                });

                setCameraRotation({
                    x: camera.current.rotation.x,
                    y: camera.current.rotation.y,
                    z: camera.current.rotation.z
                });

                setNear(camera.current.near);
                setFar(camera.current.far);

                // Calculate the new position of the camera
                if (!controls.current) {

                    const time = Date.now() * 0.001;
                    const x = Math.sin(time) * 1;
                    const y = center.y;
                    const z = Math.cos(time) * 1;

                    // Set the new position of the camera
                    camera.current.position.set(x, y, z);

                    // Create a rotation quaternion
                    const euler = new SPLAT.Vector3(0.01, 0.05, 0.02); // Rotation of 0.01 radians about the x-axis
                    const quaternion = SPLAT.Quaternion.FromEuler(euler);

                    // Apply the rotation to the camera
                    camera.current.rotation = camera.current.rotation.multiply(quaternion);

                    const fov = 75 + Math.sin(time) * 25; // Change the field of view over time
                    const width = renderer.current!.domElement.clientWidth; // Width of the canvas
                    const height = renderer.current!.domElement.clientHeight; // Height of the canvas
                    const fx = 0.5 * width / Math.tan(0.5 * fov * Math.PI / 180);
                    const fy = 0.5 * height / Math.tan(0.5 * fov * Math.PI / 180);
                    camera.current.fx = fx;
                    camera.current.fy = fy;
                }

                // // Update the controls and render the scene
                controls.current?.update();
                renderer.current?.render(scene.current!, camera.current!);

                // Request the next frame
                requestAnimationFrame(frame);
            };

            // Start the render loop
            requestAnimationFrame(frame);
        };
        if (typeof window !== 'undefined') {
            initSplatScene();
            if (
                canvasRef.current &&
                canvasRef.current instanceof HTMLDivElement &&
                renderer.current &&
                controls.current &&
                !canvasRef.current.contains(renderer.current.domElement)
            ) {
                canvasRef.current.appendChild(renderer.current.domElement);
            }
        }
        return () => {

        };
    }, [url]);


    return (
        <>

            <canvas
                ref={canvasRef}
            ></canvas>
        </>
    )
}

export default Canvas


