import React, { memo } from "react";
import { Menu, Dropdown } from "antd";
import "./styles.scss";
import Router from "next/router";

const logout = () => {
    localStorage.setItem("user", "{}");
    document.cookie = "";
    Router.push("/login");
};

const Setting = ({ t }) => {
    let user: any = {};
    if (typeof localStorage !== "undefined") {
        user = JSON.parse(localStorage.getItem("user")) || {};
        if (user.id && !/user_id/.test(document.cookie)) {
            Router.push("/login");
        }
    }

    const menu = (
        <Menu>
            <Menu.Item>我的日记</Menu.Item>
            <Menu.Item>我的信息</Menu.Item>
            <Menu.Item onClick={() => logout()}>退出登录</Menu.Item>
        </Menu>
    );
    return (
        <div className="setting">
            <div className="language">English</div>
            {user.id ? (
                <Dropdown overlay={menu}>
                    <a
                        className="ant-dropdown-link"
                        onClick={e => e.preventDefault()}
                    >
                        {user.nickname}
                    </a>
                </Dropdown>
            ) : (
                <div className="login" onClick={() => Router.push("/login")}>
                    登录
                </div>
            )}
        </div>
    );
};

export default memo(Setting);
