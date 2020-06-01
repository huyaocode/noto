import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { WithTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "./styles.scss";
import { PageLayout } from "@/Components";
import { NamespacesRequiredProps } from "@Interfaces";
import Router from "next/router";
import { Switch, Icon, Button, message } from "antd";
import { DiaryApi } from "@/API/Diary";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
];

const Edit: NextPage<WithTranslation, NamespacesRequiredProps> = ({
    t,
    i18n,
}) => {
    const [content, setContent] = useState("");
    const [privated, setPrivated] = useState(false);

    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            setContent(localStorage.getItem("diaryDraft") || "");
        }
    }, []);

    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("diaryDraft", content);
        }
    }, [content]);

    if (typeof document !== "undefined" && !/user_id/.test(document.cookie)) {
        Router.push("/login");
    }

    const lockChange = checked => {
        setPrivated(!checked);
    };

    const saveDiary = async () => {
        try {
            if (!content) {
                return;
            }
            await DiaryApi.createDiary(content, privated);
            localStorage.setItem("diaryDraft", "");
            Router.push("/");
        } catch (error) {
            message.error("服务端出错了");
        }
    };

    return (
        <PageLayout t={t} i18n={i18n}>
            <QuillNoSSRWrapper
                theme="snow"
                modules={modules}
                formats={formats}
                value={content}
                onChange={setContent}
            />
            <div className="control">
                <div>
                    分享：
                    <Switch
                        checkedChildren={<Icon type="share-alt" />}
                        unCheckedChildren={<Icon type="lock" />}
                        defaultChecked
                        onChange={lockChange}
                    />
                </div>
                <Button type="primary" onClick={() => saveDiary()}>
                    {t("save")}
                </Button>
            </div>
        </PageLayout>
    );
};

export default Edit;
