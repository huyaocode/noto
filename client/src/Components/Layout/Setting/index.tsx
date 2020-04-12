import React, { memo } from "react";
import { Menu, Dropdown } from "antd";

import { IStore } from "@/Redux";
import { useSelector, useDispatch } from "react-redux";
import { CommonActions } from "@/Actions/common";


 const Setting = ({ t }) => {
    // const common = useSelector((state: IStore) => state.common);
    // const dispatch = useDispatch();
    const menu = (
        <Menu>
            <Menu.Item>我的日记</Menu.Item>
            <Menu.Item>我的信息</Menu.Item>
            <Menu.Item>退出登录</Menu.Item>
        </Menu>
    );
    return (
        <div className="setting">
            <div className="language">English</div>
            <Dropdown overlay={menu}>
                <a
                    className="ant-dropdown-link"
                    onClick={e => e.preventDefault()}
                >
                    用户信息
                </a>
            </Dropdown>
        </div>
    );
};


export default memo(Setting)