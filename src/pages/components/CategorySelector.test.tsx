import { Provider } from "react-redux";
import CategorySelector from "../../components/CategorySelector";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { configureStore } from "redux-mock-store";

import { Store } from "@reduxjs/toolkit";
import { setCategory } from "../../features/newsSlice";

const mockStore = configureStore([]);

const initialState = {
  news: {
    category: "general",
  },
};

describe("CategorySelector", () => {
  let store: Store;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let dispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    store = mockStore(initialState);
    dispatchSpy = jest.spyOn(store, "dispatch");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders heading, element and value of store", () => {
    render(
      <Provider store={store}>
        <CategorySelector />
      </Provider>
    );

    expect(screen.getByText("📢 Danh mục")).toBeInTheDocument();

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    expect(selectElement).toHaveValue("general");

    expect(
      screen.getByRole("option", { name: /General/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: /Business/i })
    ).toBeInTheDocument();
  });

  test("update category when selecting an option", () => {
    render(
      <Provider store={store}>
        <CategorySelector />
      </Provider>
    );

    const selectElement = screen.getByRole("combobox");

    fireEvent.change(selectElement, { target: { value: "technology" } });

    expect(dispatchSpy).toHaveBeenCalledWith(setCategory("technology"));
  });
});
