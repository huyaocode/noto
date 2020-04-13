import React from "react";
import "./styles.scss";
import Router from "next/router";

const Logo = ({ t }) => {
    const logoClicked = () => {
        Router.push("/");
    };

    return (
        <div className="logo">
            <h1 onClick={() => logoClicked()}>NOTO日记</h1>
        </div>
    );
};
export default Logo;