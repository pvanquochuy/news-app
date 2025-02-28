import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import SearchBar from "../../components/SearchBar";
import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import newsReducer from "../../features/newsSlice";

const createTestStore = () => {
  return configureStore({
    reducer: { news: newsReducer },
  });
};

describe("SearchBar", () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders SearchBar component", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    expect(screen.getByText(/Từ khoá/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nhập từ khoá/i)).toBeInTheDocument();
    expect(screen.getByText(/Tìm kiếm/i)).toBeInTheDocument();
  });

  test("updates search query input", async () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Nhập từ khoá/i);
    await userEvent.type(input, "React Testing");

    expect(input).toHaveValue("React Testing");
    // expect(store.getState().news.searchQuery).toBe("React Testing");
  });

  test("updates category select", async () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const select = screen.getByLabelText(/Danh mục/i);
    await userEvent.selectOptions(select, "technology");

    expect(select).toHaveValue("technology");
  });

  test("updates start date input", async () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const startDateInput = screen.getByLabelText(/Từ ngày/i);
    await userEvent.type(startDateInput, "2024-07-01");

    expect(startDateInput).toHaveValue("2024-07-01");
  });

  test("updates end date input", async () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const endDateInput = screen.getByLabelText(/Đến ngày/i);
    await userEvent.type(endDateInput, "2024-07-10");

    expect(endDateInput).toHaveValue("2024-07-10");
  });

  test("updates author input", async () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const authorInput = screen.getByPlaceholderText(/VD: BBC, CNN/i);
    await userEvent.type(authorInput, "BBC");

    expect(authorInput).toHaveValue("BBC");
  });

  test("dispatches actions on form submit", async () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    await userEvent.type(
      screen.getByPlaceholderText(/Nhập từ khoá/i),
      "ReactJS"
    );
    await userEvent.selectOptions(
      screen.getByLabelText(/Danh mục/i),
      "technology"
    );
    await userEvent.type(screen.getByLabelText(/Từ ngày/i), "2024-07-01");
    await userEvent.type(screen.getByLabelText(/Đến ngày/i), "2024-07-10");
    await userEvent.type(screen.getByPlaceholderText(/VD: BBC, CNN/i), "BBC");

    await userEvent.click(screen.getByText(/Tìm kiếm/i));

    expect(store.getState().news.searchQuery).toBe("ReactJS");
    expect(store.getState().news.category).toBe("technology");
    expect(store.getState().news.startDate).toBe("2024-07-01");
    expect(store.getState().news.endDate).toBe("2024-07-10");
    expect(store.getState().news.author).toBe("BBC");
  });
});
