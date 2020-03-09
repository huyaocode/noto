// #region Global Imports
import * as React from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import { WithTranslation } from "next-i18next";

import {
    Container,
    Top,
    TopText,
    Middle,
    MiddleLeft,
    MiddleLeftButtons,
    MiddleRight,
    Apod,
    ApodButton,
} from "@Styled/Home";
import { IStore } from "@Redux/IStore";
import { HomeActions } from "@Actions";
import { Heading, LocaleButton } from "@Components";
import { NamespacesRequiredProps } from "@Interfaces";
// #endregion Local Imports

const Home: NextPage<WithTranslation, NamespacesRequiredProps> = ({ t, i18n }) => {
    const home = useSelector((state: IStore) => state.home);
    const dispatch = useDispatch();

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
                    <Heading text={t("common:World")} />
                    <Apod>
                        <ApodButton
                            onClick={() => {
                                dispatch(
                                    HomeActions.GetApod({
                                        params: {},
                                    })
                                );
                            }}
                        >
                            Discover Space
                        </ApodButton>
                        {home.image.url && (
                            <img
                                src={home.image.url}
                                height="800"
                                alt="Discover Space"
                            />
                        )}
                        <h1>{home.image.copyright}</h1>
                    </Apod>
                </MiddleRight>
            </Middle>
        </Container>
    );
};

export default Home;