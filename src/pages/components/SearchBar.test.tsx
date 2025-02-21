import { Provider } from "react-redux";
import SearchBar from "../../components/SearchBar";
import { fireEvent, render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Store } from "redux";
import { setSearchQuery } from "../../features/newsSlice";

const mockStore = configureStore([]);

describe("SearchBar", () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore({
      news: {
        articles: [],
        favorites: [],
        searchQuery: "",
        category: "general",
        status: "idle",
      },
    });
    store.dispatch = jest.fn();
  });

  test("should update query when typing", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/tìm kiếm tin tức/i);
    fireEvent.change(input, { target: { value: "Sport" } });

    expect(store.dispatch).toHaveBeenCalledWith(setSearchQuery("Sport"));
  });
});
