import React from "react";
import { Slider } from "@nextui-org/react";
interface SliderProps {
    label: string;
    step: number;
    maxValue: number;
    minValue: number;
    defaultValue: number;
    classNames: string;
    onChange: (value: number) => void;
}

export default function ScalarSlider({ label, step, maxValue, minValue, defaultValue, classNames, onChange }: SliderProps) {
    const handleChange = (value: number | number[]) => {
        if (typeof value === 'number') {
            onChange(value);
        }
    };

    return (

        <Slider
            label={label}
            step={step}
            maxValue={maxValue}
            minValue={minValue}
            defaultValue={defaultValue}
            className={classNames}
            onChangeEnd={(value) => handleChange(value)}
        />
    );
}
