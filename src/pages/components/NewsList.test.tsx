import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import NewsList from "../../components/NewsList";
import { configureStore } from "redux-mock-store";
import { Store } from "@reduxjs/toolkit";
import { useGetTopHeadlinesQuery } from "../../services/newsApi";
import { addToFavorites } from "../../features/newsSlice";

jest.mock("../../services/newsApi", () => ({
  useGetTopHeadlinesQuery: jest.fn(),
}));

const mockStore = configureStore([]);
const inititalState = {
  news: {
    searchQuery: "",
    category: "general",
  },
};

const sampleArticle = {
  title: "Test Article",
  description: "This is a test article description",
  url: "http://example.com/test-article",
  urlToImage: "http://example.com/test-image.jpg",
  source: { id: null, name: "Test Source" },
  publishedAt: "2023-01-01T00:00:00Z",
};

describe("NewsList component", () => {
  let store: Store;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let dispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    store = mockStore(inititalState);
    dispatchSpy = jest.spyOn(store, "dispatch");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    (useGetTopHeadlinesQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      error: undefined,
      data: undefined,
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
        <NewsList />
      </Provider>
    );

    expect(screen.getByText("Không tìm thấy tin tức nào!")).toBeInTheDocument();
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
        <NewsList />
      </Provider>
    );

    expect(screen.getByText("Không tìm thấy tin tức nào!")).toBeInTheDocument();
  });

  test("renders articles and handle to favorites", () => {
    (useGetTopHeadlinesQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: undefined,
      data: {
        totalResults: 1,
        articles: [sampleArticle],
      },
    });
    render(
      <Provider store={store}>
        <NewsList />
      </Provider>
    );

    expect(screen.getByText(sampleArticle.title)).toBeInTheDocument();
    expect(screen.getByText(sampleArticle.description)).toBeInTheDocument();

    const favButton = screen.getByText(/❤️ Yêu thích/i);
    fireEvent.click(favButton);

    expect(dispatchSpy).toHaveBeenCalledWith(addToFavorites(sampleArticle));
  });

  test("pagination work", () => {
    (useGetTopHeadlinesQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: undefined,
      data: {
        totalResults: 16,
        articles: [sampleArticle, sampleArticle],
      },
    });

    render(
      <Provider store={store}>
        <NewsList />
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
