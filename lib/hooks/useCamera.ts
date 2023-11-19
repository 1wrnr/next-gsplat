import { useEffect, useRef } from 'react';
import * as SPLAT from 'gsplat';
import { useControls } from '@/lib/stores/useControls';

export const useCamera = () => {
    const camera = useRef<SPLAT.Camera>(new SPLAT.Camera());
    const { near, far, fov, camera: { position: cameraPosition, rotation: cameraRotation } } = useControls();


useEffect(() => {
        camera.current.near = near;
        camera.current.far = far;
        // camera.current.fov = fov;
        camera.current.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z, 1);
        camera.current.rotation.set(cameraRotation.x, cameraRotation.y, cameraRotation.z, 1);
    }, [near, far, fov, cameraPosition, cameraRotation]);
    return camera;

};