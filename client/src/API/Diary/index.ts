import { Http } from "@/API/Http";
import { IDiaryList, User } from "@/Interfaces";

export const DiaryApi = {
    GetIndexDiary: async (): Promise<IDiaryList> => {
        let response: IDiaryList;
        try {
            response = await (await Http.Request<{ data: IDiaryList }>(
                "GET",
                "/api/diary"
            )).data;
        } catch (error) {
            console.error("出错了！！！", error);
            response = {
                count: 0,
                rows: [],
            };
        }
        return response;
    },
    createDiary: async (content, privated) => {
        const user: User = JSON.parse(localStorage.getItem("user"));
        await Http.Request("POST", "/api/diary", null, {
            user_id: user.id,
            content,
            private: privated,
        });
    },
};
