import { withTranslation } from "@Server/i18n";
import { ReduxNextPageContext } from "@Interfaces";
import Register from "@/Pages/register";

Register.getInitialProps = async (ctx: ReduxNextPageContext) => {
    return { namespacesRequired: ["common"] };
};

export default withTranslation("common")(Register);
