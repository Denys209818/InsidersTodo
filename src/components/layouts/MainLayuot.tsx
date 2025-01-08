import { Outlet } from "react-router-dom";
import { Header } from "../custom/Header";

export const MainLayout = () => {
    return (<>
        <Header />

        <main className="flex justify-center items-center w-full min-h-full-height">
            <Outlet />
        </main>
    </>);
}