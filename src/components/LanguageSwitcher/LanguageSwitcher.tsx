import React, { useState } from "react";
import "./LanguageSwitcher.scss";
import { useTranslation } from "react-i18next";

interface LanguageSwitcherProps {
    switchLanguage: (lng: string) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({switchLanguage}) => {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        switchLanguage(lng);
        setLanguage(lng);
    };

    return (
        <div className="language-switcher">
            <div
                className={`switcher-toggle ${language === "en" ? "en-active" : "ua-active"}`}
                onClick={() => changeLanguage(language === "en" ? "ua" : "en")}
            >
                <span className="label">{language === "en" ? "EN" : "UA"}</span>
            </div>
        </div>
    );
};

export default LanguageSwitcher;