// src/components/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import CategorySelector from "./CategorySelector";
import SearchBar from "./SearchBar";
import FavoriteList from "./FavoriteList";
import "../styles/global.css";

const Layout = () => {
  return (
    <div className="main-content">
      <div className="news-section">
        <CategorySelector />
        <h1>📰 Tin Tức Mới</h1>
        <SearchBar />
        {/* Đây là nơi render nội dung chính: NewsList hoặc NewsDetail */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
