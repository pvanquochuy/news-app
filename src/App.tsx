import { Provider } from "react-redux";
import "./styles/global.css";
import { store } from "./store/store";
import NewsList from "./components/NewsList";
import FavoriteList from "./components/FavoriteList";
import SearchBar from "./components/SearchBar";
import CategorySelector from "./components/CategorySelector";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <div className="main-content">
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
      </div>
    </Provider>
  );
}

export default App;
