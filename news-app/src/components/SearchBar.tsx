import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../features/newsSlice";
import "../styles/searchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <input
      type="text"
      placeholder="🔍 Tìm kiếm tin tức..."
      onChange={handleSearch}
      className="search-bar"
    />
  );
};

export default SearchBar;
