/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { TableColumn } from "./TableColumn";
import { createTable, getTablesByEmail } from "../../../todoHooks";
import { tablesActions } from "../../../redux/reducers/tableSlice";
import Modal from "./Modal";
import { Navigate } from "react-router-dom";

export const TableList = () => {
    const { activeTable, tables } = useAppSelector(state => state.tables);
    const { email } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function getAllTablesByUserEmail() {            
            if (tables.length === 0 && email) {
                const tabls = await getTablesByEmail(email);

                if (tabls) {
                    tabls.forEach((tab: any) => {
                        dispatch(tablesActions.addTable({ 
                            id: tab["Id"], 
                            title: tab["Title"],
                            status: tab["Status"]
                        }));
                    });
                }
            }
        }

        getAllTablesByUserEmail();
    }, []);

    const [isLoad, setIsLoad] = useState(false);

    const handleAddTodo = () => {
        setIsLoad(true);
        const tableName = 'Table' + (tables.length + 1);

        createTable(tableName, email).then((created) => {
            setIsLoad(false);

            dispatch(tablesActions.addTable({
                id: created.id,
                title: created.title,
                status: 'ADMIN'
            }));
        });
    }

    if (!email) {
        return <Navigate to={'/auth/login'} />
    }

    return (<><ul className="flex flex-col gap-4 px-4 pt-4 list-none">
        {tables.map(table => (
            <TableColumn
                active={(activeTable && activeTable.id === table.id) as boolean}
                key={table.id}
                id={table.id}
                title={table.title}
                status={table.status}
                openModal={() => setIsModalOpen(true)}
            />
        ))}

        <li className={`
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
        `}
            onClick={!isLoad ? handleAddTodo : undefined}
        >
            Створити таблицю
        </li>
    </ul>

    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>);
}