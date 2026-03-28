
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Product } from "@/types/product";


const GET_PRODUCTS_URL = '/api/products';
const COMMON_FETCH_ERROR =  'Network response was not ok';

interface IProductsResponse {
    products: Product[];
    total: number;
    page: number;
    size: number;
    totalPages: number;
}

const fetchProducts = async (): Promise<IProductsResponse> => {
    const response = await fetch(GET_PRODUCTS_URL);
     if (!response.ok) {
        throw new Error(COMMON_FETCH_ERROR);
    }
return response.json();
}

export const useProducts = () => {
    const query = useSuspenseQuery<IProductsResponse>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    return query;
}


