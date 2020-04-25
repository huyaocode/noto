import { withCommonNSTranslation } from "@Server/i18n";
import I18n from "@/Pages/i18n";
import { ReduxNextPageContext } from "@/Interfaces";

I18n.getInitialProps = async (ctx: ReduxNextPageContext) => {
  
    return { namespacesRequired: ["common"] };
};

export default withCommonNSTranslation(I18n);
