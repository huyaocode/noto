import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { WithTranslation } from "next-i18next";
import { Calendar } from "antd";
import { NamespacesRequiredProps, IDiary } from "@Interfaces";
import "./styles.scss";
import { PageLayout, DiaryList } from "@/Components";

const Home: NextPage<
    WithTranslation & { diaryList: IDiary[] },
    NamespacesRequiredProps
> = ({ t, i18n, diaryList }) => {
    // TODO 这里 console 2次
    // console.log('diaryList', diaryList)
    return (
        <PageLayout t={t} i18n={i18n}>
            <div className="home-wrapper">
                <DiaryList diaryList={diaryList} t={t} />
                <div className="aside"></div>
            </div>
        </PageLayout>
    );
};

export default Home;
