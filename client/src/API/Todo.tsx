import { Http } from "@/API/Http";
import { ITodo, TODOTYPE } from "@/Interfaces";

interface GetTodoRes {
    rows: ITodo[];
    count: number;
}

export const TodoApi = {
    createTodo: async (todo: {
        content: string;
        type?: TODOTYPE;
        start_at?: Date;
    }) => {
        const res = await Http.Request<{id: string}>(
            "POST",
            "/api/todo",
            null,
            todo
        );
        return res;
    },
    deleteTodo: async id => {
        return await Http.Request("DELETE", `/api/todo/${id}`);
    },
    getTodo: async (type?: TODOTYPE): Promise<ITodo[]> => {
        const res = await Http.Request<{data: GetTodoRes}>("GET", "/api/todos", {
            type,
        });
        return res.data.rows;
    },
    doneTodo: async id => {
        const res = await Http.Request<{data: GetTodoRes}>(
            "PUT",
            `/api/todo/${id}`,
            null,
            { type: 0 }
        );
        return res.data;
    },
};
