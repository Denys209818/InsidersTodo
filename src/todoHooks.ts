import { collection, getDocs, query, where } from "firebase/firestore";
import {db} from './firebase';

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
        console.log("No document found with tableId:", tableId);
    }
}

export const getTables = async (userId: number) => {
    const q = query(collection(db, "Table"));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const todos = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
        }));

        return todos;
    } else {
        console.log("No document found");
    }
}