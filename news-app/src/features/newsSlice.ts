import { store } from "./../store/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const API_KEY = "c55e643f7ab247b4a774755e7cc1c2fe";
// const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

export interface Article {
  source: { name: string };
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

interface NewsState {
  articles: Article[];
  favorites: Article[];
  searchQuery: string;
  category: string;
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
  status: "idle",
};

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (category: string = "general") => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );
    const data = await response.json();
    return data.articles;
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "idle";
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  setSearchQuery,
  setCategory,
} = newsSlice.actions;
export default newsSlice.reducer;
