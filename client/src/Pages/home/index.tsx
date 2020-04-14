import React from "react";
import { NextPage } from "next";
import { WithTranslation } from "next-i18next";
import { NamespacesRequiredProps, IDiaryList } from "@Interfaces";
import "./styles.scss";
import { PageLayout, DiaryList } from "@/Components";

const Home: NextPage<
    WithTranslation & { diaryList: IDiaryList },
    NamespacesRequiredProps
> = ({ t, i18n, diaryList }) => {
    // TODO 这里 console 2次
    console.log('diaryList', diaryList)
    return (
        <PageLayout t={t} i18n={i18n}>
            <DiaryList diaryList={diaryList} />
        </PageLayout>
    );
};

export default Home;
