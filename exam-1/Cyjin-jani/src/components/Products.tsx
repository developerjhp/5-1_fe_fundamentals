import { useProducts } from '../hooks/useProducts';
import { ProductCard } from './ProductCard';

export const Products = () => {
  const { data } = useProducts();

  return (
    <div className="w-full max-w-[860px] mx-auto px-4 py-6">
      <div className="grid grid-cols-4 gap-4">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
