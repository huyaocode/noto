import { withCommonNSTranslation } from "@Server/i18n";
import Register from "@/Pages/register";
import { ReduxNextPageContext } from "@/Interfaces";

Register.getInitialProps = async (ctx: ReduxNextPageContext) => {
    return { namespacesRequired: ["common"] };
};

export default withCommonNSTranslation(Register);
