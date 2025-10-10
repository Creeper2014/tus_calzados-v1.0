import { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";


interface Props {
    images: string[];
}


export const GridImages = ({ images }: Props) => {
    
    const [activeImage, setActiveImage] = useState(images[0])
    const currentIndex = images.indexOf(activeImage);

    const handleImageClick = (image: string) => {
        setActiveImage(image);

    };
    
    const nextImage = () => {
        const nextIdx = (currentIndex + 1) % images.length;
        setActiveImage(images[nextIdx]);
    };

    const prevImage = () => {
        const prevIdx = (currentIndex - 1 + images.length) % images.length;
        setActiveImage(images[prevIdx]);
    };

    
    return (
        <div className="flex-1 flex flex-col h-[500px] gap-3 relative">
            <div className="bg-[#f2f2f2] h-[500px] p-4">
                <img
                    src={activeImage}
                    alt="Image de Producto"
                    className="h-full w-full object-contain"
                />

                {/* FLECHAS */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded "
                        >
                            <LuChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded "
                        >
                            <LuChevronRight size={20} />
                        </button>
                    </>
                )}

            </div>

            {/* MINIATURAS */}
            <div className="flex mt-4 gap-2">
                {images.map((image, index) => (
                    <button 
                        key={index} 
                        onClick={() => handleImageClick(image)}
                        className={`w-16 h-16 p-1 border ${
                            activeImage === image 
                                ? 'border-black'
                                : 'border-transparent' 
                        } rounded-lg hover:border-black focus:outline-none`}
                    >
                        <img 
                            src={image} 
                            alt={`Thumbnail ${index + 1}`} 
                            className="w-full h-full object-cover rounded-lg" 
                        />
                    </button>
                ))}
                
            </div>
        </div>
    );
};