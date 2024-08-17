import "./LogoLoader.scss";
import React from "react";

const LogoLoader: React.FC = () => {
    return (
        <div className="logo-fallback">
            <div className="logo-fallback__customSpinner"></div>
            <h1 className="logo-fallback__title">Loading...</h1>
        </div>
    );
};

export default LogoLoader;
