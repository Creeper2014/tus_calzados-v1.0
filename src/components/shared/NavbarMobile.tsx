import { IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { useGlobalStore } from "../../store/global.store";
import { navbarLinks } from "../../constants/links";

export const NavbarMobile = () => {
    const setActiveNavMobile = useGlobalStore(
        state => state.setActiveNavMobile
    );

    return (
        <div
            className="bg-black/80 to-transparent text-white h-screen w-full shadow-lg animate-slide-in-left fixed z-50
            flex justify-center py-32"
        >
            <button
                className="absolute top-5 right-5"
                onClick={() => setActiveNavMobile(false)}
            >
                <IoMdClose size={30} className="text-white" />
            </button>

            {/* CONTENIDO */}
            <div className="flex flex-col gap-20">
                <Link 
                    to="/" 
                    className="text-4xl font-bold tracking-tighter transition-all" 
                    onClick={() => setActiveNavMobile(false)}
                >
                    <p>
                        Tus
                        <span className="text-white">Calzados</span>
                    </p>
                </Link>

                <nav className="flex flex-col items-center gap-5">
                    {navbarLinks.map(item => (
                        <NavLink
                            to={item.href}
                            key={item.id}
                            onClick={() => setActiveNavMobile(false)} // 🔹 Cierra el menú al hacer clic
                            className={({ isActive }) => `
                                ${isActive ? 'text-white underline' : ''} 
                                transition-all duration-300 font-semibold text-xl 
                                hover:text-white hover:underline
                            `}
                        >
                            {item.title}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
};
