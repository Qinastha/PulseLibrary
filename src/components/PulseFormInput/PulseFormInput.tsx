import React from "react";
import "./PulseFormInput.scss";
import {RequiredInput} from "../PulseForm/PulseForm";

export interface PulseFormInputProps {
    inputData: RequiredInput;
    inputValue: any;
    onChange: (e: any) => void;
}

export const PulseFormInput: React.FC<PulseFormInputProps> = ({
                                                                  inputData,
                                                                  inputValue,
                                                                  onChange,
                                                              }) => {
    const { type, name, required, autoComplete } = inputData;

    return (
        <input
            type={type}
            name={name}
            className="pulse-form-input"
            required={required}
            value={inputValue}
            onChange={e => onChange(e)}
            autoComplete={autoComplete}
        />
    );
};

export default PulseFormInput