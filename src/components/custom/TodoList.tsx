/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { TodoItem } from "./TodoItem";
import { todosActions } from "../../redux/reducers/todoSlice";
import { faker } from "@faker-js/faker";

export const TodoList = () => {
    const todos = useAppSelector(state => state.todos);
    const { activeTable } = useAppSelector(state => state.tables);

    const dispatch = useAppDispatch();

    const onCreateTask = () => {
        if (activeTable) {
            dispatch(todosActions.addTodo({
                id: faker.number.int(),
                title: '',
                completed: false,
                tableId: activeTable.id
            }));
        }
    }

    useEffect(() => {
        dispatch(todosActions.setTodos([{
            id: 1,
            title: 'Task 1',
            completed: false,
            tableId: 1
        }]));
    }, [activeTable]);

    return (<div className="block border border-black h-full-height-with-paddings pt-5 overflow-y-auto px-3">
        <h1 className="text-6xl font-semibold text-center">
            {activeTable?.title}
        </h1>

        <button className={`
                block
                p-4
                bg-[#03001C]
                text-white
                rounded-lg
                hover:bg-[#301E67]
                transition 
                duration-300 
                ease-in-out
                mt-3
                mx-auto
            `}
            onClick={onCreateTask}
            >
            Create a task
        </button>

        <div className="flex flex-col gap-4 mt-3">
            {todos.map(td => (
                <TodoItem
                    key={td.id}
                    title={td.title}
                    id={td.id}
                    completed={td.completed}
                />
            ))}
        </div>
    </div>);
}