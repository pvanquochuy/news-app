import { MemoryRouter, Route, Routes } from "react-router-dom";
import NewsDetail from "../../components/NewsDetail";
import { screen, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useGetTopHeadlinesQuery } from "../../services/newsApi";
import userEvent from "@testing-library/user-event";

jest.mock("../../services/newsApi", () => ({
  useGetTopHeadlinesQuery: jest.fn(),
}));

const mockArticle = {
  title: "Tin tức nóng hổi",
  description: "Mô tả ngắn về bài báo",
  content: "Nội dung đầy đủ của bài báo",
  publishedAt: "2024-07-27T12:00:00Z",
  source: { name: "Báo điện tử" },
  url: "https://news.com/article",
  urlToImage: "https://news.com/image.jpg",
};

describe("NewsDetail component", () => {
  beforeEach(() => {
    (useGetTopHeadlinesQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });
  });
  test("display spinner when loading", () => {
    render(
      <MemoryRouter initialEntries={[{ state: { article: mockArticle } }]}>
        <NewsDetail />
      </MemoryRouter>
    );

    expect(screen.getByText("Đang tải bài viết...")).toBeInTheDocument();
  });
  test("display message when no articles", () => {
    render(
      <MemoryRouter initialEntries={[{ state: {} }]}>
        <NewsDetail />
      </MemoryRouter>
    );

    expect(screen.getByText("Không có dữ liệu bài báo")).toBeInTheDocument();
  });
  test("display title and content article", async () => {
    render(
      <MemoryRouter initialEntries={[{ state: { article: mockArticle } }]}>
        <NewsDetail />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
      expect(screen.getByText(mockArticle.description)).toBeInTheDocument();
      expect(screen.getByText(mockArticle.content)).toBeInTheDocument();
    });
  });

  test("Displays a related list articles", async () => {
    (useGetTopHeadlinesQuery as jest.Mock).mockReturnValue({
      data: {
        articles: [
          { ...mockArticle, title: "Bài báo 1" },
          { ...mockArticle, title: "Bài báo 2" },
          { ...mockArticle, title: "Bài báo 3" },
        ],
      },
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={[{ state: { article: mockArticle } }]}>
        <NewsDetail />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("📰 Tin liên quan")).toBeInTheDocument();
      expect(screen.getByText("Bài báo 1")).toBeInTheDocument();
      expect(screen.getByText("Bài báo 2")).toBeInTheDocument();
      expect(screen.getByText("Bài báo 3")).toBeInTheDocument();
    });
  });

  test("Nhấn nút Quay lại sẽ chuyển hướng về trang chủ", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={[{ state: { article: mockArticle } }]}>
        <Routes>
          <Route path="/" element={<div>Trang chủ</div>} />
          <Route path="/news-detail" element={<NewsDetail />} />
        </Routes>
      </MemoryRouter>
    );

    const backButton = screen.getByText("Quay lại");
    userEvent.click(backButton);

    await waitFor(() => {
      expect(container).toHaveTextContent("Trang chủ");
    });

    it("Nhấn nút Xem Thêm sẽ mở link bài báo", () => {
      render(
        <MemoryRouter initialEntries={[{ state: { article: mockArticle } }]}>
          <NewsDetail />
        </MemoryRouter>
      );

      const viewMoreButton = screen.getByText("Xem Thêm");
      expect(viewMoreButton).toHaveAttribute("href", mockArticle.url);
    });
  });

  test("Nhấn nút Xem Thêm sẽ mở link bài báo", async () => {
    (useGetTopHeadlinesQuery as jest.Mock).mockReturnValue({
      data: { articles: [mockArticle] },
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={[{ state: { article: mockArticle } }]}>
        <NewsDetail />
      </MemoryRouter>
    );

    await waitFor(() => {
      const viewMoreButton = screen.getByText("Xem Thêm");
      expect(viewMoreButton).toHaveAttribute("href", mockArticle.url);
    });
  });
});
