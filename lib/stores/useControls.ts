import { create } from 'zustand';
type ControlState = {
    window: {
        width: number;
        height: number;
        setWidth: (value: number) => void;
        setHeight: (value: number) => void;
    };
    camera: {
        position: { x: number; y: number; z: number };
        rotation: { x: number; y: number; z: number };
        setPosition: (value: { x: number; y: number; z: number }) => void;
        setRotation: (value: { x: number; y: number; z: number }) => void;
    };
    near: number;
    far: number;
    fov: number;
    setNear: (value: number) => void;
    setFar: (value: number) => void;
    setFov: (value: number) => void;
    center: { x: number; y: number; z: number };
    setCenter: (value: { x: number; y: number; z: number }) => void;
};

export const useControls = create<ControlState>((set) => ({
    window: {
        width: 800,
        height: 800,
        setWidth: (value) => set((state) => ({ window: { ...state.window, width: value } })),
        setHeight: (value) => set((state) => ({ window: { ...state.window, height: value } })),
    },
    camera: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        setPosition: ({ x, y, z }) => set((state) => ({ camera: { ...state.camera, position: { x, y, z } } })),
        setRotation: ({ x, y, z }) => set((state) => ({ camera: { ...state.camera, rotation: { x, y, z } } })),
    },
    near: 0.1,
    far: 1000,
    fov: 80,
    setNear: (value) => set({ near: value }),
    setFar: (value) => set({ far: value }),
    setFov: (value) => set({ fov: value }),
    center: { x: 0, y: 0, z: 0 },
    setCenter: ({ x, y, z }) => set({ center: { x, y, z } }),
}));