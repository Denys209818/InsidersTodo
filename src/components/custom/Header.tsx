import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { LogoutUser } from "../../actions/AuthActions";

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { name } = useAppSelector(state => state.user);

    const onLogout = () => {
        async function logout() {
            await dispatch(LogoutUser());
        }

        logout().then(() => {
            navigate('/');
        });
    }

    const linkStyles = `
        text-white
        text-xl
        font-semibold
        hover:text-[#789DBC]
        transition 
        duration-300 
        ease-in-out
        hover:cursor-pointer
    `;

    return (
    <header className="sticky top-0">
        <section className="block w-full p-4 bg-[#03001C]">
            <div className="flex justify-between items-center">
                <h1 className="text-white text-2xl hover:cursor-pointer" onClick={() => navigate('/')}>Todo App</h1>

                <nav className="">
                    <ul className="flex gap-8 list-none p-0">
                        {name && (<><li>
                            <Link to={'/profile'} className={linkStyles}>
                                {name}
                            </Link>
                        </li>

                        <li>
                            <p className={linkStyles} onClick={onLogout}>
                                Log Out
                            </p>
                        </li></>)}

                        {!name && <><li>
                            <Link to={'/auth/login'} className={linkStyles}>
                                Login
                            </Link>
                        </li>

                        <li>
                            <Link to={'/auth/register'} className={linkStyles}>
                                Register
                            </Link>
                        </li></>}
                    </ul>
                </nav>
            </div>
        </section>
    </header>
    );
}