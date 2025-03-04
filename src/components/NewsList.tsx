import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addToFavorites, fetchArticles } from "../features/newsSlice";
import "../styles/newsList.css";
import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import { Article } from "../types/Article";

const NewsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, status, filters } = useSelector(
    (state: RootState) => state.news
  );

  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch, filters.category]);

  useEffect(() => {
    setPage(1);
  }, [filters.category]);

  // const { data, error, isLoading } = useGetTopHeadlinesQuery(
  //   { category, page, pageSize },
  //   { refetchOnMountOrArgChange: true }
  // );

  if (status === "loading") return <div>Đang tải dữ liệu...</div>;
  if (status === "failed") return <div>Lỗi khi tải dữ liệu!</div>;

  const filteredArticles = articles.filter((article) => {
    const matchesQuery =
      !filters.searchQuery ||
      article.title.toLowerCase().includes(filters.searchQuery.toLowerCase());

    const matchesAuthor =
      !filters.author ||
      (article.author &&
        article.author.toLowerCase().includes(filters.author.toLowerCase()));

    const matchesDate =
      (!filters.startDate ||
        new Date(article.publishedAt) >= new Date(filters.startDate)) &&
      (!filters.endDate ||
        new Date(article.publishedAt) <= new Date(filters.endDate));

    return matchesQuery && matchesAuthor && matchesDate;
  });

  const totalPages = Math.ceil(filteredArticles.length / pageSize);
  const paginatedArticles = filteredArticles.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div>
      {filteredArticles.length === 0 ? (
        <div className="no-results">Không tìm thấy tin tức nào!</div>
      ) : (
        <div className="news-list">
          {paginatedArticles.map((article, index) => (
            <NewsItem
              key={index}
              article={article}
              onAddFavorite={(article: Article) =>
                dispatch(addToFavorites(article))
              }
            />
          ))}
        </div>
      )}

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsList;
