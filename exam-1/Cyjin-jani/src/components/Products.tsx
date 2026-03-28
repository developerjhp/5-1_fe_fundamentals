import { useProducts } from '../hooks/useProducts';
import { ProductCard } from './ProductCard';

export const Products = () => {
  const { data } = useProducts();

  return (
    <div>
      {data.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
