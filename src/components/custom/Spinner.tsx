import '../../spinner.css';

export const Spinner = () => {
    return <div className={`
        absolute
        left-[-100%]
        top-[50%]
        -translate-y-2/4
        size-8
    `}>
        <div className='loader'></div>
    </div>
}