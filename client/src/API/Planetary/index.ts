// #region Local Imports
import { Http } from "@/API/Http";
// #endregion Local Imports

/**
 * 由于跨域问题，要想测试planetary需要先把 .env 文件中 修改proxy
 * PROXY_ORIGIN=https://api.nasa.gov
 */

interface ApodResponse {
    copyright: string;
    date: string;
    explanation: string;
    hdurl: string;
    service_version: string;
    title: string;
    url: string;
}

export const PlanetaryService = {
    GetPlanetImage: async (payload: {
        params: { hd?: boolean };
    }): Promise<ApodResponse> => {
        let response: ApodResponse;

        try {
            response = await Http.Request<ApodResponse>(
                "GET",
                "/planetary/apod",
                payload.params
            );
        } catch (error) {
            response = {
                copyright: "",
                date: "",
                explanation: "",
                hdurl: "",
                service_version: "",
                title: "",
                url: "",
            };
        }

        return response;
    },
};
