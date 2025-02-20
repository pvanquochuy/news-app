import newsReducer, {
  addToFavorites,
  removeFromFavorites,
  setSearchQuery,
} from "../../features/newsSlice";
import { Article } from "../../types/Article";

interface NewsState {
  articles: Article[];
  favorites: Article[];
  searchQuery: string;
  category: string;
  status: "idle" | "loading" | "failed";
}

describe("newsSclce", () => {
  const initialState: NewsState = {
    articles: [],
    favorites: [],
    searchQuery: "",
    category: "general",
    status: "idle",
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test("should return the initial state", () => {
    expect(newsReducer(undefined, { type: "" })).toEqual(initialState);
  });

  test("should handle setCategory", () => {
    const newState = newsReducer(initialState, setSearchQuery("sports"));
    expect(newState.searchQuery).toBe("sports");
  });

  test("should handle addToFavorites when article does not exist", () => {
    const article: Article = {
      title: "Article 1",
      description: "Description of Article 1",
      url: "http://example.com/article-1",
      urlToImage: "http://example.com/image1.jpg",
      source: {
        name: "",
      },
      publishedAt: "",
    };

    const newState = newsReducer(initialState, addToFavorites(article));
    expect(newState.favorites).toHaveLength(1);
    expect(newState.favorites[0]).toEqual(article);

    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    expect(storedFavorites).toHaveLength(1);
    expect(storedFavorites[0]).toEqual(article);
  });

  test("should not add duplicate article in addToFavorites", () => {
    const article: Article = {
      title: "Article 1",
      description: "Description of Article 1",
      url: "http://example.com/article-1",
      urlToImage: "http://example.com/image1.jpg",
      source: {
        name: "",
      },
      publishedAt: "",
    };

    let state = newsReducer(initialState, addToFavorites(article));
    state = newsReducer(state, addToFavorites(article));

    expect(state.favorites).toHaveLength(1);
  });

  test("should remove an article from favorites", () => {
    const article1: Article = {
      title: "Article 1",
      description: "Description of Article 1",
      url: "http://example.com/article-1",
      urlToImage: "http://example.com/image1.jpg",
      source: {
        name: "",
      },
      publishedAt: "",
    };
    const article2: Article = {
      title: "Article 2",
      description: "Description of Article 2",
      url: "http://example.com/article-2",
      urlToImage: "http://example.com/image2.jpg",
      source: {
        name: "",
      },
      publishedAt: "",
    };

    let state = newsReducer(initialState, addToFavorites(article1));
    state = newsReducer(state, addToFavorites(article2));
    expect(state.favorites).toHaveLength(2);

    state = newsReducer(state, removeFromFavorites(article1.title));
    expect(state.favorites).toHaveLength(1);
    expect(state.favorites[0]).toEqual(article2);

    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    expect(storedFavorites).toHaveLength(1);
    expect(storedFavorites[0]).toEqual(article2);
  });
});
