import React, {useEffect} from "react";
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
    let {name, required, options} = inputData;

    return (
        <select
            name={name}
            onChange={onChange}
            required={required}
            defaultValue={inputValue}
            className="project-pulse-select">
            <option value="">{t("selectOne")}</option>
            {options?.map((option: any, index: number) => (
                <option key={index} value={option.value}>
                    {t(`${option.value}`)}
                    {option.flag ? " " + option.flag : ""}
                </option>
            ))}
        </select>
    );
};

export default PulseFormSelect;
