import React from "react";
import "./styles.scss";
import { IDiaryList } from "@Interfaces";
import { DiaryItem } from './DiaryItem/index';

export const DiaryList: React.FC<{ diaryList: IDiaryList }> = ({
    diaryList,
}) => {
    return (
        <>
            {diaryList.rows.map(
                diary => <DiaryItem diary={diary} key={diary.id} />
            )}
        </>
    );
};