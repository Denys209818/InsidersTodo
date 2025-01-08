export type InputType = {
    id: string;
    label: string;
    type?: string;
    placeholder: string;
    value: string;
    onChangeHandler: (arg: string) => void;
    errors: string[];
};

export const Input: React.FC<InputType> = ({ id, type = 'text', label, placeholder, value, onChangeHandler, errors}) => {
    return (<div>
        <label
            htmlFor={id}
            className="text-black font-medium text-lg"
        >
            {label}
        </label>

        <input
            type={type}
            id={id}
            name={id}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChangeHandler(e.target.value)}
            className={`
            block
            w-full
            px-2
            py-3
            outline-none
            border
            border-black  
            text-lg
        `}
        />

        {errors && errors.map(err => {
            return err && err.length > 0 && (<p className="text-[#A31D1D]" key={err}>{err}</p>)
        })}
    </div>)
}