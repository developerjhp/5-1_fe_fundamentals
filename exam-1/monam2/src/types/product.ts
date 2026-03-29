export type Category = "shoes" | "tops" | "bottoms" | "accessories";
export type CategoryKR = "신발" | "상의" | "하의" | "액세서리";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  imageUrl: string;
  createdAt: string; // ISO 8601
  rating: number; // 1.0 ~ 5.0
}

export type SortOption = "price_asc" | "price_desc" | "newest" | "rating";
export type SortOptionKR = "가격 낮은순" | "가격 높은순" | "최신순" | "평점순";

export interface ProductFilters {
  categories: Category[];
  keyword?: string;
  sort: SortOption;
}
