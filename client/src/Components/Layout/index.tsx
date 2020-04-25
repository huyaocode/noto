import React from "react";
import { Layout, Menu } from "antd";
import Setting from "./Setting";
import Logo from "./Logo";
import "./styles.scss";

import { EditIcon, TodolistIcon } from "@Static/icons";
import Router, { useRouter } from "next/router";

const { Header } = Layout;

export const PageLayout = ({ t, i18n, children }) => {
    const router = useRouter();

    const editDiary = () => {
        Router.push("/edit");
    };
    const editTodo = () => {
        Router.push("/todo");
    };

    return (
        <Layout className="layout">
            <Header className="header" style={{ backgroundColor: "#fff" }}>
                <div className="content">
                    <Logo t={t} />
                    <Menu mode="horizontal" selectedKeys={[router.pathname]}>
                        <Menu.Item key="/edit" onClick={() => editDiary()}>
                            <EditIcon />
                            写日记
                        </Menu.Item>
                        <Menu.Item key="/todo" onClick={() => editTodo()}>
                            <TodolistIcon />
                            记待办
                        </Menu.Item>
                    </Menu>
                    <Setting t={t} i18n={i18n} />
                </div>
            </Header>
            <main className="container">{children}</main>
            <footer className="footer">
                <div className="container">Created by HuYao</div>
            </footer>
        </Layout>
    );
};
