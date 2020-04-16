import React from "react";
import "./styles.scss";
import { IDiaryList } from "@Interfaces";
import { Icon } from "antd";

function getDate(timeStr) {
    const dt = new Date(timeStr);
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var day = dt.getDate();
    var hour = dt.getHours();
    var minut = dt.getMinutes();
    var arr = ["日", "一", "二", "三", "四", "五", "六"];
    var week = dt.getDay();

    const curYear = new Date().getFullYear();
    const yearStr = year === curYear ? "" : `${year}年`;

    return `${yearStr}${month < 10 ? "0" + month : month}月${
        day < 10 ? "0" + day : day
    }日 ${hour < 10 ? "0" + hour : hour}:${
        minut < 10 ? "0" + minut : minut
    }   周${arr[week]}`;
}

export const DiaryList: React.FC<{ diaryList: IDiaryList }> = ({
    diaryList,
}) => {
    const getTime = time => {
        return `${getDate(new Date(time))}`;
    };

    return (
        <>
            {diaryList.rows.map(({ id, user, created_at,content, commentSize }) => (
                <div className="diary-item" key={id}>
                    <div className="avatar"></div>
                    <div className="right">
                        <div className="info">
                            <a>{user.nickname}</a>
                            <span className="time">{getTime(created_at)}</span>
                        </div>
                        <div className="content" dangerouslySetInnerHTML={{__html: content}} />
                        <div className="communication">
                        <Icon type="message" /> {commentSize ? commentSize: '评论'}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
