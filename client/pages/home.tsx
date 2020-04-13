import Home from "@Pages/home";
import { withTranslation } from "@Server/i18n";
import { ReduxNextPageContext } from "@Interfaces";
import { DiaryApi } from "@/API/Diary";

Home.getInitialProps = async (ctx: ReduxNextPageContext) => {
    // const diaryList = await DiaryApi.GetIndexDiary();
    return { namespacesRequired: ["common"] };
};

export default withTranslation("common")(Home);
