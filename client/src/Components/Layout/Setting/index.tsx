import React, { memo } from "react";
import { Menu, Dropdown } from "antd";
import './styles.scss';
import Router from "next/router";
import { IStore } from "@/Redux";
import { useSelector, useDispatch } from "react-redux";
import { CommonActions } from "@/Actions/common";

const Setting = ({ t }) => {
    let userId = "",
        userName = "";
    if (typeof localStorage !== "undefined") {
        userId = localStorage.getItem("userId");
        userName = localStorage.getItem("userName");
    }
    // const common = useSelector((state: IStore) => state.common);
    // const dispatch = useDispatch();
    const menu = (
        <Menu>
            <Menu.Item>我的日记</Menu.Item>
            <Menu.Item>我的信息</Menu.Item>
            <Menu.Item>退出登录</Menu.Item>
        </Menu>
    );
    return (
        <div className="setting">
            <div className="language">English</div>
            {userId ? (
                <Dropdown overlay={menu}>
                    <a
                        className="ant-dropdown-link"
                        onClick={e => e.preventDefault()}
                    >
                        用户信息
                    </a>
                </Dropdown>
            ) : (
                <div className="login" 
                    onClick={() => Router.push('/login')}
                >登录</div>
            )}
        </div>
    );
};

export default memo(Setting);
