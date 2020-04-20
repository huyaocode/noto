import { Http } from "@/API/Http";
import { IDiaryList, IUser, ICommentList } from "@/Interfaces";

export const DiaryApi = {
    getIndexDiary: async (): Promise<IDiaryList> => {
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
        const user: IUser = JSON.parse(localStorage.getItem("user"));
        await Http.Request("POST", "/api/diary", null, {
            user_id: user.id,
            content,
            private: privated,
        });
    },
    addComment: async (diary_id,  content) => {
        const user: IUser = JSON.parse(localStorage.getItem("user"));
        await Http.Request("POST", "/api/users/comment", null, {
            user_id: user.id,
            diary_id,
            content,
        });
    },
    getComments: async (diary_id): Promise<ICommentList> => {
        try {
            const { data } = await Http.Request(
                "GET",
                `/api/diary/${diary_id}/comment`
            );
            return data;
        } catch (error) {
            return {
                count: 0,
                rows: [],
            };
        }
    },
    getDiaryByUserId: async(userId, isPrivate=false): Promise<IDiaryList> => {
        try {
            const { data } = await Http.Request(
                "GET",
                `/api/user/${userId}/diary${isPrivate ? '?private': ''}`
            );
            return data;
        } catch (error) {
            return {
                count: 0,
                rows: [],
            };
        }
    }
};
