import { Provider } from "react-redux";
import CategorySelector from "../../components/CategorySelector";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { configureStore } from "redux-mock-store";

import { Store } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import { setCategory } from "../../features/newsSlice";

const mockStore = configureStore([]);

describe("CategorySelector", () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore({
      news: { category: "general" },
    });
    store.dispatch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders category selector", () => {
    render(
      <Provider store={store}>
        <CategorySelector />
      </Provider>
    );

    const categories = [
      "General",
      "Business",
      "Technology",
      "Sports",
      "Entertainment",
      "Health",
      "Science",
    ];

    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  test("should dispatch setCategory action when a category is clicked", () => {
    store = mockStore({
      news: { category: "technology" },
    });

    render(
      <Provider store={store}>
        <CategorySelector />
      </Provider>
    );

    const activeCategory = screen.getByText("Technology");
    expect(activeCategory).toHaveClass("active");
  });

  test("should dispatch setCategory action when a category is clicked", async () => {
    render(
      <Provider store={store}>
        <CategorySelector />
      </Provider>
    );

    const category = screen.getByText("Sports");
    await userEvent.click(category);

    expect(store.dispatch).toHaveBeenCalledWith(setCategory("sports"));
  });
});
