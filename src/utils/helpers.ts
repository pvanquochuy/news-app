// src/utils/helpers.ts

export const generateArticleId = (url: string): string => {
  return btoa(url); // Chuyển URL thành chuỗi Base64
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};
