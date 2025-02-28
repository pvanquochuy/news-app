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
  startDate: string;
  endDate: string;
  author: string;
  status: "idle" | "loading" | "failed";
}

describe("newsSlice", () => {
  const initialState: NewsState = {
    articles: [],
    favorites: [],
    searchQuery: "",
    category: "general",
    startDate: "",
    endDate: "",
    author: "",
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
        name: "Example Source",
      },
      publishedAt: "2024-02-27T12:00:00Z",
      stopPropagation: () => {},
      content: "Content of Article 1",
      author: "Author 1",
    };

    const newState = newsReducer(initialState, addToFavorites(article));
    expect(newState.favorites).toHaveLength(1);
    expect(newState.favorites[0]).toEqual(article);

    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    expect(storedFavorites).toHaveLength(1);
    expect(storedFavorites[0]).toMatchObject({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      source: { name: article.source.name },
      publishedAt: article.publishedAt,
    });
  });

  test("should not add duplicate article in addToFavorites", () => {
    const article: Article = {
      title: "Article 1",
      description: "Description of Article 1",
      url: "http://example.com/article-1",
      urlToImage: "http://example.com/image1.jpg",
      source: {
        name: "Example Source",
      },
      publishedAt: "2024-02-27T12:00:00Z",
      stopPropagation: () => {},
      content: "Content of Article 1",
      author: "Author 1",
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
        name: "Example Source",
      },
      publishedAt: "2024-02-27T12:00:00Z",
      stopPropagation: () => {},
      content: "Content of Article 1",
      author: "Author 1",
    };
    const article2: Article = {
      title: "Article 2",
      description: "Description of Article 1",
      url: "http://example.com/article-1",
      urlToImage: "http://example.com/image1.jpg",
      source: {
        name: "Example Source",
      },
      publishedAt: "2024-02-27T12:00:00Z",
      stopPropagation: () => {},
      content: "Content of Article 1",
      author: "Author 1",
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
    expect(storedFavorites[0]).toMatchObject({
      title: article2.title,
      description: article2.description,
      url: article2.url,
      urlToImage: article2.urlToImage,
    });
  });
});
