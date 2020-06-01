import React, { memo, useEffect } from "react";
import { Menu, Dropdown } from "antd";
import "./styles.scss";
import Router from "next/router";

const logout = () => {
    localStorage.setItem("user", "{}");
    document.cookie = "";
    Router.push("/login");
};

const nextLanguageMap = {
    zh: "English",
    en: "中文",
};

const Setting = ({ t, i18n }) => {
    let user: any = {};
    if (typeof localStorage !== "undefined") {
        user = JSON.parse(localStorage.getItem("user")) || {};
        // cookie过期了
        if (user.id && !/user_id/.test(document.cookie)) {
            Router.push("/login");
        }
    }

    const changeLanguage = () => {
        const nextlang = i18n.language === "zh" ? "en" : "zh";
        i18n.changeLanguage(nextlang);
    };

    const menu = (
        <Menu>
            <Menu.Item onClick={() => Router.push(`/user/${user.id}`)}>
                {t("my-diary")}
            </Menu.Item>
            <Menu.Item onClick={() => Router.push(`/me`)}>
                {t("my-info")}
            </Menu.Item>
            <Menu.Item onClick={() => logout()}>{t("logout")}</Menu.Item>
            {user.authority && (
                <Menu.Item onClick={() => Router.push("/i18n")}>
                    {t("i18n-set")}
                </Menu.Item>
            )}
        </Menu>
    );
    return (
        <div className="setting">
            <div className="language" onClick={() => changeLanguage()}>
                {nextLanguageMap[i18n.language]}
            </div>
            {user.id ? (
                <Dropdown overlay={menu}>
                    <a className="login">{user.nickname}</a>
                </Dropdown>
            ) : (
                <div className="login" onClick={() => Router.push("/login")}>
                    {t("login")}
                </div>
            )}
        </div>
    );
};

export default memo(Setting);
