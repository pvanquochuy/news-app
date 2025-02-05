import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import NewsList from "../../components/NewsList";

const renderNewsList = () => {
  return render(
    <Provider store={store}>
      <NewsList />
    </Provider>
  );
};

describe("NewsList component", () => {
  test("renders NewsList component", () => {
    renderNewsList();

    expect(screen.getByText(/Đang tải dữ liệu/i)).toBeInTheDocument();
  });

  //   test("adds article to favorites on button click", async () => {
  //     renderNewsList();

  //     const addToFavoritesButton = await screen.findByText(/❤️ Yêu thích/i);
  //     userEvent.click(addToFavoritesButton);

  //     expect(screen.getByText(/💖 Mục yêu thích/i)).toBeInTheDocument();
  //   });
});
