import React from "react";
import "./PulseFormInput.scss"

export interface ButtonProps {
    label: string;
}

const PulseFormInput:React.FC<ButtonProps> = (props) => {
    return (
   <button className="button">{props.label}</button>
)
};

export default PulseFormInput;