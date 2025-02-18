import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { removeFromFavorites } from "../features/newsSlice";
import "../styles/favorites.css";

const FavoriteList = () => {
  const favorites = useSelector((state: RootState) => state.news.favorites);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = (title: string) => {
    dispatch(removeFromFavorites(title));
  };

  return (
    <div className="favorites-list">
      {favorites.length === 0 ? (
        <p className="empty-message">Chưa có tin yêu thích nào!</p>
      ) : null}
      {favorites.map((article) => (
        <div key={article.title} className="favorite-item">
          <h3>{article.title}</h3>
          <button onClick={() => handleRemove(article.title)}>❌ Xóa</button>
        </div>
      ))}
    </div>
  );
};

export default FavoriteList;
