import { withTranslation } from "@Server/i18n";
import { ReduxNextPageContext } from "@Interfaces";
import Login from "@/Pages/login";

Login.getInitialProps = async (ctx: ReduxNextPageContext) => {
    return { namespacesRequired: ["common"] };
};

export default withTranslation("common")(Login);
