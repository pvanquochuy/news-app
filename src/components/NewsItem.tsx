import React from "react";
import { Article } from "../types/Article";
import { useNavigate } from "react-router-dom";
import { generateArticleId, generateSlug } from "../utils/helpers";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface NewsItemProps {
  article: Article;
  onAddFavorite: (article: Article) => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ article, onAddFavorite }) => {
  const navigate = useNavigate();
  const category =
    useSelector((state: RootState) => state.news.category) || "general";

  const articleId = generateArticleId(article.url);
  const slug = generateSlug(article.title);

  const truncatedTitle =
    article.title && article.title.length > 60
      ? article.title.substring(0, 60) + "..."
      : article.title;

  const truncatedDescription =
    article.description && article.description.length > 80
      ? article.description.substring(0, 80) + "..."
      : article.description;

  return (
    <div
      className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3"
      style={{ width: "345px", height: "450px" }}
    >
      <div style={{ height: "200px", width: "100%", overflow: "hidden" }}>
        <img
          src={article.urlToImage}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://via.placeholder.com/345x200?text=No+Image";
          }}
          style={{ height: "200px", width: "100%", objectFit: "cover" }}
          className="card-img-top"
          alt={article.title}
        />
      </div>
      <div
        className="card-body d-flex flex-column justify-content-between"
        style={{ height: "250px" }}
      >
        <div>
          <h5 className="card-title">{truncatedTitle}</h5>
          <p className="card-text">{truncatedDescription}</p>
        </div>
        <div>
          <button
            onClick={() => onAddFavorite(article)}
            className="btn btn-primary"
          >
            ❤️ Yêu thích
          </button>
          <button
            className="btn btn-secondary"
            onClick={() =>
              navigate(`/${category}/${articleId}/${slug}`, {
                state: { article },
              })
            }
          >
            Chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
