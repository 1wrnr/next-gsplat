import { useEffect, useRef } from 'react';
import * as SPLAT from 'gsplat';

export const useWebGLRenderer = () => {
    const renderer = useRef<SPLAT.WebGLRenderer | null>(null);

    useEffect(() => {
        renderer.current = new SPLAT.WebGLRenderer();
    }, []);

    return renderer;
};