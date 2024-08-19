import "./PulseFormItem.scss";
import React from "react";
import {RequiredInput} from "../PulseForm/PulseForm";
import PulseFormSearch, {Member} from "../PulseFormSearch/PulseFormSearch";
import PulseFormSelect from "../PulseFormSelect";
import DragFile from "../DragFile";
import PulseFormChecklist from "../PulseFormChecklist";
import PulseFormDateInput from "../PulseFormDateInput";
import PulseFormInput from "../PulseFormInput";

export interface PulseFormItemProp {
    inputData: RequiredInput;
    inputValue: any;
    errors: any;
    isNewTask?: boolean;
    className?: string;
    readOnly?: boolean;
    theme?: string;
    allMembers?: Member[];
    onChange: (e: any) => void;
    handleFile?: (e: string) => void;
}

const PulseFormItem: React.FC<PulseFormItemProp> = ({
                                                        inputData,
                                                        inputValue,
                                                        errors,
                                                        isNewTask = false,
                                                        className,
                                                        onChange,
                                                        handleFile,
                                                        readOnly,
                                                        theme = "",
                                                        allMembers = []
                                                    }) => {
    const {type, name, label} = inputData;
    return (
        <div className={className}>
            {!readOnly ? <label>{label}</label> : ""}
            {type === "select" ? (
                <PulseFormSelect
                    inputData={inputData}
                    inputValue={inputValue}
                    onChange={e => onChange(e)}
                />
            ) : type === "file" ? (
                <DragFile
                    data={inputValue}
                    handleFile={(e: string) => handleFile!(e)}
                />
            ) : name === "members" ? (
                <PulseFormSearch
                    inputData={inputData}
                    inputValue={inputValue}
                    theme={theme}
                    allMembers={allMembers}
                    onChange={e => onChange(e)}
                />
            ) : name === "checkList" ? (
                <PulseFormChecklist
                    inputData={inputData}
                    inputValue={inputValue}
                    onChange={e => onChange(e)}
                    isNewTask={isNewTask}
                />
            ) : type === "date" ? (
                <PulseFormDateInput
                    inputData={inputData}
                    inputValue={inputValue}
                    onChange={e => onChange(e)}
                />
            ) : (
                <PulseFormInput
                    inputData={inputData}
                    inputValue={inputValue}
                    onChange={e => onChange(e)}
                />
            )}
            {errors
                ? errors[name] && <span className="errorText">{errors[name]}</span>
                : null}
        </div>
    );
};

export default PulseFormItem