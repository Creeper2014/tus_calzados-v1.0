import { BiWorld } from "react-icons/bi";
import { FaHammer } from "react-icons/fa6";
import { HiMiniReceiptRefund } from "react-icons/hi2";
import { MdLocalShipping } from "react-icons/md";

export const FeatureGrid = () => {
    return (
        <div className="grid grid-cols-2 gap-8 mt-6 mb-16 lg:grid-cols-4 lg:gap-5">
            <div className="flex items-center gap-6">
                <MdLocalShipping size={40} className="text-slate-600" />

                <div className="slate-y-1">
                    <p className="font semibolt">Envíos gratis</p>
                    <p className="text-sm">En todos nuestros productos selecionados</p>
                </div>
            </div>
            
            <div className="flex items-center gap-6">
                <FaHammer size={40} className="text-slate-600" />

                <div className="slate-y-1">
                    <p className="font semibolt">Soporte 24/7 </p>
                    <p className="text-sm">Soporte activo en cualquier momento del día</p>
                </div>
            </div>
            
            <div className="flex items-center gap-6">
                <HiMiniReceiptRefund size={40} className="text-slate-600" />

                <div className="slate-y-1">
                    <p className="font semibolt">Devoluciones</p>
                    <p className="text-sm">Aceptamos tus devoluciones con 3 días habiles</p>
                </div>
            </div>
            
            <div className="flex items-center gap-6">
                <BiWorld size={40} className="text-slate-600" />

                <div className="slate-y-1">
                    <p className="font semibolt">Calidad premiun</p>
                    <p className="text-sm">Todos nuestros productos con la mejor calidad</p>
                </div>
            </div>
            
        
        </div>
    );

};