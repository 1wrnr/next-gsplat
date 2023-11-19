'use client'

import { useWebGLRenderer } from '@/lib/hooks/useWebGLRenderer';
import * as SPLAT from 'gsplat'
import { useEffect, useRef, useState } from 'react';
interface SplatCanvasProps {
    splatUrl?: string
}
const SplatCanvas = ({ splatUrl }: SplatCanvasProps) => {

    const [hasWindow, setHasWindow] = useState(false);
    const canvasRef = useRef<HTMLDivElement | null>(null);
    const scene = useRef<SPLAT.Scene>(new SPLAT.Scene());
    const camera = useRef<SPLAT.Camera>(new SPLAT.Camera());
    const renderer = useWebGLRenderer();
    // const renderer = useRef<SPLAT.WebGLRenderer | null>(null);
    const controls = useRef<SPLAT.OrbitControls | null>(null);

    useEffect(() => {
        // i want the camera to rotate around the center of the scene
        // so i need to find the center of the scene

        const initSplatScene = async () => {
            controls.current = new SPLAT.OrbitControls(camera.current!, renderer.current!.domElement);

            const url =
                'https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/bonsai-7k.splat';

            await SPLAT.Loader.LoadAsync(url, scene.current, () => { });

            const handleResize = () => {
                if (typeof window !== 'undefined' && renderer.current !== null) {
                    renderer.current.setSize(window.innerWidth, window.innerHeight);
                }
            }
            const frame = () => {
                handleResize();
                controls.current!.update();
                renderer.current!.render(scene.current!, camera.current!);
                requestAnimationFrame(frame);
            };

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
    }, []);

    return (
        <>
            {hasWindow &&
                <div className="border-2 border-red-500 border-dotted" ref={canvasRef} />
            }
        </>
    )
}

export default SplatCanvas


