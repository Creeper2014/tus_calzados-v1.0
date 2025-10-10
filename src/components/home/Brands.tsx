const brands = [
    {
        image:'/img/brands/nike.webp',
        alt: 'Nike',
    },
    {
        image:'/img/brands/adidas.png',
        alt: 'Adidas',
    },
    {
        image:'/img/brands/dc.png',
        alt: 'DC',
    },
    {
        image:'/img/brands/vans.png',
        alt: 'Vans',
    },
    {
        image:'/img/brands/newbalance.png',
        alt: 'Vans',
    },

]

export const Brands = () => {
    return (
        <div className="flex flex-col items-center gap-3 pt-16 pb-12">
            <h2 className="font-bold text-2xl">Marcas disponibles</h2>

            <p className="w-2/3 text-center text-sm md:text-base">
                contamos con la mejor calidad y con los ultimos modelos disponibles
            
            </p>

            <div className="grid grid-cols-3 gap-6 mt-8 md:grid-cols-6">
                {brands.map((brand, index) => (
                    <div key={index} className="flex justify-center items-center">
                        <img
                             
                            src={brand.image} 
                            alt={brand.alt}
                            
                        />            
                    </div>
                ))}
            </div>
        </div>
    );
};