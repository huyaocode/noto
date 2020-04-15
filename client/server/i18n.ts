// #region Global Imports
import NextI18Next from "next-i18next";
// #endregion Global Imports

const NextI18NextInstance = new NextI18Next({
    defaultLanguage: "zh",
    otherLanguages: ["en"],
    defaultNS: 'common',
    ns:['common']
});

export const { appWithTranslation, withTranslation } = NextI18NextInstance;

export const withCommonNSTranslation = withTranslation('common');

export default NextI18NextInstance;
