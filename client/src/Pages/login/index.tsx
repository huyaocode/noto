import React from "react";
import { NextPage } from "next";
import { WithTranslation } from "next-i18next";
import { NamespacesRequiredProps } from "@Interfaces";
import Logo from "@/Components/Layout/Logo";
import "./styles.scss";
import Router from "next/router";

import { Form, Icon, Input, Button, message } from "antd";
import { UserApi } from "@/API/User";

const LoginForm = ({ form }: { form: any }) => {
    const { getFieldDecorator } = form;
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields(async (err, values) => {
            if (!err) {
                const {msg, data} = await UserApi.login(values)
                localStorage.setItem('user',JSON.stringify(data))
                if(msg == 'success') {
                    Router.push('/');
                } else if(msg === 'password is error') {
                    message.error('Password error !')
                } else if(msg === 'username is error') {
                    message.error('Email error !')
                }
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
                            message: "Please input your email !",
                        },
                    ],
                })(
                    <Input
                        prefix={
                            <Icon
                                type="mail"
                                style={{ color: "rgba(0,0,0,.25)" }}
                            />
                        }
                        placeholder="Email"
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
