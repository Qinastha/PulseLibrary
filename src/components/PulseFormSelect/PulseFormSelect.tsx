import React from "react";
import "./PulseFormSelect.scss"
import {PulseFormInputProps} from "../PulseFormInput/PulseFormInput";
import {useTranslation} from "react-i18next";

interface PulseFormSelectProps extends PulseFormInputProps {
}

const PulseFormSelect: React.FC<PulseFormSelectProps> = ({
                                                             inputData,
                                                             inputValue,
                                                             onChange,
                                                         }) => {
    const {t} = useTranslation();
    const {name, required, options} = inputData;
    return (
        <select
            name={name}
            onChange={onChange}
            required={required}
            value={inputValue}
            className="project-pulse-select">
            <option value="">{t("selectOne")}</option>
            {options?.map((option: any, index: number) => (
                <option key={index} value={option.value}>
                    {/*selected={option.value === inputValue}>*/}
                    {option.value}
                    {option.flag ? " " + option.flag : ""}
                </option>
            ))}
        </select>
    );
};

export default PulseFormSelect;
