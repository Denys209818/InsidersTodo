export type TodoTable = {
    id: number;
    title: string;
};

export type TodoInfo = {
    activeTable: TodoTable|null,
    tables: TodoTable[],
};