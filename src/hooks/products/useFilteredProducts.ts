import { useQuery } from "@tanstack/react-query"
import { getFilteredProducts } from "../../actions";



export const useFilteredProducts = ({
    page, 
    brands,
    types, 
}: {
    page: number; 
    brands: string[];
    types: string[];
}) => {
    const { data, isLoading } = useQuery({
        queryKey: ['filteredProducts', page, brands, types],
        queryFn: () => getFilteredProducts({ page, brands, types }),
        retry: false,
    });

    return {
        data: data?.data,
        isLoading,
        totalProducts: data?.count ?? 0,
    };
};