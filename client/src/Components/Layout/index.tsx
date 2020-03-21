// #region Global Imports
import React, { useState } from "react";
import { Layout, Menu, Dropdown} from "antd";

import "./styles.scss";
import { EditIcon, TodolistIcon } from "@Static/icons";
// #endregion Local Imports

const { Header, Footer } = Layout;

export const PageLayout = ({
    t,
    i18n,
    children,
}) => {
    const [activeMenu, setActiveMenu] = useState("home");
    const logoClicked = () => {
        setActiveMenu("home")
    }
    const editDiary = () => {
        setActiveMenu("edit-diary")
    }
    const editTodo = () => {
        setActiveMenu("edit-todo")
    }
    const menu = (
        <Menu>
            <Menu.Item>我的日记</Menu.Item>
            <Menu.Item>我的信息</Menu.Item>
            <Menu.Item>退出登录</Menu.Item>
        </Menu>
    );
    return (
        <Layout className="layout">
            <Header className="header" style={{ backgroundColor: "#fff" }}>
                <div className="content">
                    <div className="logo">
                        <h1 onClick={() => logoClicked()}>NOTO日记</h1>
                    </div>
                    <Menu mode="horizontal" selectedKeys={[activeMenu]} >
                        <Menu.Item key="edit-diary"  onClick={() => editDiary()}>
                            <EditIcon />
                            写日记
                        </Menu.Item>
                        <Menu.Item key="edit-todo"  onClick={() => editTodo()}>
                            <TodolistIcon />
                            记待办
                        </Menu.Item>
                    </Menu>
                    <div className="setting">
                        <div className="language">English</div>
                        <Dropdown overlay={menu}>
                            <a
                                className="ant-dropdown-link"
                                onClick={e => e.preventDefault()}
                            >
                                用户信息
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </Header>
            <main className="container">{children }</main>
            <footer className="footer">
            <div className="container">Created by HuYao</div>
            </footer>
        </Layout>
    );
};
