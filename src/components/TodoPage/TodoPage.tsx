import { useParams } from "react-router-dom";

export const TodoPage = () => {
    const { todosId } = useParams();

    return (<>Todo Page {todosId}</>);
}