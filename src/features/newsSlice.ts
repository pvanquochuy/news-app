import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "../types/Article";

interface NewsState {
  articles: Article[];
  favorites: Article[];
  searchQuery: string;
  category: string;
  startDate: string;
  endDate: string;
  author: string;
  status: "idle" | "loading" | "failed";
}

const loadFavoritesFromLocalStorage = (): Article[] => {
  const storedFavorites = localStorage.getItem("favorites");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const initialState: NewsState = {
  articles: [],
  favorites: loadFavoritesFromLocalStorage(),
  searchQuery: "",
  category: "general",
  startDate: "",
  endDate: "",
  author: "",
  status: "idle",
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Article>) => {
      const isExist = state.favorites.some(
        (article) => article.title === action.payload.title
      );
      if (!isExist) {
        state.favorites.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (article) => article.title !== action.payload
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setAuthor: (state, action: PayloadAction<string>) => {
      state.author = action.payload;
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  setSearchQuery,
  setCategory,
  setStartDate,
  setEndDate,
  setAuthor,
} = newsSlice.actions;
export default newsSlice.reducer;
