import { Http } from "@/API/Http";
import { IUser } from "@/Interfaces";

interface IUserRes {
    msg: string;
    data: IUser;
}

export const UserApi = {
    login: async (user: {
        username: string;
        password: string;
    }): Promise<IUserRes> => {
        let response: IUserRes;
        try {
            response = await Http.Request<IUserRes>(
                "POST",
                "/api/users/login",
                null,
                user
            );
        } catch (error) {}
        return response;
    },
    register: async (user: {
        nickname: string;
        username: string;
        password: string;
    }) => {
        interface IRegisterRes {
            msg: string;
            data: { id: string };
        }

        let response: IRegisterRes;
        try {
            response = await Http.Request<IRegisterRes>(
                "POST",
                "/api/users",
                null,
                user
            );
        } catch (error) {}
        return response;
    },
    getUserById: async (userId: string) => {
        try {
            const res = await Http.Request<{data: IUser}>("GET", `/api/users/${userId}`);
            return res.data;
        } catch (error) {
            return {};
        }
    },
    updateUser: async (userId: string, user: any) => {
        try {
            const res = await Http.Request<{data: IUser}>("PUT", `/api/users/${userId}`, null, user);
            return res.data;
        } catch (error) {
            return {};
        }
    },
};
