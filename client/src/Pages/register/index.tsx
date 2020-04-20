import React from "react";
import { NextPage } from "next";
import { WithTranslation } from "next-i18next";
import { NamespacesRequiredProps } from "@Interfaces";
import Logo from "@/Components/Layout/Logo";
import "./styles.scss";
import Router from "next/router";

import { Form, Icon, Input, Button, message } from "antd";
import { UserApi } from "@/API/User";

const RegisterForm = ({ form }: { form: any }) => {
    const { getFieldDecorator } = form;

    const handleSubmit = e => {
        e.preventDefault();
        form.validateFields(async (err, values) => {
            if (!err) {
                const {msg} = await UserApi.register(values)
                if(msg == 'success') {
                    const {data} = await UserApi.login(values);
                    localStorage.setItem('user',JSON.stringify(data))
                    Router.push('/')
                } else if(msg ==='username already exists') {
                    message.error('Email already exists.')
                }
            }
        });
    };

    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue("password")) {
            callback("Two passwords that you enter is inconsistent!");
        } else {
            callback();
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="register-form">
        <Form.Item>
                {getFieldDecorator("nickname", {
                    rules: [
                        {
                            required: true,
                            message: "Please input your nick name!",
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
                        placeholder="Nickname"
                    />
                )}
            </Form.Item>
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
                {getFieldDecorator("confirm", {
                    rules: [
                        {
                            required: true,
                            message: "Please comfirm your Password!",
                        },
                        {
                            validator: compareToFirstPassword,
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
                        placeholder="Confirm Password"
                    />
                )}
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="register-form-button"
                >
                    Register
                </Button>
                <a onClick={() => Router.push("/login")}>Login now!</a>
            </Form.Item>
        </Form>
    );
};

const WrappedRegisterForm = Form.create({ name: "normal_register" })(
    RegisterForm
);

const Register: NextPage<WithTranslation, NamespacesRequiredProps> = ({
    t,
    i18n,
}) => {
    return (
        <div className="register-box">
            <Logo t={t} />
            <WrappedRegisterForm />
        </div>
    );
};

export default Register;
