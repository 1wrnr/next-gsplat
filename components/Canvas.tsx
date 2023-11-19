'use client'

import { useControls } from '@/lib/stores/useControls';
import * as SPLAT from 'gsplat'
import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from "@uidotdev/usehooks";
import { useWebGLRenderer } from '@/lib/hooks/useWebGLRenderer';
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
    const renderer = useWebGLRenderer();
    const camera = useRef<SPLAT.Camera>(new SPLAT.Camera());
    const { near, far, fov, camera } = useControls();
    useEffect(() => {
        camera.current.near = near;
        camera.current.far = far;
        camera.current.fov = fov;
        camera.current.position = cameraPosition;
        camera.current.rotation = cameraRotation;
    }, [near, far, fov, cameraPosition, cameraRotation]);


    // const { width, height } = useWindowSize();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const [url, setUrl] = useState<string | "">(splatUrl || "");
    const scene = useRef<SPLAT.Scene>(new SPLAT.Scene());
    const camera = useRef<SPLAT.Camera>(new SPLAT.Camera());
    // const renderer = useRef<SPLAT.WebGLRenderer | null>(null);
    const controls = useRef<SPLAT.OrbitControls | null>(null);
    renderer.current = new SPLAT.WebGLRenderer();

    const handleResize = () => {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };





    useEffect(() => {
        const initSplatScene = async () => {

            camera.current.near = near; // Near clipping plane
            camera.current.far = far; // Far clipping plane
            controls.current = new SPLAT.OrbitControls(camera.current!, renderer.current!.domElement);

            if (url) { // Check if url is defined
                // await SPLAT.Loader.LoadAsync(url, scene.current, () => { });
                await SPLAT.Loader.LoadAsync(url, scene.current, (progress) => (progressIndicator.value = progress * 100));
            } else {
                console.error('URL is undefined');
            }

            if (renderer.current && camera.current && width && height) {
                const fx = 0.5 * width / Math.tan(0.5 * fov * Math.PI / 180);
                const fy = 0.5 * height / Math.tan(0.5 * fov * Math.PI / 180);
                camera.current.fx = fx;
                camera.current.fy = fy;
                camera.current.update(width, height);
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
    }, [url, fov, near, far, cameraPosition, cameraRotation, setCameraPosition, setCameraRotation, setNear, setFar]);


    return (
        <>
            <canvas
                ref={canvasRef}
            ></canvas>
        </>
    )
}

export default Canvas


