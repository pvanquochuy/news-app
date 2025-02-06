import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchNews, setCategory } from "../features/newsSlice";
import "../styles/CategorySelector.css";

const categories = [
  "general",
  "business",
  "technology",
  "sports",
  "entertainment",
  "health",
  "science",
];

const CategorySelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentCategory = useSelector(
    (state: RootState) => state.news.category
  );

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category));
    dispatch(fetchNews(category));
  };

  return (
    <div className="category-selector">
      <h3>📢 Danh mục</h3>
      <select
        value={currentCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;
