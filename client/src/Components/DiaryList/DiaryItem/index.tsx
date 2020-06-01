import React, { useState, useEffect } from "react";
import "./styles.scss";
import { IDiary, IUser, IComment } from "@Interfaces";
import { Icon, Input, Button, Avatar, Tooltip } from "antd";
import { DiaryApi } from "@/API/Diary";
import Router from "next/router";

const { TextArea } = Input;

export const DiaryItem: React.FC<{
    diary: IDiary;
    showAvatar?: boolean;
    t;
}> = ({ diary, showAvatar, t }) => {
    const {
        id,
        user_id,
        user,
        created_at,
        content,
        commentSize,
        privated,
    } = diary;
    const [commentNum, setCommentNum] = useState(commentSize);
    const [hasLogined, setHasLogined] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [comments, setComments] = useState<IComment[]>([]);
    const [curUser, setCurUser] = useState<any>({});
    const [isPrivate, setIsPrivate] = useState(privated);
    const [hasDelete, setHasDelete] = useState(false);

    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            const user = JSON.parse(localStorage.getItem("user")) || {};
            setCurUser(user);
            if (!user.id) {
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
    };

    const goToUser = id => {
        Router.push(`/user/${id}`);
    };

    const avatar = (user: any, size = 64) => {
        const { id, avatar } = user;
        return (
            <div className="avatar" onClick={() => goToUser(id)}>
                <Avatar shape="square" size={size} icon="user" src={avatar} />
            </div>
        );
    };

    const addComment = async () => {
        await DiaryApi.addComment(id, commentValue);
        getComments();
        setCommentNum(num => num + 1);
        setCommentValue("");
    };

    const setDiaryPrivate = async (isPrivate: boolean) => {
        await DiaryApi.setDiaryPrivate(id, isPrivate);
        setIsPrivate(isPrivate);
    };

    const deleteDiary = async () => {
        await DiaryApi.deleteDiary(id);
        setHasDelete(true);
    };

    const renderComment = () => {
        return (
            showComments && (
                <>
                    <div className="comment-list">
                        {comments.map(({ content, created_at, user, id }) => (
                            <div className="comment-item" key={id}>
                                {avatar(user, 40)}
                                <div className="right">
                                    <div className="info">
                                        <a
                                            className="username"
                                            onClick={() => goToUser(user.id)}
                                        >
                                            {user.nickname}
                                        </a>
                                        <span className="time">
                                            {getDate(created_at, t)}
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
                            {avatar(curUser, 40)}
                            <TextArea
                                value={commentValue}
                                onChange={e => setCommentValue(e.target.value)}
                            />
                            <Button
                                className="btn"
                                onClick={() => addComment()}
                            >
                                {t("comment")}
                            </Button>
                        </div>
                    )}
                </>
            )
        );
    };

    const renderDeleteIcon = () => {
        return (
            !showAvatar &&
            curUser.id === user_id && (
                <Icon type="delete" onClick={() => deleteDiary()} />
            )
        );
    };

    const renderPrivateIcon = () => {
        return (
            !showAvatar &&
            curUser.id === user_id &&
            (isPrivate ? (
                <Tooltip
                    className="private-icon"
                    placement="right"
                    title="私密的日记"
                >
                    <Icon type="lock" onClick={() => setDiaryPrivate(false)} />
                </Tooltip>
            ) : (
                <Tooltip
                    className="private-icon"
                    placement="right"
                    title="公开的日记"
                >
                    <Icon
                        type="share-alt"
                        onClick={() => setDiaryPrivate(true)}
                    />
                </Tooltip>
            ))
        );
    };

    return (
        !hasDelete && (
            <div className="diary-item">
                <div className="diary">
                    {showAvatar && avatar(user)}
                    <div className="right">
                        <div className="info">
                            {showAvatar && (
                                <a
                                    className="username"
                                    onClick={() => goToUser(user_id)}
                                >
                                    {user.nickname}
                                </a>
                            )}
                            <span className="time">
                                {getDate(created_at, t)}
                            </span>
                            {renderDeleteIcon()}
                            {renderPrivateIcon()}
                        </div>
                        <div
                            className="content"
                            dangerouslySetInnerHTML={{
                                __html: content,
                            }}
                        />
                        <div className="communication">
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
                                {commentNum ? commentNum : t("comment")}
                            </div>
                        </div>
                        {renderComment()}
                    </div>
                </div>
            </div>
        )
    );
};

function getDate(timeStr, t) {
    const dt = new Date(timeStr);
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var day = dt.getDate();
    var hour = dt.getHours();
    var minut = dt.getMinutes();
    var arr = [
        t("w-0"),
        t("w-1"),
        t("w-2"),
        t("w-3"),
        t("w-4"),
        t("w-5"),
        t("w-6"),
    ];
    var week = dt.getDay();

    const curYear = new Date().getFullYear();
    const yearStr = year === curYear ? "" : `${year}-`;

    return `${yearStr}${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
    } ${hour < 10 ? "0" + hour : hour}:${minut < 10 ? "0" + minut : minut}   ${
        arr[week]
    }`;
}
