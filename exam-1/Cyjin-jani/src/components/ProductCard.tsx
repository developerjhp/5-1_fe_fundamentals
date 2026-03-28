import type { FC } from 'react';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({
  product: { name, price, category, createdAt, rating, imageUrl },
}: ProductCardProps) => {
  return (
    <div>
      <div>name: {name}</div>
      <div>price: {price}</div>
      <div>category: {category}</div>
      <img src={imageUrl} alt="product-image" />
      <div>createdAt: {createdAt}</div>
      <div>rating: {rating}</div>
    </div>
  );
};
