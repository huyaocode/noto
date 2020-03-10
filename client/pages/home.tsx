// #region Local Imports
import Home from "@Pages/home";
import { withTranslation } from "@Server/i18n";
// #endregion Local Imports

// #region Interface Imports
import { ReduxNextPageContext } from "@Interfaces";
// #endregion Interface Imports

Home.getInitialProps = async (
    ctx: ReduxNextPageContext
) => {
    return { namespacesRequired: ["common"] };
};

export default  withTranslation("common")(Home);
