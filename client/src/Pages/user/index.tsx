import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { WithTranslation } from "next-i18next";
import {
    NamespacesRequiredProps,
    IUser,
    IDiaryList,
    IDiary,
} from "@Interfaces";
import "./styles.scss";
import { PageLayout, DiaryList } from "@/Components";
import { DiaryApi } from "@/API/Diary";

const User: NextPage<
    WithTranslation & { user: IUser; diaryList: IDiaryList },
    NamespacesRequiredProps
> = ({ t, i18n, user, diaryList }) => {
    const [diaries, setDiaries] = useState<IDiary[]>(diaryList.rows);

    useEffect(() => {
        if (typeof document !== "undefined") {
            DiaryApi.getDiaryByUserId(user.id, true).then(res => {
                if(!res) {
                    return;
                }
                diaryList = {
                    count: diaryList.count + res.count,
                    rows: [...diaryList.rows, ...res.rows].sort((a, b) => {
                        return a.created_at < b.created_at ? 1 : -1;
                    }),
                };
                setDiaries(diaryList.rows);
            });
        }
    }, []);

    return (
        <PageLayout t={t} i18n={i18n}>
            <div className="user-page">
                <DiaryList diaryList={diaries} showAvatar={false} />
            </div>
        </PageLayout>
    );
};

export default User;
