import { Http } from "@/API/Http";
import { User } from "@/Interfaces";

export const UserApi = {
    Login: async (user: {
        username: string;
        password: string;
    }): Promise<User> => {
        let response: User;
        try {
            const { data } = await Http.Request<{ data: User }>(
                "POST",
                "/api/users/login",
                null,
                user
            );
            response = data;
            console.log("data", data);
        } catch (error) {}
        return response;
    },
};
