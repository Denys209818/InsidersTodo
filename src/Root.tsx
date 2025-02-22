import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./components/layouts/MainLayuot";


const MainPage = React.lazy(() => import('./components/MainPage'));
const AuthPage = React.lazy(() => import('./components/AuthPage'));
const ProfilePage = React.lazy(() => import('./components/ProfilePage'));

const router = createHashRouter([
    { path: '/', element: <MainLayout />, children: [
        { path: '/profile', element: <ProfilePage /> },
        { path: '/auth/:authType', element: <AuthPage /> }, 
        { index: true, element: <MainPage /> },
    ]}
]);

export const Root = () => {
    return (<RouterProvider router={router} />)
}