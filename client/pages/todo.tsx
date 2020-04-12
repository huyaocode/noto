import { withTranslation } from "@Server/i18n";
import { ReduxNextPageContext } from "@Interfaces";
import Todo from "@/Pages/todo";

Todo.getInitialProps = async (ctx: ReduxNextPageContext) => {
    return { namespacesRequired: ["common"] };
};

export default withTranslation("common")(Todo);
