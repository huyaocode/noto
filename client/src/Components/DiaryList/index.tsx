import React from "react";
import "./styles.scss";
import { IDiary } from "@Interfaces";
import { DiaryItem } from "./DiaryItem/index";

export const DiaryList: React.FC<{
    diaryList: IDiary[];
    showAvatar?: boolean;
    t;
}> = ({ diaryList, showAvatar = true, t }) => {
    return (
        <div className="diary-list">
            {diaryList.map(diary => (
                <DiaryItem
                    t={t}
                    diary={diary}
                    key={diary.id}
                    showAvatar={showAvatar}
                />
            ))}
        </div>
    );
};
