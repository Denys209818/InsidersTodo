import { useRef, useState } from "react";
import { useAppDispatch } from "../../../hooks";
import { todosActions } from "../../../redux/reducers/todoSlice";
import { deleteTodo, updateTodo } from "../../../todoHooks";

export type TodoItemType = {
    id: number;
    title: string;
    statusTable: 'ADMIN'|'VIEW';
    completed: boolean;
}

export const TodoItem: React.FC<TodoItemType> = ({ id, title, completed, statusTable }) => {
    const todoRef = useRef<HTMLInputElement>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isLoad, setIsLoad] = useState(false);

    const dispatch = useAppDispatch();

    const onEdit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (todoRef.current) {  
            const todoTitle = todoRef.current.value;
            
            updateTodo({ id, title: todoTitle, completed });
            dispatch(todosActions.editTodo({ id: id, title: todoTitle}));
        }

        setIsEdit(false);
    }

    const isEmpty = title === '';

    const onEditChecked = () => {
        updateTodo({ id, title, completed: !completed });

        dispatch(todosActions.editTodoStatus(id));
    }

    const onDelete = () => {
        setIsLoad(true);

        deleteTodo(id).then(() => {
            dispatch(todosActions.removeTodo(id));
        })
        .finally(() => {
            setIsLoad(false);
        });
    }

    const onDeleteAction =  statusTable === 'ADMIN' ? onDelete : undefined


    return (<div
        className="grid grid-cols-12 p-4 border border-black rounded-md"
    >   
        <div className="flex gap-2 col-span-11">
            <input
                type="checkbox"
                checked={completed}
                onChange={onEditChecked}
                className="size-6"
            />

            <div
                className="w-full"
                onDoubleClick={() => setIsEdit(true && statusTable === 'ADMIN')}
                onMouseLeave={() => isEdit && setIsEdit(false)}
            >
                {!isEdit && !isEmpty && <h3>{title}</h3>}
                {(isEdit || isEmpty) && (<form onSubmit={onEdit}>
                    <input
                        type="text"
                        defaultValue={title}
                        ref={todoRef}
                        className="bg-transparent rounded-lg w-full outline-none border-2 size-full px-2"
                    />
                </form>)}


            </div>
        </div>

        <div className="block grid-cols-1">
            <button 
                className="text-red-600 disabled:text-slate-400 uppercase"
                onClick={onDeleteAction}
                disabled={isLoad}
            >
                Delete
            </button>
        </div>
    </div>)
}