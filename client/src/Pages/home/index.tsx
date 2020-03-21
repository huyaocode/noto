// #region Global Imports
import React, { useState } from "react";
import { NextPage } from "next";
import { WithTranslation } from "next-i18next";
import { NamespacesRequiredProps } from "@Interfaces";
import "./styles.scss";
import { PageLayout } from "@/Components";
// #endregion Local Imports

const Home: NextPage<WithTranslation, NamespacesRequiredProps> = ({
    t,
    i18n,
}) => {
    return <PageLayout t={t} i18n={i18n}>哈哈哈哈</PageLayout>;
};

export default Home;
