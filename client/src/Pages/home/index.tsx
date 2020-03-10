// #region Global Imports
import React, { useState } from "react";
import { NextPage } from "next";
import { WithTranslation } from "next-i18next";

import {
    Container,
    Top,
    TopText,
    Middle,
    MiddleLeft,
    MiddleLeftButtons,
    MiddleRight,
} from "@Styled/Home";
import { Heading, LocaleButton } from "@Components";
import { NamespacesRequiredProps } from "@Interfaces";
import { BlogApi, Blog } from "@/API/Blog";
import { BlogContainer } from "./styled";
// #endregion Local Imports

const Home: NextPage<WithTranslation, NamespacesRequiredProps> = ({
    t,
    i18n,
}) => {
    // const home = useSelector((state: IStore) => state.home);
    // const dispatch = useDispatch();
    const [blogList, setBlogList] = useState<Blog[]>([]);

    const renderLocaleButtons = (activeLanguage: string) =>
        ["en", "es", "tr"].map(lang => (
            <LocaleButton
                key={lang}
                lang={lang}
                isActive={activeLanguage === lang}
                onClick={() => i18n.changeLanguage(lang)}
            />
        ));
    return (
        <Container>
            <Top>
                <img src="/static/images/pankod-logo.png" alt="Pankod Logo" />
            </Top>
            <Middle>
                <MiddleLeft>
                    <MiddleLeftButtons>
                        {renderLocaleButtons(i18n.language)}
                    </MiddleLeftButtons>
                </MiddleLeft>
                <MiddleRight>
                    <TopText>{t("common:Hello")}</TopText>
                    <button
                        onClick={() => {
                            BlogApi.GetIndexBlog().then(res => {
                                setBlogList(res.rows);
                                console.log("结果", res.rows);
                            });
                        }}
                    >
                        获取后台数据
                    </button>
                    {blogList.map(({ id, title, user, content }) => (
                        <BlogContainer>
                            <h2>{title}</h2>
                            <h3>
                                id: {id}, author: {user.username}
                            </h3>
                            <div>{content}</div>
                        </BlogContainer>
                    ))}
                </MiddleRight>
            </Middle>
        </Container>
    );
};

export default Home;
