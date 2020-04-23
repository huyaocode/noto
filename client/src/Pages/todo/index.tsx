import React from "react";
import { NextPage } from "next";
import { WithTranslation } from "next-i18next";
import { NamespacesRequiredProps } from "@Interfaces";

import "./styles.scss";
import { PageLayout, TodoList } from "@/Components";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const Todo: NextPage<WithTranslation, NamespacesRequiredProps> = ({
    t,
    i18n,
}) => {
    const todos = [
        {
            id: 2,
            content: "STa阿斯蒂芬G",
            type: 1,
            start_at: null,
            done_at: null,
        },
        {
            id: 3,
            content: "ST大师傅",
            type: 1,
            start_at: null,
            done_at: null,
        },
        {
            id: 4,
            content: "ST阿斯蒂芬ING",
            type: 1,
            start_at: null,
            done_at: null,
        },
        {
            id: 5,
            content: "STaING",
            type: 1,
            start_at: null,
            done_at: null,
        },
    ];

    const addTodo = todo => {
        console.log(todo);
    };

    const doneTodo = todo => {
        console.log(todo);
    };

    const deleteTodo = todo => {
        console.log(todo);
    };

    return (
        <PageLayout t={t} i18n={i18n}>
            <Tabs defaultActiveKey="1" tabPosition="left">
                <TabPane tab="待办" key="1">
                    <TodoList
                        todos={todos}
                        addTodo={addTodo}
                        doneTodo={doneTodo}
                        deleteTodo={deleteTodo}
                    />
                </TabPane>
                <TabPane tab="明日待办" key="2">
                    <TodoList
                        todos={todos}
                        addTodo={addTodo}
                        doneTodo={doneTodo}
                        deleteTodo={deleteTodo}
                    />
                </TabPane>
                <TabPane tab="收集箱" key="3">
                    <TodoList
                        todos={todos}
                        addTodo={addTodo}
                        doneTodo={doneTodo}
                        deleteTodo={deleteTodo}
                    />
                </TabPane>
                <TabPane tab="已完成" key="4">
                    Tab 4
                </TabPane>
            </Tabs>
        </PageLayout>
    );
};

export default Todo;
