import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/global.css";
import NewsList from "./components/NewsList";
import FavoriteList from "./components/FavoriteList";
import SearchBar from "./components/SearchBar";
import CategorySelector from "./components/CategorySelector";
import NewsDetail from "./components/NewsDetail";

function App() {
  return (
    <Router>
      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="news-section">
                  <CategorySelector />
                  <h1>📰 Tin Tức Mới</h1>
                  <SearchBar />
                  <NewsList />
                </div>
                <div className="favorite-section">
                  <h2>💖 Mục yêu thích</h2>
                  <FavoriteList />
                </div>
              </>
            }
          />
          <Route path="/:category/:articleId/:slug" element={<NewsDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
