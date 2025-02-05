import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const API_KEY = "c55e643f7ab247b4a774755e7cc1c2fe";
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

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
  status: "idle" | "loading" | "failed";
}

const initialState: NewsState = {
  articles: [],
  favorites: [],
  status: "idle",
};

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.articles;
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Article>) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (article) => article.title !== action.payload
      );
      console.log("action:", action);
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

export const { addToFavorites, removeFromFavorites } = newsSlice.actions;
export default newsSlice.reducer;
