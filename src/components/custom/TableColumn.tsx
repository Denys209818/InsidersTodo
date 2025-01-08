import { useRef, useState } from "react";
import { tablesActions, TodoTable } from "../../redux/reducers/tableSlice";
import { useAppDispatch } from "../../hooks";

export type TableColumnType = Omit<TodoTable, 'todos'> & { active: boolean };

export const TableColumn = ({ id, title, active }: TableColumnType) => {
    const refEditable = useRef<HTMLInputElement>(null);
    const [isEdit, setIsEdit] = useState(false);

    const dispatch = useAppDispatch();

    const onEdit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (refEditable.current)
            dispatch(tablesActions.editTable({ id: id, newTitle: refEditable.current.value}));

        setIsEdit(false);
    }
    
    return (<li className={`
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
        onDoubleClick={() => setIsEdit(true)}
        onMouseLeave={() => isEdit && setIsEdit(false)}
    >
        {!isEdit && <p>{title}</p>}
        {isEdit && <form onSubmit={onEdit}><input
            ref={refEditable}
            className="bg-transparent rounded-lg w-full outline-none border-2 size-full px-2"
            defaultValue={title}
        /></form>}
    </li>);
}