import { useAppDispatch, useAppSelector } from "../../hooks"
import { tablesActions } from "../../redux/reducers/tableSlice";
import { TableColumn } from "../custom/TableColumn";
import { TodoList } from "../custom/TodoList";

export const ProfilePage = () => {
    const { activeTable, tables } = useAppSelector(state => state.tables);
    const dispatch = useAppDispatch();

    const handleAddTodo = () => {
        dispatch(tablesActions.addTable({ id: tables.length + 1, title: 'Table' + (tables.length + 1) }));
    }

    return (<section className="w-full min-h-full-height">
        <div className="grid grid-cols-12 gap-x-4">
            <div className="sticky top-[64px] block col-span-4 bg-[#301E67] h-full-height">
                <h4 className="block pt-4 px-4 text-white">Список таблиць</h4>

                <ul className="flex flex-col gap-4 px-4 pt-4 list-none">
                    {tables.map(table => (
                        <TableColumn
                            active={(activeTable && activeTable.id === table.id) as boolean}
                            key={table.id}
                            id={table.id}
                            title={table.title}/>
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
                        onClick={handleAddTodo}
                    >
                        Створити таблицю
                    </li>
                </ul>
            </div>
            <div className="col-span-8 p-4">
                {activeTable !== null && <div className="block px-2">
                    <TodoList />
                </div>}
            </div>
        </div>
        
    </section>)
}