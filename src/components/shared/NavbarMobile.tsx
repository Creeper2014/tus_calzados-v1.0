import { IoMdClose } from "react-icons/io";
import { useGlobalStore } from "../../store/global.store";
import { navbarLinks } from "../../constants/links";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

export const NavbarMobile = () => {
    const setActiveNavMobile = useGlobalStore(
        state => state.setActiveNavMobile
    );

    return <div className="bg-white text-black h-screen w-full shadow-lg animate-slide-in-left fixed z-50
    flex justify-center py-32">
        <button
            className="absolute top-5 right-5"
            onClick={() => setActiveNavMobile(false)}
        >
            <IoMdClose size={30} className="text-black" />
        </button>


        {/*CONTENIDO*/}
        <div className="flex flex-col gap-20">
            <Link 
                to="/" 
                className="text-4xl font-bold tracking-tighter transition-all" 
                onClick={() => setActiveNavMobile(false)}
            >
                <p>
                    Tus
                    <span className="text-black">Calzados</span>
                </p>
            </Link>

            <nav className="flex flex-col items-center gap-5">
                {navbarLinks.map(item => (
                    <NavLink
                        to={item.href}
                        key={item.id}
                        className={({isActive}) => `
                            ${isActive ? 'text-black underline': ''} transition-all duration-300 font-semibold text-xl hover:text-black hover:underline
                        `}
                    >{item.title}</NavLink>
                ))}
            </nav>
        </div>
    </div>;
};