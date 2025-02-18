import { Middleware } from "@reduxjs/toolkit";

export const loggerMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    console.log("📝 Dispatching action:", action);

    const result = next(action);

    console.log("📌 Next state:", storeAPI.getState());
    return result;
  };
