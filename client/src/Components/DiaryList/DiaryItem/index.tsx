import React, { useState, useEffect } from "react";
import "./styles.scss";
import { IDiary, IUser, IComment } from "@Interfaces";
import { Icon, Input, Button } from "antd";
import { DiaryApi } from "@/API/Diary";
import Router from "next/router";

const { TextArea } = Input;


export const DiaryItem: React.FC<{ diary: IDiary, showAvatar?: boolean}> = ({ diary, showAvatar }) => {
    const { id, user_id, user, created_at, content, commentSize } = diary;
    const [commentNum, setCommentNum] = useState(commentSize);
    const [hasLogined, setHasLogined] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [comments, setComments] = useState<IComment[]>([]);

    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            const curUser: IUser =
                JSON.parse(localStorage.getItem("user")) || {};
            if (!curUser.id) {
                setHasLogined(false);
            }
        }
    }, []);

    useEffect(() => {
        getComments();
    }, [showComments]);

    const getComments = () => {
        if (showComments) {
            DiaryApi.getComments(id).then(comments =>
                setComments(comments.rows)
            );
        }
    }

    const goToUser = (id) => {
        Router.push(`/user/${id}`)
    }

    const avatar = (user: IComment['user'] | IUser) => {
        const { id } = user;
        return <div className="avatar" onClick={() =>goToUser(id)}></div>;
    };

    const addComment = async () => {
        await DiaryApi.addComment(id, commentValue);
        getComments();
        setCommentNum(num => num + 1);
        setCommentValue("");
    };

    const renderComment = () => {
        return (
            showComments && (
                <>
                    <div className="comment-list">
                        {comments.map(({ content, created_at, user, id }) => (
                            <div className="comment-item" key={id}>
                                {avatar(user)}
                                <div className="right">
                                    <div className="info">
                                        <a className="username" onClick={() => goToUser(user.id)}>
                                            {user.nickname}
                                        </a>
                                        <span className="time">
                                            {getDate(created_at)}
                                        </span>
                                    </div>
                                    <div className="comment-content">
                                        {content}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {hasLogined && (
                        <div className="comment">
                            <TextArea
                                value={commentValue}
                                onChange={e => setCommentValue(e.target.value)}
                            />
                            <Button
                                className="btn"
                                onClick={() => addComment()}
                            >
                                评论
                            </Button>
                        </div>
                    )}
                </>
            )
        );
    };

    return (
        <div className="diary-item">
            <div className="diary">
                {showAvatar && avatar(user)}
                <div className="right">
                    <div className="info">
                    {showAvatar && <a className="username" onClick={() => goToUser(user_id)}>{user.nickname}</a>}
                        <span className="time">{getDate(created_at)}</span>
                    </div>
                    <div
                        className="content"
                        dangerouslySetInnerHTML={{
                            __html: content,
                        }}
                    />
                    <div className="communication">
                        {/* <div className="star-btn">
                                <Icon type="star" /> 30
                            </div> */}
                        <div
                            className="comment-btn"
                            onClick={() => {
                                setShowComments(!showComments);
                                if (commentNum === 0 && !hasLogined) {
                                    Router.push("/login");
                                }
                            }}
                        >
                            <Icon type="message" />
                            {commentNum ? commentNum : "评论"}
                        </div>
                    </div>
                    {renderComment()}
                </div>
            </div>
        </div>
    );
};

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
