import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Article } from "../types/Article";

const API_KEY = "d80ccd8a086b4f2bbb08fe2160b55326";

interface TopHeadlinesResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://newsapi.org/v2/" }),
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<
      TopHeadlinesResponse,
      { category: string; page?: number; pageSize?: number }
    >({
      query: ({ category, page = 1, pageSize = 10 }) => {
        const url = `top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
        console.log("Fetching URL:", url);
        return url;
      },
    }),
  }),
});

export const { useGetTopHeadlinesQuery } = newsApi;
