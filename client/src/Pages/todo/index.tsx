import React from "react";
import { NextPage } from "next";
import { WithTranslation } from "next-i18next";
import { NamespacesRequiredProps } from "@Interfaces";
import "./styles.scss";
import { PageLayout } from "@/Components";


const Todo: NextPage<
    WithTranslation,
    NamespacesRequiredProps
> = ({ t, i18n }) => {
    return (
        <PageLayout t={t} i18n={i18n}>
            Todo
        </PageLayout>
    );
};

export default Todo;
