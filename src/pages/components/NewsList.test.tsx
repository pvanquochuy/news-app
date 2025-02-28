import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import NewsList from "../../components/NewsList";
import { configureStore } from "redux-mock-store";
import { useGetTopHeadlinesQuery } from "../../services/newsApi";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureStore([]);
const inititalState = {
  news: {
    searchQuery: "",
    category: "general",
    startDate: null,
    endDate: null,
    author: "",
  },
};
const store = mockStore(inititalState);

// mock api response
jest.mock("../../services/newsApi", () => ({
  useGetTopHeadlinesQuery: jest.fn(),
}));

describe("NewsList component", () => {
  test("renders loading state", () => {
    (useGetTopHeadlinesQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(
      <Provider store={store}>
        <NewsList />
      </Provider>
    );

    expect(screen.getByText("Đang tải dữ liệu...")).toBeInTheDocument();
  });

  test("render error state", () => {
    (useGetTopHeadlinesQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: { message: "Error" },
      data: undefined,
    });

    render(
      <Provider store={store}>
        <NewsList />
      </Provider>
    );

    expect(screen.getByText(/Lỗi khi tải dữ liệu!/i)).toBeInTheDocument();
  });

  test("renders no articles found when filtered result is empty", () => {
    (useGetTopHeadlinesQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: undefined,
      data: {
        totalResult: 0,
        articles: [],
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewsList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Không tìm thấy tin tức nào!")).toBeInTheDocument();
  });

  test("render articles when loading", async () => {
    (useGetTopHeadlinesQuery as jest.Mock).mockReturnValue({
      data: {
        totalResults: 2,
        articles: [
          {
            title: "Test Article 1",
            author: "John Doe",
            publishedAt: "2024-07-20T10:00:00Z",
          },
          {
            title: "Test Article 2",
            author: "Jane Doe",
            publishedAt: "2024-07-21T12:30:00Z",
          },
        ],
      },
      error: null,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewsList />
        </BrowserRouter>
      </Provider>
    );

    expect(await screen.findByText("Test Article 1")).toBeInTheDocument();
    expect(await screen.findByText("Test Article 2")).toBeInTheDocument();
  });

  test("pagination work", () => {
    (useGetTopHeadlinesQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: undefined,
      data: {
        totalResults: 16,
        articles: [
          {
            title: "Test Article 1",
            author: "John Doe",
            publishedAt: "2024-07-20T10:00:00Z",
          },
          {
            title: "Test Article 2",
            author: "Jane Doe",
            publishedAt: "2024-07-21T12:30:00Z",
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewsList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();

    const prevButton = screen.getByText("Prev");
    fireEvent.click(prevButton);
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
  });
});
