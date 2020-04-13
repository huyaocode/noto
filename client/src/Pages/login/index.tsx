import React from "react";
import { NextPage } from "next";
import { WithTranslation } from "next-i18next";
import { NamespacesRequiredProps } from "@Interfaces";
import Logo from "@/Components/Layout/Logo";
import "./styles.scss";
import Router from "next/router";

import { Form, Icon, Input, Button } from "antd";
import { UserApi } from "@/API/User";

const LoginForm = ({ form }: { form: any }) => {
    const { getFieldDecorator } = form;
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields(async (err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                const res = await UserApi.Login(values)
                console.log('登录：', res)
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
                {getFieldDecorator("username", {
                    rules: [
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ],
                })(
                    <Input
                        prefix={
                            <Icon
                                type="user"
                                style={{ color: "rgba(0,0,0,.25)" }}
                            />
                        }
                        placeholder="Username"
                    />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator("password", {
                    rules: [
                        {
                            required: true,
                            message: "Please input your Password!",
                        },
                    ],
                })(
                    <Input
                        prefix={
                            <Icon
                                type="lock"
                                style={{ color: "rgba(0,0,0,.25)" }}
                            />
                        }
                        type="password"
                        placeholder="Password"
                    />
                )}
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                >
                    Log in
                </Button>
            <a onClick={() => Router.push('/register')}>register now!</a>
             
            </Form.Item>
        </Form>
    );
};

const WrappedLoginForm = Form.create({ name: "normal_login" })(LoginForm);

const Login: NextPage<WithTranslation, NamespacesRequiredProps> = ({
    t,
    i18n,
}) => {
    return (
        <div className="login-box">
            <Logo t={t} />
            <WrappedLoginForm />
        </div>
    );
};

export default Login;
