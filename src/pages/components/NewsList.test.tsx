import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { RootState } from "../../store/store";
import { thunk } from "redux-thunk";
import { AnyAction } from "redux";
import NewsList from "../../components/NewsList";
import configureMockStore from "redux-mock-store";
import { fetchNews } from "../../features/newsSlice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockStore = configureMockStore<RootState, AnyAction>([thunk as any]);

describe("NewsList component", () => {
  test("render loading state", () => {
    const store = mockStore({
      news: {
        articles: [],
        status: "loading",
        searchQuery: "",
        category: "technology",
        favorites: [],
      },
    });

    render(
      <Provider store={store}>
        <NewsList />
      </Provider>
    );

    expect(screen.getByText(/Đang tải dữ liệu.../i)).toBeInTheDocument();
  });

  test("render error state", () => {
    const store = mockStore({
      news: {
        articles: [],
        status: "failed",
        searchQuery: "",
        category: "technology",
        favorites: [],
      },
    });

    render(
      <Provider store={store}>
        <NewsList />
      </Provider>
    );

    expect(screen.getByText(/Lỗi khi tải dữ liệu!/i)).toBeInTheDocument();
  });

  test("render articles list", () => {
    const store = mockStore({
      news: {
        articles: [
          {
            title: "Bài viết 1",
            description: "Mô tả bài viết 1",
            urlToImage: "image1.jpg",
            url: "https://example.com/article1",
            source: { name: "Example Source" },
            publishedAt: "2023-01-01T00:00:00Z",
          },
        ],
        searchQuery: "",
        category: "technology",
        status: "idle",
        favorites: [],
      },
    });

    render(
      <Provider store={store}>
        <NewsList />
      </Provider>
    );

    expect(screen.getAllByText(/Bài viết 1/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Mô tả bài viết 1/i)).toBeInTheDocument();
  });

  test("dispatches fetchNews action when component mounts", () => {
    const store = mockStore({
      news: {
        articles: [],
        status: "idle",
        searchQuery: "",
        category: "technology",
        favorites: [],
      },
    });

    render(
      <Provider store={store}>
        <NewsList />
      </Provider>
    );

    expect(fetchNews).toHaveBeenCalledWith("technology");
  });
});
