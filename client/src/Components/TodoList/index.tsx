import React, { useState } from "react";
import { Input, Icon } from "antd";
import "./styles.scss";
const { Search } = Input;

export const TodoList = ({ todos, addTodo, doneTodo, deleteTodo }) => {
    const [content, setContent] = useState("");
    return (
        <div className="todo-list">
            <Search
                value={content}
                placeholder="先定一个小目标"
                onChange={e => setContent(e.target.value)}
                onSearch={value => {
                    addTodo(value);
                    setContent("");
                }}
                enterButton="添加"
            />
            <ul className="list">
                {todos.map(todo => (
                    <li className="item">
                        <div
                            className="cercle"
                            onClick={() => doneTodo(todo)}
                        ></div>
                        <div className="content">{todo.content}</div>
                        <Icon type="delete" onClick={() => deleteTodo(todo)} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
