import { withCommonNSTranslation } from "@Server/i18n";
import Todo from "@/Pages/todo";
import { ReduxNextPageContext } from "@/Interfaces";

Todo.getInitialProps = async (ctx: ReduxNextPageContext) => {
    return { namespacesRequired: ["common"] };
};

export default withCommonNSTranslation(Todo);
