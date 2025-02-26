import { configureStore } from "@reduxjs/toolkit";
import newsReducer, { addToFavorites } from "../../features/newsSlice";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import FavoriteList from "../../components/FavoriteList";
import "@testing-library/jest-dom";

const mockArticle = {
  source: { name: "BBC" },
  title: "Breaking News",
  description: "Some description",
  url: "https://example.com",
  urlToImage: "https://example.com/image.jpg",
  publishedAt: "2024-08-12",
  content: "Full content of the article",
  author: "Author Name",
};

const setupStore = () => {
  return configureStore({
    reducer: { news: newsReducer },
  });
};

describe("FavoriteList", () => {
  test("should display emty message when no articles are favorited", () => {
    const store = setupStore();

    render(
      <Provider store={store}>
        <FavoriteList />
      </Provider>
    );
    expect(screen.getByText(/Chưa có tin yêu thích nào!/i)).toBeInTheDocument();
  });

  test("should display favorited articles", () => {
    const store = setupStore();
    store.dispatch(addToFavorites(mockArticle));

    render(
      <Provider store={store}>
        <FavoriteList />
      </Provider>
    );

    expect(screen.getByText("Breaking News")).toBeInTheDocument();
  });

  test("delete button should remove article from favorites", async () => {
    const store = setupStore();
    store.dispatch(addToFavorites(mockArticle));

    render(
      <Provider store={store}>
        <FavoriteList />
      </Provider>
    );

    const removeButton = screen.getByText(/❌ Xóa/i);
    userEvent.click(removeButton);

    expect(
      await screen.findByText(/Chưa có tin yêu thích nào!/i)
    ).toBeInTheDocument();
  });
});
