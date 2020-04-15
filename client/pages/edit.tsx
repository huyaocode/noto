import { withCommonNSTranslation } from "@Server/i18n";
import { ReduxNextPageContext } from "@Interfaces";
import Edit from "@/Pages/edit";

Edit.getInitialProps = async (ctx: ReduxNextPageContext) => {
    return { namespacesRequired: ["common"] };
};

export default withCommonNSTranslation(Edit);
