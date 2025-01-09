import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoInfo, TodoTable } from "../types/table";
import { LogoutUser } from "../../actions/AuthActions";

const initialState: TodoInfo = {
    activeTable: null,
    tables: []
};

const tablesSlice = createSlice({
    name: 'tables',
    initialState: initialState,
    reducers: {
        addTable(state, action: PayloadAction<{id: number, title: string, status: 'ADMIN'|'VIEW'}>) {
            state.tables.push({
                id: action.payload.id,
                title: action.payload.title,
                status: action.payload.status,
            });
        },
        editTable(state, action: PayloadAction<{id: number, newTitle: string}>) {
            const actTable = {...state.activeTable};

            if (state.activeTable && state.activeTable.id === action.payload.id) {
                actTable.title = action.payload.newTitle;
            }         

            return {
                activeTable: { ...actTable } as TodoTable,
                tables: state.tables.map(item => {
                    if (item.id === action.payload.id) {
                        const newItem = {
                            ...item,
                            title: action.payload.newTitle,
                        };

                        return newItem;
                    }

                    return item;
                })};
        },
        removeTable(state, action: PayloadAction<number>) {
            return {
                activeTable: null,
                tables: state.tables.filter(tbl => tbl.id !== action.payload)
            };
        },
        setActiveTable(state, action: PayloadAction<number>) {
            const table = state.tables.find(t => t.id === action.payload) || null;

            state.activeTable = table;
        } 
    },
    extraReducers(builder) {
        builder.addCase(LogoutUser.fulfilled, (state) => {
            return {
                activeTable: null,
                tables: [],
            };
        });
    }
});

export const tablesActions = tablesSlice.actions;
export default tablesSlice.reducer;