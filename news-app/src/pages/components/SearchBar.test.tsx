import { Provider } from "react-redux";
import { store } from "../../store/store";
import SearchBar from "../../components/SearchBar";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("SearchBar", () => {
  test("should update query when typing", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/tìm kiếm tin tức/i);
    fireEvent.change(input, { target: { value: "React" } });

    expect(store.getState().news.searchQuery).toBe("React");
  });
});
