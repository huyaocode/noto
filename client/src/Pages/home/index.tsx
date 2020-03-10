// #region Global Imports
import React, { useState } from "react";
import { NextPage } from "next";
import { WithTranslation } from "next-i18next";
import {
    Form,
    Select,
    InputNumber,
    DatePicker,
    Switch,
    Slider,
    Button,
} from "antd";

import {
    Container,
    TopText,
    Middle,
    MiddleLeft,
    MiddleLeftButtons,
    MiddleRight,
} from "@Styled/Home";
import {  LocaleButton } from "@Components";
import { NamespacesRequiredProps } from "@Interfaces";
import { BlogApi, Blog } from "@/API/Blog";
import { BlogContainer } from "./styled";
import './styles.scss';
// #endregion Local Imports

const FormItem = Form.Item
const Option = Select.Option

const Home: NextPage<WithTranslation, NamespacesRequiredProps> = ({
    t,
    i18n,
}) => {
    // const home = useSelector((state: IStore) => state.home);
    // const dispatch = useDispatch();
    const [blogList, setBlogList] = useState<Blog[]>([]);

    const renderLocaleButtons = (activeLanguage: string) =>
        ["en", "es", "tr"].map(lang => (
            <LocaleButton
                key={lang}
                lang={lang}
                isActive={activeLanguage === lang}
                onClick={() => i18n.changeLanguage(lang)}
            />
        ));
    return (
        <Container>
            <Middle>
                <MiddleLeft>
                    <MiddleLeftButtons>
                        {renderLocaleButtons(i18n.language)}
                    </MiddleLeftButtons>
                </MiddleLeft>
                <MiddleRight>
                    <TopText>{t("common:Hello")}</TopText>
                    <Button
                        className="button"
                        onClick={() => {
                            BlogApi.GetIndexBlog().then(res => {
                                setBlogList(res.rows);
                                console.log("结果", res.rows);
                            });
                        }}
                    >
                        获取后台数据
                    </Button>
                    {blogList.map(({ id, title, user, content }) => (
                        <BlogContainer key={id}>
                            <h2>{title}</h2>
                            <h3>
                                id: {id}, author: {user.username}
                            </h3>
                            <div>{content}</div>
                        </BlogContainer>
                    ))}

                    <Form layout="horizontal">
                        <FormItem
                            label="Input Number"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 8 }}
                        >
                            <InputNumber
                                size="large"
                                min={1}
                                max={10}
                                style={{ width: 100 }}
                                defaultValue={3}
                                name="inputNumber"
                            />
                            <a href="#">Link</a>
                        </FormItem>

                        <FormItem
                            label="Switch"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 8 }}
                        >
                            <Switch defaultChecked />
                        </FormItem>

                        <FormItem
                            label="Slider"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 8 }}
                        >
                            <Slider defaultValue={70} />
                        </FormItem>

                        <FormItem
                            label="Select"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 8 }}
                        >
                            <Select
                                size="large"
                                defaultValue="lucy"
                                style={{ width: 192 }}
                            >
                                <Option value="jack">jack</Option>
                                <Option value="lucy">lucy</Option>
                                <Option value="disabled" disabled>
                                    disabled
                                </Option>
                                <Option value="yiminghe">yiminghe</Option>
                            </Select>
                        </FormItem>

                        <FormItem
                            label="DatePicker"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 8 }}
                        >
                            <DatePicker name="startDate" />
                        </FormItem>
                        <FormItem
                            style={{ marginTop: 48 }}
                            wrapperCol={{ span: 8, offset: 8 }}
                        >
                            <Button
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                OK
                            </Button>
                            <Button size="large" style={{ marginLeft: 8 }}>
                                Cancel
                            </Button>
                        </FormItem>
                    </Form>
                </MiddleRight>
            </Middle>
        </Container>
    );
};

export default Home;
