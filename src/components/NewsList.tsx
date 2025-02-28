import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addToFavorites } from "../features/newsSlice";
import "../styles/newsList.css";
import { useGetTopHeadlinesQuery } from "../services/newsApi";
import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import { Article } from "../types/Article";

const NewsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchQuery, category, startDate, endDate, author } = useSelector(
    (state: RootState) => state.news
  );

  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    setPage(1);
  }, [category]);

  const { data, error, isLoading } = useGetTopHeadlinesQuery(
    { category, page, pageSize },
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi khi tải dữ liệu!</div>;

  const filteredArticles =
    data?.articles.filter((article) => {
      const matchesQuery =
        !searchQuery ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesAuthor =
        !author ||
        (article.author &&
          article.author.toLowerCase().includes(author.toLowerCase()));

      const matchesDate =
        (!startDate || new Date(article.publishedAt) >= new Date(startDate)) &&
        (!endDate || new Date(article.publishedAt) <= new Date(endDate));

      return matchesQuery && matchesAuthor && matchesDate;
    }) || [];

  const totalPages = data ? Math.ceil(data.totalResults / pageSize) : 1;

  return (
    <div>
      {filteredArticles.length === 0 ? (
        <div className="no-results">Không tìm thấy tin tức nào!</div>
      ) : (
        <div className="news-list">
          {filteredArticles.map((article, index) => (
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
