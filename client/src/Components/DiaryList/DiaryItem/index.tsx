import React, { useState, useEffect } from "react";
import "./styles.scss";
import { IDiary, User } from "@Interfaces";
import { Icon, Input, Button } from "antd";
import { DiaryApi } from "@/API/Diary";
import Router from "next/router";

const { TextArea } = Input;

const Avatar = () => {
    return <div className="avatar"></div>;
};

export const DiaryItem: React.FC<{ diary: IDiary, showAvatar?: boolean}> = ({ diary }) => {
    const { id, user, created_at, content, commentSize } = diary;
    const [commentNum, setCommentNum] = useState(commentSize);
    const [hasLogined, setHasLogined] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            const curUser: User =
                JSON.parse(localStorage.getItem("user")) || {};
            if (!curUser.id) {
                setHasLogined(false);
            }
        }
    }, []);

    const getComments = () => {
        if (showComments) {
            DiaryApi.getComments(id).then(comments =>
                setComments(comments.rows)
            );
        }
    }

    useEffect(() => {
        getComments();
    }, [showComments]);

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
                                <Avatar />
                                <div className="right">
                                    <div className="info">
                                        <a className="username">
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
                <Avatar />
                <div className="right">
                    <div className="info">
                        <a className="username">{user.nickname}</a>
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
