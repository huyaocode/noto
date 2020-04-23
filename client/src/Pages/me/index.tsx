import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { WithTranslation } from "next-i18next";
import { NamespacesRequiredProps, IUser } from "@Interfaces";
import "./styles.scss";

import { Form, Icon, Input, Button, message } from "antd";
import Avatar from "./Avatar";
import { UserApi } from "@/API/User";
import { PageLayout } from "@/Components";
import Router from "next/router";

const { TextArea } = Input;

const MeForm = ({ form }: { form: any }) => {
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState("");
    const [avatar, setAvatar] = useState("");
    const [profile, setProfile] = useState("");

    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            const user = JSON.parse(localStorage.getItem("user"));
            setAvatar(user.avatar);
            setNickname(user.nickname);
            setProfile(user.profile);
            setUsername(user.username);
            setUserId(user.id);
        }
    }, []);

    const setUserInfo = () => {
        UserApi.updateUser(userId, {
            nickname,
            avatar,
            profile,
        }).then(res => {
            message.success("修改成功");
            localStorage.setItem("user", JSON.stringify(res));
            Router.reload();
        });
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 18 },
        },
    };

    return (
        <Form {...formItemLayout} className="Me-form">
            <Form.Item label="头像">
                <Avatar avatar={avatar} setAvatar={setAvatar} />
            </Form.Item>
            <Form.Item label="邮箱">
                <Input
                    prefix={
                        <Icon
                            type="mail"
                            style={{ color: "rgba(0,0,0,.25)" }}
                        />
                    }
                    value={username}
                    disabled
                />
            </Form.Item>
            <Form.Item label="昵称">
                <Input
                    value={nickname}
                    prefix={
                        <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                        />
                    }
                    onChange={e => setNickname(e.target.value)}
                />
            </Form.Item>
            <Form.Item label="简介">
                <TextArea
                    rows={8}
                    value={profile}
                    onChange={e => setProfile(e.target.value)}
                />
            </Form.Item>
            <Form.Item label="">
                <Button onClick={() => setUserInfo()}>提交修改</Button>
            </Form.Item>
        </Form>
    );
};

const WrappedMeForm = Form.create({ name: "normal_Me" })(MeForm);

const Me: NextPage<WithTranslation, NamespacesRequiredProps> = ({
    t,
    i18n,
}) => {
    return (
        <PageLayout t={t} i18n={i18n}>
            <div className="me">
                <WrappedMeForm />
            </div>
        </PageLayout>
    );
};

export default Me;
