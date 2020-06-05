import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { WithTranslation } from "next-i18next";
import { NamespacesRequiredProps, TODOTYPE } from "@Interfaces";

import "./styles.scss";
import { PageLayout, TodoList } from "@/Components";
import { Tabs } from "antd";
import Router from "next/router";

const { TabPane } = Tabs;

const Todo: NextPage<WithTranslation, NamespacesRequiredProps> = ({
    t,
    i18n,
}) => {
    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user.id) {
                Router.push("/login");
                return;
            }
        }
    }, []);

    return (
        <PageLayout t={t} i18n={i18n}>
            <Tabs defaultActiveKey="1" tabPosition="left">
                <TabPane tab={t("todo-today")} key="1">
                    <TodoList todoType={1} />
                </TabPane>
                <TabPane tab={t("todo-tomorrow")} key="2">
                    <TodoList todoType={2} />
                </TabPane>
                <TabPane tab={t("todo-collection")} key="3">
                    <TodoList todoType={3} />
                </TabPane>
                <TabPane tab={t("todo-done")} key="4">
                    <TodoList todoType={0} disabled />
                </TabPane>
            </Tabs>
        </PageLayout>
    );
};

export default Todo;
