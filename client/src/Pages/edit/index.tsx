import React, { useState } from "react";
import { NextPage } from "next";
import { WithTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "./styles.scss";
import { PageLayout } from "@/Components";
import { NamespacesRequiredProps } from "@Interfaces";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
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
    const [value, setValue] = useState("");
    return (
        <PageLayout t={t} i18n={i18n}>
            <QuillNoSSRWrapper
                modules={modules}
                formats={formats}
                theme="snow"
                onChange={setValue}
            />
        </PageLayout>
    );
};

export default Edit;
