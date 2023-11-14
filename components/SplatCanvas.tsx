'use client'

import * as SPLAT from 'gsplat'
import { useEffect, useRef, useState } from 'react';
const SplatCanvas = () => {
    const canvasRef = useRef<HTMLDivElement | null>(null);
    const scene = useRef<SPLAT.Scene>(new SPLAT.Scene());
    const camera = useRef<SPLAT.Camera>(new SPLAT.Camera());
    const renderer = useRef<SPLAT.WebGLRenderer | null>(null);
    const controls = useRef<SPLAT.OrbitControls | null>(null);

    useEffect(() => {
        const initSplatScene = async () => {
            renderer.current = new SPLAT.WebGLRenderer();
            controls.current = new SPLAT.OrbitControls(camera.current!, renderer.current!.domElement);

            const url =
                'https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/bonsai-7k.splat';

            await SPLAT.Loader.LoadAsync(url, scene.current, () => { });

            const frame = () => {
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
        return () => {

        };
    }, []);

    return (
        <div className="border-2 border-red-500 border-dotted" ref={canvasRef}>
        </div>
    )
}

export default SplatCanvas


