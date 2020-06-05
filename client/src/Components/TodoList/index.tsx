import React, { useState, useEffect, memo } from "react";
import { Input, Icon } from "antd";
import "./styles.scss";
import { TodoApi } from "@/API/Todo";
import { ITodo } from "@/Interfaces";
const { Search } = Input;

const getTodayDate = () => new Date(new Date().toLocaleDateString()).getTime();
const getTomorrowDate = () => getTodayDate() + 3600 * 1000 * 24;

const Component = ({ todoType, disabled = false }) => {
    const [content, setContent] = useState("");
    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        TodoApi.getTodo(todoType).then(todos => {
            todos = todos.filter(todo => {
                // “明日待办”中，需要过滤掉已经过期的
                if (
                    todoType === 2 &&
                    new Date(todo.start_at).getTime() < getTomorrowDate()
                ) {
                    return false;
                } else {
                    return true;
                }
            });
            setTodos(todos);
        });
        if (todoType === 1) {
            // 普通待办中，需要获取“明日待办”里面到期的
            TodoApi.getTodo(2).then(todos => {
                let tempTodos = [];
                todos.forEach(todo => {
                    if (new Date(todo.start_at).getTime() < getTomorrowDate()) {
                        tempTodos.push(todo);
                    }
                });
                setTodos(todos => [...todos, ...tempTodos]);
            });
        }
    }, []);

    const addTodo = async content => {
        let todo: any = {
            content,
            type: todoType,
        };

        if (todoType === 2) {
            todo.start_at = getTomorrowDate();
        }

        const res = await TodoApi.createTodo(todo);
        setTodos([...todos, { ...todo, id: res.id }]);
    };

    const doneTodo = async todo => {
        await TodoApi.doneTodo(todo.id);

        setTodos(todos => todos.filter(({ id }) => id !== todo.id));
    };

    const deleteTodo = async todo => {
        await TodoApi.deleteTodo(todo.id);
        setTodos(todos => todos.filter(({ id }) => id !== todo.id));
    };

    return (
        <div className="todo-list">
            {!disabled && (
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
            )}
            <ul className="list">
                {todos &&
                    todos.map(todo => (
                        <li className="item" key={todo.id}>
                            {!disabled && (
                                <div
                                    className="cercle"
                                    onClick={() => doneTodo(todo)}
                                ></div>
                            )}
                            <div className="content">{todo.content}</div>
                            <Icon
                                type="delete"
                                onClick={() => deleteTodo(todo)}
                            />
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export const TodoList = Component;
