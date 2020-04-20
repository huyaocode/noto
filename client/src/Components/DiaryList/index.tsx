import React from "react";
import "./styles.scss";
import { IDiary } from "@Interfaces";
import { DiaryItem } from './DiaryItem/index';

export const DiaryList: React.FC<{ diaryList: IDiary[],  showAvatar?: boolean }> = ({
    diaryList,
    showAvatar = true
}) => {
    return (
        <>
            {diaryList.map(
                diary => <DiaryItem diary={diary} key={diary.id} showAvatar={showAvatar} />
            )}
        </>
    );
};