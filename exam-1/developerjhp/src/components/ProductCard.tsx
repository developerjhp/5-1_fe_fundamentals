import { useState } from 'react';
import type { Category, Product } from '@/types/product';

const CATEGORY_LABELS: Record<Category, string> = {
  shoes: '신발',
  tops: '상의',
  bottoms: '하의',
  accessories: '액세서리',
};

function formatPrice(price: number): string {
  return `${price.toLocaleString('ko-KR')}원`;
}

function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    '\u2605'.repeat(full) + (half ? '\u00BD' : '') + '\u2606'.repeat(empty)
  );
}

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        {imgError ? (
          <div className="product-image-fallback">이미지 없음</div>
        ) : (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
        <span className="product-category-badge">
          {CATEGORY_LABELS[product.category]}
        </span>
      </div>
      <div className="product-info">
        <h3 className="product-name" title={product.name}>
          {product.name}
        </h3>
        <p className="product-price">{formatPrice(product.price)}</p>
        <div className="product-rating">
          <span className="stars">{renderStars(product.rating)}</span>
          <span className="rating-number">{product.rating.toFixed(1)}</span>
        </div>
      </div>
    </article>
  );
}
