import { withCommonNSTranslation } from "@Server/i18n";
import Me from "@/Pages/me";
import { ReduxNextPageContext } from "@/Interfaces";

Me.getInitialProps = async (ctx: ReduxNextPageContext) => {
  
    return { namespacesRequired: ["common"] };
};

export default withCommonNSTranslation(Me);
