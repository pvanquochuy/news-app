import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { addToFavorites, fetchNews } from "../features/newsSlice";
import "../styles/newsList.css";

const NewsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, status } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (status === "loading") return <div>Đang tải dữ liệu...</div>;
  if (status === "failed") return <div>Lỗi khi tải dữ liệu!</div>;

  return (
    <div className="news-list">
      {articles.map((articles) => (
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
      ))}
    </div>
  );
};

export default NewsList;
