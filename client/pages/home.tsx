import Home from "@Pages/home";
import { withCommonNSTranslation } from "@Server/i18n";
import { ReduxNextPageContext } from "@Interfaces";
import { DiaryApi } from "@/API/Diary";

Home.getInitialProps = async (ctx: ReduxNextPageContext) => {
    const diaryList = await DiaryApi.getIndexDiary();
    return { namespacesRequired: ["common"], diaryList };
};

export default withCommonNSTranslation(Home);
