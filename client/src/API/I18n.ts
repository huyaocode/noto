import { Http } from "@/API/Http";
import { II18n } from "@/Interfaces";

interface GetI18nRes {
    rows: II18n[];
    count: number;
}

export const I18nApi = {
    createI18n: async (i18n: { id: string; zh?: string; en?: string }) => {
        const res = await Http.Request("POST", "/api/i18n", null, i18n);
        return res;
    },
    deleteI18n: async id => {
        const res = await Http.Request("DELETE", `/api/i18n/${id}`);
        return res;
    },
    getI18n: async (): Promise<II18n[]> => {
        const res = await Http.Request<{ data: GetI18nRes }>(
            "GET",
            "/api/i18ns"
        );
        return res.data.rows;
    },
    updateI18n: async (i18n: { id: string; zh?: string; en?: string }) => {
        const res = await Http.Request(
            "PUT",
            `/api/i18n/${i18n.id}`,
            null,
            i18n
        );
        return res;
    },
};
