export type TodoTable = {
    id: number;
    title: string;
    status: 'ADMIN'|'VIEW';
};

export type TodoInfo = {
    activeTable: TodoTable|null,
    tables: TodoTable[],
};