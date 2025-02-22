import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../types/todo";
import { LogoutUser } from "../../actions/AuthActions";

const initialState: Todo[] = [];

const todosSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {
        setTodos(state, action: PayloadAction<Todo[]>) {
            return [...action.payload];
        },
        addTodo(state, action: PayloadAction<Todo>) {
            state.push(action.payload);
        },
        editTodo(state, action: PayloadAction<{id: number, title: string}>) {
            return state.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        title: action.payload.title,
                    }
                }

                return item;
            })
        },
        editTodoStatus(state, action: PayloadAction<number>) {
            return state.map(item => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        completed: !item.completed,
                    }
                }

                return item;
            })
        },
        removeTodo(state, action: PayloadAction<number>) {
            return state.filter(x => x.id !== action.payload);
        }
    },
    extraReducers(builder) {
        builder.addCase(LogoutUser.fulfilled, () => {
            return [];
        });
    }
});

export const todosActions = todosSlice.actions;
export default todosSlice.reducer;