import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginUser, LogoutUser, RegisterUser } from "../../actions/AuthActions";
import { UserData } from "../../auth";
import { UserType } from "../types/user";

const initialState: UserType = {
    name: '',
    token: '',
    error: '',
    isLoading: false,
};

const userSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setUser(state: UserType, action: PayloadAction<{ name: string, token: string }>) {
            state.name = action.payload.name;
            state.token = action.payload.token;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(LogoutUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(LogoutUser.fulfilled, (state) => {
            state.isLoading = false;

            state.name = '';
            state.token = '';
        });

        builder.addCase(LogoutUser.rejected, (state, action) => {
            state.isLoading = false;

            state.name = '';
            state.token = '';

            state.error = `CODE: ${action.error.code || 500}\n MESSAGE: ${action.error.message}\0`;
        });


        builder.addCase(RegisterUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(RegisterUser.fulfilled, (state, action) => {
            state.isLoading = false;

            const { name, token } = action.payload as UserData;

            state.name = name;
            state.token = token;
        });

        builder.addCase(RegisterUser.rejected, (state, action) => {
            state.isLoading = false;

            state.name = '';
            state.token = '';

            state.error = `CODE: ${action.error.code || 500}\n MESSAGE: ${action.error.message}\0`;
        });

        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;

            if (!action) return;

            const { name, token } = action.payload as UserData;

            state.name = name;
            state.token = token;
        });

        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;

            if (!action) return;

            state.name = '';
            state.token = '';

            state.error = `CODE: ${action.error.code || 500}\nMESSAGE: ${action.error.message}
            `;
        });
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;