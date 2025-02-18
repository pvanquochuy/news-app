import { store } from "../../store/store";

test("Redux store should be configured correctly", () => {
  const state = store.getState();
  expect(state.news).toBeDefined();
});
