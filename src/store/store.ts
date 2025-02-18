import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../features/newsSlice";
import { loggerMiddleware } from "../middleware/loggerMiddleware";

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
