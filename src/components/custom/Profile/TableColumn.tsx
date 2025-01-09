import { useRef, useState } from "react";
import { tablesActions } from "../../../redux/reducers/tableSlice";
import { useAppDispatch } from "../../../hooks";
import { TodoTable } from "../../../redux/types/table";
import { deleteTable, updateTable } from "../../../todoHooks";

export type TableColumnType = Omit<TodoTable, 'todos'> & { active: boolean, openModal: () => void };

export const TableColumn = ({ id, title, active, status, openModal }: TableColumnType) => {
    const refEditable = useRef<HTMLInputElement>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isLoad, setIsLoad] = useState(false);

    const dispatch = useAppDispatch();

    const onEdit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (refEditable.current) {
            const newTitle = refEditable.current.value;

            updateTable({ id, status, title: newTitle }).then(() => {
                dispatch(tablesActions.editTable({ id: id, newTitle: newTitle}));
            });
        }

        setIsEdit(false);
    }

    const removeTable = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();

        setIsLoad(true);
        
        deleteTable(id)
        .then(() => {
            dispatch(tablesActions.removeTable(id));
        })
        .finally(() => {
            setIsLoad(false);
        });
    }
    
    return (<li className={`
        flex
        justify-between
        items-center
        border-[#5B8FB9]
        border 
        rounded-lg 
        p-2 
        text-white 
        hover:bg-[#5B8FB9] 
        hover:cursor-pointer
        transition 
        duration-300 
        ease-in-out
        ${active ? 'bg-[#5B8FB9]' : undefined}
    `}
        onClick={() => dispatch(tablesActions.setActiveTable(id))}
        onDoubleClick={status === 'ADMIN' ? () => setIsEdit(true) : undefined}
        onMouseLeave={() => isEdit && setIsEdit(false)}
    >
        {!isEdit && <p>{title}</p>}
        {isEdit && <form onSubmit={onEdit}><input
            ref={refEditable}
            className="bg-transparent rounded-lg w-full outline-none border-2 size-full px-2"
            defaultValue={title}
        /></form>}

        {status === 'ADMIN' && <div className="flex gap-2">
            <button
                className={`
                    text-green-500
                    hover:cursor-pointer
                `}
                disabled={isLoad}
                onClick={openModal}
            >
                GRANT
            </button>

            <button
                className={`
                    text-red-500
                    hover:cursor-pointer
                `}
                onClick={removeTable}
                disabled={isLoad}
            >
                DEL
            </button>
        </div>}
    </li>);
}