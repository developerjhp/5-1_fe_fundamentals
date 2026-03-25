import './App.css';
import type { ProductsRequest } from './domain/products/api/products.types';
import {
	categorySchema,
	productsSortOptionSchema,
} from './domain/products/api/products.types';
import { ProductSearchFilter } from './domain/products/components/product-search-filter';
import {
	parseAsArrayOf,
	parseAsEnum,
	parseAsInteger,
	parseAsString,
	useQueryStates,
} from './hooks/use-query-state';

function App() {
	const [filters, setFilters] = useQueryStates<ProductsRequest>({
		categories: parseAsArrayOf(parseAsEnum(categorySchema.options))
			.nullable()
			.withDefault(null),
		keyword: parseAsString.nullable().withDefault(null),
		sort: parseAsEnum(productsSortOptionSchema.options)
			.nullable()
			.withDefault(null),
		page: parseAsInteger.withDefault(1),
		size: parseAsInteger.withDefault(20),
	});

	return (
		<div>
			<ProductSearchFilter
				value={filters}
				onChange={setFilters}
			/>
			<div>
				<span>상품 목록</span>
			</div>
		</div>
	);
}

export default App;
