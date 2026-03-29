import type {
  Category,
  CategoryKR,
  SortOption,
  SortOptionKR,
} from "@/types/product";

export const CATEGORY: Record<Category, CategoryKR> = {
  shoes: "신발",
  tops: "상의",
  bottoms: "하의",
  accessories: "액세서리",
} as const;

export const SORT: Record<SortOption, SortOptionKR> = {
  newest: "최신순",
  rating: "평점순",
  price_asc: "가격 낮은순",
  price_desc: "가격 높은순",
} as const;

export const DEFAULT_SORT: SortOption = "newest";
