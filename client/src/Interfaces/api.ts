export interface User {
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
    user: User;
}

export interface IDiaryList {
    count: number;
    rows: IDiary[];
}
