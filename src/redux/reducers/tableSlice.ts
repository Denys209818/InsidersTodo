import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TodoTable = {
    id: number;
    title: string;
};

export type TodoInfo = {
    activeTable: TodoTable|null,
    tables: TodoTable[],
};

const initialState: TodoInfo = {
    activeTable: null,
    tables: [{
        id: 1,
        title: 'Table 1',
    }]
};

const tablesSlice = createSlice({
    name: 'tables',
    initialState: initialState,
    reducers: {
        addTable(state, action: PayloadAction<{id: number, title: string}>) {
            state.tables.push({
                id: action.payload.id,
                title: action.payload.title,
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
        setActiveTable(state, action: PayloadAction<number>) {
            const table = state.tables.find(t => t.id === action.payload) || null;

            state.activeTable = table;
        } 
    },
});

export const tablesActions = tablesSlice.actions;
export default tablesSlice.reducer;