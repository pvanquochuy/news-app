import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { addToFavorites, fetchNews } from "../features/newsSlice";
import "../styles/newsList.css";

const NewsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, status, searchQuery, category } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    dispatch(fetchNews(category));
  }, [dispatch]);

  if (status === "loading") return <div>Đang tải dữ liệu...</div>;
  if (status === "failed") return <div>Lỗi khi tải dữ liệu!</div>;

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="news-list">
      {filteredArticles.length === 0 ? (
        <p>Không tìm thấy tin tức nào!</p>
      ) : (
        filteredArticles.map((articles) => (
          <div key={articles.title} className="news-card">
            <img src={articles.urlToImage} alt={articles.title} />
            <h2>{articles.title}</h2>
            <p>{articles.description}</p>
            <button onClick={() => dispatch(addToFavorites(articles))}>
              ❤️ Yêu thích
            </button>
            <a href={articles.url} target="_blank" rel="noopener noreferrer">
              Đọc thêm
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default NewsList;
