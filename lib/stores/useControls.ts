import { create } from 'zustand';

type ControlState = {
    near: number;
    far: number;
    fov: number;
    setNear: (value: number) => void;
    setFar: (value: number) => void;
    setFov: (value: number) => void;
    cameraPosition: { x: number; y: number; z: number };
    cameraRotation: { x: number; y: number; z: number };
    setCameraPosition: (value: { x: number; y: number; z: number }) => void;
    setCameraRotation: (value: { x: number; y: number; z: number }) => void;
    center: { x: number; y: number; z: number };
    setCenter: (value: { x: number; y: number; z: number }) => void;
};

export const useControls = create<ControlState>((set) => ({
    near: 0.1,
    far: 1000,
    fov: 0,
    setNear: (value) => set({ near: value }),
    setFar: (value) => set({ far: value }),
    setFov: (value) => set({ fov: value }),
    cameraPosition: { x: 0, y: 0, z: 0 },
    cameraRotation: { x: 0, y: 0, z: 0 },
    setCameraPosition: ({ x, y, z }) => set({
        cameraPosition: {
            x: x,
            y: y,
            z: z,
        }
    }),
    setCameraRotation: ({ x, y, z }) => set({
        cameraRotation: {
            x: x,
            y: y,
            z: z,
        }
    }),
    center: { x: 0, y: 0, z: 0 },
    setCenter: ({ x, y, z }) => set({
        center: {
            x: x,
            y: y,
            z: z,
        }
    }),
}));
