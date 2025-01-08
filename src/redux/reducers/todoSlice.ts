import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type Todo = {
    id: number;
    title: string;
    completed: boolean;
    tableId: number;
};

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
    }
});

export const todosActions = todosSlice.actions;
export default todosSlice.reducer;