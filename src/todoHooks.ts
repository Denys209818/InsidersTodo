import { collection, getDocs, updateDoc, query, where, orderBy, limit, setDoc, doc, deleteDoc} from "firebase/firestore";
import {db} from './firebase';
import { Todo } from "./redux/types/todo";
import { TodoTable } from "./redux/types/table";

async function getLastDocumentId(collectionName: string) {
    const q = query(
        collection(db, collectionName), 
        orderBy("Id", "desc"),
        limit(1)
    );

    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const lastDocument = querySnapshot.docs[0].data();
            return lastDocument['Id'];
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching the last document:", error);

        return null;
    }
}

export const getTodosByTableId = async (tableId: number) => {
    const q = query(collection(db, "Todo"), where("TableId", "==", tableId));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const todos = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return todos;
    } else {
        return [];
    }
}

export const getTablesByEmail = async (userEmail: string) => {
    const q = query(collection(db, "UserTable"), where('Email', '==', userEmail));

    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
        const userTables = querySnapshot.docs.map(async (doc) => {
            const docItem = doc.data();

            const tablesQuery = query(collection(db, "Table"), where("Id", "==", docItem['TableId']));

            const querySnapshotTables = await getDocs(tablesQuery);

            if (!querySnapshotTables.empty) {
                const allTables = querySnapshotTables.docs.map(d => ({ ...d.data() }));

                return {...allTables[0], Status: docItem['Status']};
            }

            return null;
        });

        const received: ({[x: string]: any}|null)[]= [];

        for (const usrTbl of userTables) {
            if (usrTbl !== null) {
                const result = await usrTbl;
                received.push(result);
            }
        }

        return received;
    } else {        
        return [];
    }
}

export const createTable = async (title: string, userEmail: string) => {
    const nextId = (await getLastDocumentId('Table') || 1) + 1;
    const nextIdUserTable = (await getLastDocumentId('UserTable') || 0) + 1;

    await setDoc(doc(db, "Table", "Table" + nextId), {
        Id: nextId,
        Title: title,
    });

    await setDoc(doc(db, "UserTable", "UserTable" + nextIdUserTable), {
        Id: nextIdUserTable,
        Email: userEmail,
        Status: 'ADMIN',
        TableId: nextId,
    });

    return {
        id: nextId,
        title,
    };
}

export const updateTable = async (updatedTable: TodoTable) => {
    const q = query(collection(db, "Table"), where('Id', '==', updatedTable.id));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        console.error("No document found with the specified Id.", querySnapshot);
        return;
    }

    querySnapshot.forEach(async (docSnapshot) => {
        const documentRef = docSnapshot.ref;
        await updateDoc(documentRef, {
            Title: updatedTable.title,
            Status: updatedTable.status,
        });
    });
}

export const deleteTable = async (id: number) => {
    await deleteDoc(doc(db, "Table", "Table" + id));
    
    const q = query(collection(db, "Todo"), where("TableId", "==", id));
    const qMiddleTable = query(collection(db, "UserTable"), where("TableId", "==", id));

    const querySnapshot = await getDocs(q);
    const querySnapshotMiddleTable = await getDocs(qMiddleTable);

    if (!querySnapshot.empty) {
        for (const docEntity of querySnapshot.docs) {
            await deleteDoc(docEntity.ref);
        }
    }

    if (!querySnapshotMiddleTable.empty) {
        for (const docEntity of querySnapshotMiddleTable.docs) {
            await deleteDoc(docEntity.ref);
        }
    }
}

export const updateTodo = async (updatedTodo: Omit<Todo, 'tableId'>) => {
    const q = query(collection(db, "Todo"), where('Id', '==', updatedTodo.id));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        console.error("No document found with the specified Id.", querySnapshot);
        return;
    }

    querySnapshot.forEach(async (docSnapshot) => {
        const documentRef = docSnapshot.ref;
        await updateDoc(documentRef, {
            Title: updatedTodo.title,
            Completed: updatedTodo.completed
        });
    });
}

export const createTodo = async (tableId: number) => {
    const nextId = (await getLastDocumentId('Todo') || 1) + 1;

    await setDoc(doc(db, "Todo", "Todo" + nextId), {
        Completed: false,
        Title: '',
        TableId: tableId,
        Id: nextId
    });

    return {
        id: nextId,
        title: '',
        tableId: tableId,
        completed: false,
    };
}

export const deleteTodo = async (id: number) => {
    await deleteDoc(doc(db, "Todo", "Todo" + id));
}

export const grantRules = async (tableId: number, email: string, status: string) => {
    const q = query(collection(db, "UserTable"), 
        where('Email', '==', email),
        where('TableId', '==', tableId)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        const nextIdUserTable = (await getLastDocumentId('UserTable') || 0) + 1;

        await setDoc(doc(db, "UserTable", "UserTable" + nextIdUserTable), {
            Id: nextIdUserTable,
            Email: email,
            Status: status,
            TableId: tableId,
        });
    }
}