import { withCommonNSTranslation } from "@Server/i18n";
import User from "@/Pages/user";
import { ReduxNextPageContext } from "@/Interfaces";
import { UserApi } from "@/API/User";
import { DiaryApi } from "@/API/Diary";

User.getInitialProps = async (ctx: ReduxNextPageContext) => {
  let { id } = ctx.query;
  id = Array.isArray(id) ? id[0] : id;
  const user = await UserApi.getUserById(id);
  const diaryList = await DiaryApi.getDiaryByUserId(id);
  return { namespacesRequired: ["common"], user, diaryList };
};

export default withCommonNSTranslation(User);
