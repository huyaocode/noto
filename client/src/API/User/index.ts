import { Http } from "@/API/Http";
import { User } from "@/Interfaces";

interface IUserRes {msg: string; data: User}

export const UserApi = {
    Login: async (user: {
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
    Register: async (user: {
        nickname: string;
        username: string;
        password: string;
    }) => {

        interface IRegisterRes {
            msg: string, 
            data: {id: string}
        }

        let response: IRegisterRes;
        try {
            response = await Http.Request<IRegisterRes>(
                "POST",
                "/api/users",
                null,
                user
            );
        } catch (error) {
        }
        return response;
    }
};
