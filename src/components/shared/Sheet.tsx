import { useEffect, useRef } from "react";
import { useGlobalStore } from "../../store/global.store";
import { Search } from "./Search";
import { Cart } from "./Cart";

export const Sheet = () => {

    const sheetContent = useGlobalStore(state => state.sheetContent);
    const closeSheet = useGlobalStore(state => state.closeSheet);

    const sheetRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        //funcion para manejar clcick fueras del sheet
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                sheetRef.current && 
                !sheetRef.current.contains(event.target as Node)
            ) {
                closeSheet();
            }
        };

        // AGREGAR EVENT LISTENER
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('mousedown', handleOutsideClick);
        }

    },[closeSheet]);



    //FUNCION PARA SABER EL COMPONENTE
    const renderContent = () => {
        switch(sheetContent) {
            case 'cart':
                return <Cart />;
            case 'search':
                return <Search/>;
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-r from-black/50 to-transparent z-50 flex justify-end animate-fade-in">
            <div
                ref={sheetRef}
                className="bg-white text-black h-screen w-[500px] shadow-lg animate-slide-in"
            >
                {renderContent()}
            </div>
        </div>
    );
};