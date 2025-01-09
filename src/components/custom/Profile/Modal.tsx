import { createPortal } from "react-dom";
import { emailSchema } from "./validation/emailValidation";
import { useState } from "react";
import * as Yup from 'yup';
import { grantRules } from "../../../todoHooks";
import { useAppSelector } from "../../../hooks";

export type ModalType = {
    isOpen: boolean;
    onClose: () => void;
};

const Modal: React.FC<ModalType> = ({ isOpen = true, onClose }) => {
    const [email, setEmail] = useState({
        value: '',
        errors: {}
    });
    const [status, setStatus] = useState('ADMIN');
    const [isGrant, setIsGrant] = useState(false);
    
    const { activeTable } = useAppSelector(state => state.tables);

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        emailSchema.validate({
            email: email.value,
        }, { abortEarly: false })
        .then((validated) => {
            if (activeTable) {
                setIsGrant(true);

                grantRules(activeTable.id, validated.email, status)
                .then(() => {
                    onClose();
                })
                .finally(() => {
                    setIsGrant(false);
                });
            }
        })
        .catch((err: any) => {
            const errors: { [key: string]: string[] } = {};

            err.inner.forEach((item: Yup.ValidationError) => {
                if (item.path) {
                    errors[item.path] = item.errors;
                }
            });


            console.log(Object.values(errors));
            setEmail(prev => ({
                ...prev,
                errors: errors,
            }));
        });;
    }

    return (createPortal(
    <dialog
    open={isOpen}
    className={`
        fixed
        z-50
        top-0
        left-0
        
        size-full
        bg-[#a6aebf8f]
    `}
    >
        <div className={`
            absolute 
            left-1/2 
            top-1/2 
            -translate-x-1/2 
            -translate-y-1/2 
            block w-[60%] 
            border-black 
            border p-6 
            bg-white
        `}>
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-4xl">
                    Grant permission
                </h1>

                <button
                    onClick={onClose}
                    className={`
                        transition 
                        duration-300
                        ease-in-out
                        p-1
                        hover:bg-red-400
                        hover:text-white
                    `}
                >
                    CLOSE
                </button>
            </div>

            <form className={`
                flex
                flex-col
                gap-4
                w-full
                pt-4
            `}
            onSubmit={onSubmitHandler}>
                <input
                    type="text"
                    placeholder="Write an email"
                    className={`block border border-black px-4 py-2 w-full`}
                    value={email.value}
                    onChange={(e) => setEmail(prev => ({...prev, value: e.target.value}))}
                />

                {email.errors && 
                    Object.values(email.errors).map((value: any) => (
                        <p className="text-red-400">
                            {value.reduce((prev: string, curr: string) => prev + curr + '\n', '')}
                        </p>
                    ))}

                <select 
                    name="role" 
                    id="role" 
                    className="px-4 py-2 border border-black" 
                    value={status} 
                    onChange={e => setStatus(e.target.value)}
                >
                    <option value="ADMIN">ADMIN</option>
                    <option value="VIEW">VIEWER</option>
                </select>

                <button
                    className={`
                        block
                        bg-black
                        text-white
                        px-4
                        py-2
                        text-lg
                        uppercase
                        hover:bg-[#00000095]
                        transition
                        duration-300
                        ease-in-out
                    `}
                    disabled={isGrant}
                >
                    Grant
                </button>
            </form>
        </div>
    </dialog>, document.body));
}

export default Modal;