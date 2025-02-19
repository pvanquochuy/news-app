import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../features/newsSlice";
import { loggerMiddleware } from "../middleware/loggerMiddleware";
import { newsApi } from "../services/newsApi";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware, loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
