import React from "react";
import "./styles.scss";
import {  IDiaryList } from "@Interfaces";

export const DiaryList: React.FC<{diaryList: IDiaryList}> = ({diaryList} )=> {
  return (
    <>
    {diaryList.rows.map(item => <div key={item.id}>{JSON.stringify(item)}</div>)}
    </>
  )
}