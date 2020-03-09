// #region Local Imports
import Home from "@Pages/home";
import { withTranslation } from "@Server/i18n";
import { HomeActions } from "@Actions";
// #endregion Local Imports

// #region Interface Imports
import { ReduxNextPageContext } from "@Interfaces";
// #endregion Interface Imports

Home.getInitialProps = async (
    ctx: ReduxNextPageContext
) => {
    await ctx.store.dispatch(
        HomeActions.GetApod({
            params: {},
        })
    );
    return { namespacesRequired: ["common"] };
};

export default  withTranslation("common")(Home);
