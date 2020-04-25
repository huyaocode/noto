export interface IUser {
    id: string;
    username: string;
    nickname: string;
    created_at: Date;
    avatar?: string;
    profile?: string;
    authority?: string;
}

export interface IDiary {
    id: string;
    title: string;
    content: string;
    commentSize: number;
    created_at: Date;
    user_id: string;
    user: IUser;
    privated?: boolean;
}

export interface IDiaryList {
    count: number;
    rows: IDiary[];
}

export interface IComment {
    id: string;
    content: string;
    created_at: Date;
    user_id: string;
    diary_id: string;
    user: {
        id: string;
        nickname: string;
        avatar: string;
    };
}

export interface ICommentList {
    count: number;
    rows: IComment[];
}

export enum TODOTYPE {
    complete = 0,
    common = 1,
    tomorrow = 2,
    collection = 3
}

export interface ITodo {
    id: string;
    content: string;
    type: TODOTYPE,
    start_at?: number;
    done_at?: Date;
}

export interface II18n {
    id: string;
    zh?: string;
    en?: string;
}