/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Input } from "../custom/Input";
import { useEffect, useState } from "react";
import { LoginUser, RegisterUser } from "../../actions/AuthActions";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { registerSchema } from "./validation/registerValidation";
import * as Yup from 'yup';
import { Spinner } from "../custom/Spinner";

export const AuthPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (registerErrors['name']) {
            setRegisterErrors(prev => ({
                ...prev,
                name: []
            }));
        }
    }, [name]);

    useEffect(() => {
        if (registerErrors['email']) {
            setRegisterErrors(prev => ({
                ...prev,
                email: []
            }));
        }
    }, [email]);

    useEffect(() => {
        if (registerErrors['password']) {
            setRegisterErrors(prev => ({
                ...prev,
                password: []
            }));
        }
    }, [password]);

    const [registerErrors, setRegisterErrors] = useState<{[key: string]: string[]}>({});

    const dispatch = useAppDispatch();

    const { error, isLoading } = useAppSelector(state => state.user);

    const { authType } = useParams();

    const { name: userName, token } = useAppSelector(user => user.user);

    if (userName && token) {
        return <Navigate to={'/profile'} />
    }

    if (authType !== 'register' && authType !== 'login') {
        return <Navigate to={'/auth/login'} />
    }

    async function Log() {
        await dispatch(LoginUser({
            email: email,
            password: password,
        }));
        
        navigate('/profile');
    }

    async function Reg(data: { name: string, email: string, password: string }) {
        await dispatch(RegisterUser({
            name: data.name,
            email: data.email,
            password: data.password,
        }));

        if (!error) {
            navigate('/profile');
        }
    }

    const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        switch (authType) {
            case 'login': {
                Log();

                break;
            }

            case 'register': {
                registerSchema.validate({
                    email,
                    password,
                    name
                }, { abortEarly: false })
                    .then((data) => {
                        Reg(data);
                    })
                    .catch((err: any) => {
                        const errors: { [key: string]: string[] } = {};

                        err.inner.forEach((item: Yup.ValidationError) => {
                            if (item.path) {
                                errors[item.path] = item.errors;
                            }
                        });

                        setRegisterErrors(errors);
                    });

                break;
            }
        }
    }

    const title = authType === 'register' ? 'Register' : 'Login';

    return (<>
        <section className="flex justify-center items-center w-full">
            <div className="block p-3 border-black rounded-xl w-[50%] bg-[#F5F7F8] overflow-hidden">
                <h2 className="font-semibold uppercase text-3xl text-center">
                    {title}
                </h2>

                <div className="flex flex-col gap-4">
                    <form onSubmit={handleSubmitForm} className="flex flex-col gap-4 w-full mt-4">
                        {authType === 'register' && <Input
                            value={name}
                            onChangeHandler={(arg) => setName(arg)}
                            placeholder="Enter a name"
                            id="name"
                            label="Name"
                            errors={registerErrors['name']}
                        />}

                        <Input
                            value={email}
                            onChangeHandler={(arg) => setEmail(arg)}
                            placeholder="Enter an email"
                            id="email"
                            label="Email"
                            errors={registerErrors['email']}
                        />

                        <Input
                            value={password}
                            type="password"
                            onChangeHandler={(arg) => setPassword(arg)}
                            placeholder="Enter a password"
                            id="password"
                            label="Password"
                            errors={registerErrors['password']}
                        />

                        <button className={`
                            relative
                            block
                            w-full
                            outline-none
                            border
                            py-4
                            bg-[#03001C]
                            text-white
                            uppercase
                            transition
                            duration-300
                            ease-in-out
                            hover:bg-[#301E67]
                            text-lg
                            font-bold
                            `}
                            disabled={isLoading}
                            >
                            <span className="relative">{isLoading && <Spinner/>} {title}</span>
                        </button>
                    </form>

                    {error && <pre className="text-[#A31D1D]">
                        {error}    
                    </pre>}
                </div>
            </div>
        </section>
    </>);
}