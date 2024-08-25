import React, {useEffect} from "react";
import "./PulseForm.scss";
import PulseFormItem from "../PulseFormItem";
import {Member} from "../PulseFormSearch/PulseFormSearch";

export interface RequiredInput {
    type: string;
    name: string;
    className: string;
    required: boolean;
    label: string;
    autoComplete?: string;
    min?: string;
    max?: string;
    options?: Array<{ name: string; value: string; flag?: string }>;
}

export interface PulseFormProps {
    requiredInputs: RequiredInput[];
    inputValues: any[];
    formTitle: string;
    errors?: string[];
    isNewTask?: boolean;
    theme?: string;
    allMembers?: Member[];
    currentUser?: Member;
    onChange: (e: any) => void;
    handleFile?: (e: string) => void;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const PulseForm: React.FC<PulseFormProps> = ({
                                                 requiredInputs,
                                                 inputValues,
                                                 formTitle,
                                                 errors,
                                                 isNewTask = false,
                                                 theme,
                                                 allMembers,
                                                 currentUser,
                                                 onChange,
                                                 handleFile,
                                                 onSubmit,
                                             }) => {

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (onSubmit) {
            onSubmit(e);
        }
    };

    return (
        <div className="pulse-form">
            <h2>{formTitle}</h2>
            <form onSubmit={handleFormSubmit}>
                {requiredInputs.map((inputData: any, index: number) => (
                    <PulseFormItem
                        key={index}
                        inputData={inputData}
                        inputValue={inputValues[index]}
                        errors={errors}
                        isNewTask={isNewTask}
                        className="pulse-form-fields"
                        theme={theme}
                        allMembers={allMembers}
                        currentUser={currentUser}
                        onChange={(e: any) => onChange(e)}
                        handleFile={(e: any) => handleFile!(e)}
                    />
                ))}
            </form>
        </div>
    );
};

export default PulseForm