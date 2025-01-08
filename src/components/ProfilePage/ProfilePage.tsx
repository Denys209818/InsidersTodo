import { useAppSelector } from "../../hooks"

export const ProfilePage = () => {
    const { name } = useAppSelector(state => state.user);

    return (<>
        Profile {name}
    </>)
}