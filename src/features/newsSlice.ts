import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Article } from "../types/Article";
import { RootState } from "../store/store";

const API_KEY = "d80ccd8a086b4f2bbb08fe2160b55326";
const LOCAL_STORAGE_KEY = "favorites";

const loadFromLocalStorage = (): Article[] => {
  try {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.log("error loading from local storage: ", error);
    return [];
  }
};

const saveToLocalStorage = (favorites: Article[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.log("error saving to local storage: ", error);
  }
};

interface NewsState {
  articles: Article[];
  favorites: Article[];
  filters: {
    searchQuery: string;
    category: string;
    startDate: string;
    endDate: string;
    author: string;
  };
  status: "idle" | "loading" | "failed";
}

const initialState: NewsState = {
  articles: [],
  favorites: loadFromLocalStorage(),
  filters: {
    searchQuery: "",
    category: "general",
    startDate: "",
    endDate: "",
    author: "",
  },
  status: "idle",
};

export const fetchArticles = createAsyncThunk(
  "news/fetchArticles",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const category = state.news.filters.category;
      const API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;

      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch articles");

      const data = await response.json();
      return data.articles;
    } catch (error) {
      console.log("error", rejectWithValue(error));
      return rejectWithValue(error);
    }
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
        saveToLocalStorage(state.favorites);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (article) => article.title !== action.payload
      );
      saveToLocalStorage(state.favorites);
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<NewsState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(fetchArticles), (state) => {
        state.status = "loading";
      })
      .addMatcher(isFulfilled(fetchArticles), (state, action) => {
        state.status = "idle";
        state.articles = action.payload;
      })
      .addMatcher(isRejected(fetchArticles), (state) => {
        state.status = "failed";
      });
  },
});

export const { addToFavorites, removeFromFavorites, setFilters, resetFilters } =
  newsSlice.actions;
export default newsSlice.reducer;
