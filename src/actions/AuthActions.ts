import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "../auth";

export interface LoginType {
    email: string;
    password: string;
};

export interface RegisterType extends LoginType {
    name: string;
};

export const RegisterUser = createAsyncThunk('auth/registerAction', 
    async ({email, password, name }: RegisterType) => {
        return registerUser(email, password, name);
    });

export const LoginUser = createAsyncThunk('auth/loginAction', 
    async ({ email, password }: LoginType) => {
        return loginUser(email, password);
    });

export const LogoutUser = createAsyncThunk('auth/logoutAction', 
    async () => {
        return logoutUser();    
    });