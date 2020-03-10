// #region Local Imports
import { Http } from "@/API/Http";
// #endregion Local Imports

enum UserAuthority {
  ADMIN = 1
}

interface User {
  id: string;
  username: string;
  authority: {
      id: UserAuthority;
  };
}

export interface Blog {
    id: string;
    title: string;
    summary: string;
    content: string;
    readSize: number;
    commentSize: number;
    tags: string;
    created_at: Date;
    updated_at: Date;
    user_id: string;
    catalog_id?: string;
    user: User;
    catalog?: string;
}

interface BlogList{
  count: number;
  rows: Blog[];
}

export const BlogApi = {
    GetIndexBlog: async (): Promise<BlogList> => {
        let response: BlogList;
        try {
            response = await (await Http.Request<{data: BlogList}>("GET", "/api/blog")).data;
        } catch (error) {
          console.error('出错了！！！', error);
            response = {
              count: 0,
              rows: []
            };
        }
        return response;
    },
};
