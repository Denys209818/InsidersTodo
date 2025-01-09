/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { TodoItem } from "./TodoItem";
import { todosActions } from "../../../redux/reducers/todoSlice";
import { createTodo, getTodosByTableId } from "../../../todoHooks";

export const TodoList = () => {
    const todos = useAppSelector(state => state.todos);
    const { activeTable } = useAppSelector(state => state.tables);

    const dispatch = useAppDispatch();

    const [isAdding, setIsAdding] = useState(false);

    const onCreateTask = () => {
        if (activeTable) {
            setIsAdding(true);

            createTodo(activeTable.id)
                .then(newTodo => {
                    dispatch(todosActions.addTodo({
                        id: newTodo.id,
                        title: newTodo.title,
                        completed: newTodo.completed,
                        tableId: activeTable.id
                    }));
                })
                .finally(() => setIsAdding(false));
        }
    }

    useEffect(() => {
        if (activeTable) {
            getTodosByTableId(activeTable.id)
            .then((data) => {
                const todos = data as unknown[];

                const preparedTodos = [...todos.map((td: any) => ({
                    id: td.Id,
                    title: td.Title,
                    tableId: td.TableId,
                    completed: td.Completed
                }))];
                
                dispatch(todosActions.setTodos([...preparedTodos]));
            });
        }
    }, [activeTable]);

    const onCreateAction = activeTable && activeTable.status === 'ADMIN' ? onCreateTask : undefined;

    if (!activeTable) {
        return <></>;
    }

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
                disabled:bg-slate-400
            `}
            onClick={onCreateAction}
            disabled={onCreateAction === undefined || isAdding}
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
                    statusTable={activeTable?.status || 'VIEW'}
                />
            ))}
        </div>
    </div>);
}