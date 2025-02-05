import { configureStore } from "@reduxjs/toolkit";
import newsReducer, {
  addToFavorites,
  fetchNews,
  removeFromFavorites,
} from "../../features/newsSlice";

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

const intialState: NewsState = {
  articles: [],
  favorites: [],
  status: "idle",
};

const mockArticle = {
  source: { name: "BBC" },
  title: "Breaking News",
  description: "Some description",
  url: "https://example.com",
  urlToImage: "https://example.com/image.jpg",
  publishedAt: "2024-08-12",
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ articles: [mockArticle] }),
  })
) as jest.Mock;

describe("newsSclce", () => {
  test("should return the initial state", () => {
    expect(newsReducer(undefined, { type: "" })).toEqual(intialState);
  });

  test("should add an article to favorites", () => {
    const nextState = newsReducer(intialState, addToFavorites(mockArticle));
    expect(nextState.favorites).toHaveLength(1);
    expect(nextState.favorites[0]).toEqual(mockArticle);
  });

  test("should remove an article from favorites", () => {
    const stateWithFavorites = { ...intialState, favorites: [mockArticle] };
    const nextState = newsReducer(
      stateWithFavorites,
      removeFromFavorites("Breaking News")
    );
    expect(nextState.favorites).toHaveLength(0);
  });

  test("should fetch news and update state", async () => {
    const store = configureStore({
      reducer: { news: newsReducer },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });

    await store.dispatch(
      fetchNews() as unknown as ReturnType<typeof fetchNews>
    );
    const state = store.getState().news;
    expect(state.articles).toHaveLength(1);
  });
});
