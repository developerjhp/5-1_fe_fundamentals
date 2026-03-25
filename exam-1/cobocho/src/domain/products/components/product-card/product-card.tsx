import { CATEGORY_LABELS, type Product } from '../../api/products.types';
import { formatPrice } from '../../libs/format-price';

interface ProductCardProps {
	product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
	return (
		<div className="rounded border p-3">
			<img
				src={product.imageUrl}
				alt={product.name}
			/>
			<p className="truncate font-semibold">{product.name}</p>
			<p>{formatPrice(product.price)}</p>
			<span>{CATEGORY_LABELS[product.category]}</span>
			<span>{product.rating}</span>
		</div>
	);
};
