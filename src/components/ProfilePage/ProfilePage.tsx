import { TodoList } from "../custom/Profile/TodoList";
import React from "react";
import { TableList } from "../custom/Profile/TableList";

export const ProfilePage = React.memo(() => {
    return (<section className="w-full min-h-full-height">
        <div className="grid grid-cols-12 gap-x-4">
            <div className="sticky top-[64px] block col-span-4 bg-[#301E67] h-full-height">
                <h4 className="block pt-4 px-4 text-white">Список таблиць</h4>

                <TableList />
            </div>
            <div className="col-span-8 p-4">
                <div className="block px-2">
                    <TodoList />
                </div>
            </div>
        </div>
        
    </section>)
})