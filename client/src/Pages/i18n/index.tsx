import React, { useState, useEffect, useCallback } from "react";
import { NextPage } from "next";
import { WithTranslation } from "next-i18next";
import { NamespacesRequiredProps } from "@Interfaces";
import "./styles.scss";
import { PageLayout } from "@/Components";

import { Table, Divider, Tag, Input, Button } from "antd";
import { I18nApi } from "@/API/I18n";

const data = [
    {
        id: "title",
        zh: "日记",
        en: "Diary",
    },
    {
        id: "title2",
        zh: "日记拉科技的死灵法师地方拉伸的激发爱丽丝的飞",
        en: "Diary3",
    },
    {
        id: "titadfle2",
        zh: "日asdfa记2",
        en: "Diarasdfy3",
    },
];

const I18n: NextPage<WithTranslation, NamespacesRequiredProps> = ({
    t,
    i18n,
}) => {
    const [i18nList, setI18nList] = useState([]);
    // 编辑表格用
    const [editId, setEditId] = useState("");
    const [editingZH, setEditingZH] = useState("");
    const [editingEN, setEditingEN] = useState("");
    // 新增用
    const [addId, setAddId] = useState("");
    const [addingZH, setAddingZH] = useState("");
    const [addingEN, setAddingEN] = useState("");

    const getI18n = useCallback(async () => {
        const i18nList = await I18nApi.getI18n();
        setI18nList(i18nList);
    }, []);

    useEffect(() => {
        getI18n();
    }, [getI18n]);

    const updateI18n = async () => {
        await I18nApi.updateI18n({ id: editId, zh: editingZH, en: editingEN });
        getI18n();
    };

    const addi18n = async () => {
        await I18nApi.createI18n({ id: addId, zh: addingZH, en: addingEN });
        setAddId("");
        setAddingZH("");
        setAddingEN("");
        getI18n();
    };

    const deleteTodo = async id => {
        await I18nApi.deleteI18n(id);
        getI18n();
    };

    const columns = [
        {
            title: "Key",
            dataIndex: "id",
            key: "id",
            render: text => <div className="key">{text}</div>,
        },
        {
            title: "zh",
            dataIndex: "zh",
            key: "zh",
            render: (text, { id }) => {
                return (
                    <div className="i18-v">
                        {id === editId ? (
                            <Input
                                value={editingZH}
                                onChange={e => setEditingZH(e.target.value)}
                            />
                        ) : (
                            text
                        )}
                    </div>
                );
            },
        },
        {
            title: "en",
            dataIndex: "en",
            key: "en",
            render: (text, { id }) => {
                return (
                    <div className="i18-v">
                        {id === editId ? (
                            <Input
                                value={editingEN}
                                onChange={e => setEditingEN(e.target.value)}
                            />
                        ) : (
                            text
                        )}
                    </div>
                );
            },
        },
        {
            title: "Action",
            key: "action",
            render: (_, { id, zh, en }) => (
                <span>
                    {id === editId ? (
                        <a
                            onClick={() => {
                                setEditId("");
                                updateI18n();
                            }}
                        >
                            Save
                        </a>
                    ) : (
                        <a
                            onClick={() => {
                                setEditId(id);
                                setEditingZH(zh);
                                setEditingEN(en);
                            }}
                        >
                            Edit
                        </a>
                    )}

                    <Divider type="vertical" />
                    {id === editId ? (
                        <a
                            onClick={() => {
                                setEditId("");
                            }}
                        >
                            Cancel
                        </a>
                    ) : (
                        <a
                            onClick={() => {
                                deleteTodo(id);
                            }}
                        >
                            Delete
                        </a>
                    )}
                </span>
            ),
        },
    ];

    const addRow = () => {
        return (
            <div className="add">
                <div className="key-input">
                    key:
                    <Input
                        value={addId}
                        onChange={e => setAddId(e.target.value)}
                    />
                </div>
                <div className="i18n-v">
                    zh:
                    <Input
                        value={addingZH}
                        onChange={e => setAddingZH(e.target.value)}
                    />
                </div>
                <div className="i18n-v">
                    en:
                    <Input
                        value={addingEN}
                        onChange={e => setAddingEN(e.target.value)}
                    />
                </div>
                <Button onClick={() => addi18n()} type="primary">
                    Add a row
                </Button>
            </div>
        );
    };

    return (
        <PageLayout t={t} i18n={i18n}>
            <div className="i18n-wrapper">
                {addRow()}
                <Table
                    columns={columns}
                    dataSource={i18nList}
                    pagination={false}
                />
            </div>
        </PageLayout>
    );
};

export default I18n;
