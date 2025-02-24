import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../features/newsSlice";
import "../styles/searchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchQuery(value));
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [value, dispatch]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="🔍 Tìm kiếm tin tức..."
      value={value}
      onChange={handleSearch}
      className="search-bar"
    />
  );
};

export default SearchBar;
