import { Provider } from "react-redux";
import CategorySelector from "../../components/CategorySelector";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fetchNews, setCategory } from "../../features/newsSlice";
import configureStore from "redux-mock-store";
import { Store } from "redux";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

const initialState = {
  news: {
    articles: [],
    favorites: [],
    searchQuery: "",
    category: "general",
    status: "idle",
  },
};

const mockStore = configureStore([]);
let storeInstance: Store;

beforeEach(() => {
  storeInstance = mockStore(initialState);
  storeInstance.dispatch = jest.fn();
});

const renderCategorySelector = () => {
  return render(
    <Provider store={storeInstance}>
      <CategorySelector />
    </Provider>
  );
};

describe("CategorySelector", () => {
  test("renders category dropdown", () => {
    renderCategorySelector();

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("display category options", () => {
    renderCategorySelector();
    const categories = [
      "general",
      "business",
      "technology",
      "sports",
      "entertainment",
      "health",
      "science",
    ];

    categories.forEach((category) => {
      expect(
        screen.getByRole("option", {
          name: category.charAt(0).toUpperCase() + category.slice(1),
        })
      ).toBeInTheDocument();
    });
  });

  test("update category when selecting an option", () => {
    const mockDispatch = jest.fn();
    jest.mock("react-redux", () => ({
      ...jest.requireActual("react-redux"),
      useDispatch: () => mockDispatch,
    }));
    renderCategorySelector();

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "sports" } });

    expect(mockDispatch).toHaveBeenCalledWith(setCategory("sports"));
    expect(mockDispatch).toHaveBeenCalledWith(fetchNews("sports"));
  });
});
