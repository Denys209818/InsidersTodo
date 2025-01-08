import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/userSlice';
import todosReducer from './reducers/todoSlice';
import tablesReducer from './reducers/tableSlice';


export const rootReducer = combineReducers({
    user: userReducer,
    todos: todosReducer,
    tables: tablesReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;