import { Link } from "react-router-dom";

export const MainPage = () => {
    return (
        <>
            <section>
                <div className="max-w-[70%] text-center m-auto">
                    <h1 className="uppercase text-7xl font-semibold">
                        <span className="px-1 bg-[#301E67] text-white rounded-xl leading-normal">Start</span> 
                        {' '}managing your daily tasks
                    </h1>

                    <div className="flex justify-center items-center gap-12 mt-4">
                        <Link to={'/auth/login'} className={`
                            block
                            p-4
                            bg-[#03001C]
                            text-white
                            rounded-lg
                            hover:bg-[#301E67]
                            transition 
                            duration-300 
                            ease-in-out
                        `}>
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}