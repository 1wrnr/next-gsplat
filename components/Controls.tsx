'use client'
import { useControls } from "@/lib/stores/useControls";
import ScalarSlider from "./ui/slider"
import { Slider } from "@nextui-org/react";

const Controls = () => {
    const td = "border p-2 border-gray-800/80"
    return (
        <div className="z-50 fixed top-2 right-2 p-2 rounded bg-black text-white border cursor-pointer">
            Controls
            <Slider
                aria-label="Volume"
                size="lg"
                color="secondary"
                // onChangeEnd={setFov}
                className="max-w-md"
            />
            <div className="border p-4 bg-white border-gray-500/60 text-black font-mono min-w-max">
                <table className="border-collapse border  p-2 border-gray-800/80">
                    <tr className="border p-2 border-gray-800/80">
                        <td className={td}>Camera Position:</td>
                        {/* <td className={td}>X: {cameraPosition.x.toFixed(4)}</td>
                        <td className={td}>Y: {cameraPosition.y.toFixed(4)}</td>
                        <td className={td}>Z: {cameraPosition.z.toFixed(4)}</td> */}
                    </tr>
                    <tr>
                        <td className={td}>Camera Rotation:</td>
                        {/* <td className={td}>X: {cameraRotation.x.toFixed(4)}</td>
                        <td className={td}>Y: {cameraRotation.y.toFixed(4)}</td>
                        <td className={td}>Z: {cameraRotation.z.toFixed(4)}</td> */}
                    </tr>
                    <tr className="border  p-2 border-gray-800/80">
                        <td className={td}>Camera Near:</td>
                        {/* <td className={td}>{near.toFixed(4)}</td> */}
                    </tr>
                    <tr className="border  p-2 border-gray-800/80">
                        <td className={td}>Camera Far:</td>
                        {/* <td className={td}>{far.toFixed(4)}</td> */}
                    </tr>
                    <tr className="border  p-2 border-gray-800/80">
                        <td className={td}>Camera FOV:</td>
                        {/* <td className={td}>{fov}</td> */}
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Controls
