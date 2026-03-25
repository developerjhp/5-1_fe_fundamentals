import './App.css';
import {
	CATEGORY_LABELS,
	SORT_OPTION_LABELS,
} from './domain/products/api/products.types';

function App() {
	return (
		<div>
			<div className="flex items-center gap-4">
				<label>
					검색어
					<input type="text" />
				</label>
				<div className="flex gap-2 items-center">
					{Object.entries(CATEGORY_LABELS).map(([category, label]) => (
						<div key={category}>
							<span>{label}</span>
						</div>
					))}
				</div>
				<label>
					정렬
					<select>
						{Object.entries(SORT_OPTION_LABELS).map(([sortOption, label]) => (
							<option
								key={sortOption}
								value={sortOption}
							>
								{label}
							</option>
						))}
					</select>
				</label>
				<button type="button">초기화</button>
			</div>
			<div>
				<span>상품 목록</span>
			</div>
		</div>
	);
}

export default App;
