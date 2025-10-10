import { Separator } from "../shared/Separator"

const availableBrands = [
    'Adidas',
    'Nike',
    'Vans',
    'DC',
    'Pumas',
    'NewBalance',
]

const availableTypes = [
    'Gorras',
    'Remeras',
    'Pantalones',
    'Zapatillas',
]

interface Props {
    selectedBrands: string[];
    setSelectedBrands: (brand: string[]) => void;
    selectedTypes: string[];
    setSelectedTypes: (types: string[]) => void;    
}


export const ContainerFilter = ({
    selectedBrands = [],
    setSelectedBrands,
    selectedTypes = [],
    setSelectedTypes,
}: Props) => {


    const handleBrandChange = (brand: string) => {
        if(selectedBrands?.includes(brand)){
            setSelectedBrands(selectedBrands.filter(b => b !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand])
        }
    };

    const handleTypesChange =(type: string) =>{
        if(selectedTypes?.includes(type)){
            setSelectedTypes(selectedTypes.filter(b => b !== type));
        } else {
            setSelectedTypes([...selectedTypes, type])
        }
    }


    return (
        <div className="p-5 border border-slate-200 rounded-lg h-fit col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-xs mb-4">
                Filtros
            </h3>

            {/*SEPARATOR*/}
            <Separator />

            <div className="flex flex-col gap-3">
                <h3 className="text-lg font-medium text-black">Tipo</h3>
                <div className="flex flex-col gap-2">
                    {availableTypes.map(types => (
                        <label key={types} className="inline-flex items-center">
                            <input 
                                type="checkbox" 
                                className="text-black border-black focus:ring-black accent-black"
                                checked={selectedTypes?.includes(types)}
                                onChange={() => handleTypesChange(types)} 
                            />
                            <span className="ml-2 text-black text-sm cursor-pointer">{types}</span>
                        </label>
                    ))}

                </div>

                <h3 className="text-lg font-medium text-black">Marcas</h3>

                <div className="flex flex-col gap-2">
                    {availableBrands.map(brand => (
                        <label key={brand} className="inline-flex items-center">
                            <input 
                                type="checkbox" 
                                className="text-black border-black focus:ring-black accent-black"
                                checked={selectedBrands?.includes(brand)}
                                onChange={() => handleBrandChange(brand)} 
                            />
                            <span className="ml-2 text-black text-sm cursor-pointer">{brand}</span>
                        </label>
                    ))}
                    
                </div>
            </div>
        </div>
    );
};