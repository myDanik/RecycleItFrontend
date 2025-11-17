import React, { useState } from "react";

export default function Header({ onSearchChange }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  function openSearch() {
    setIsSearchOpen(true);
  }

  function updateQuery(e) {
    const value = e.target.value;
    setQuery(value);
    onSearchChange(value);
  }

  function closeSearch() {
    setIsSearchOpen(false);
    setQuery("");
    onSearchChange("");
  }

  return (
    <header className="topbar">

      <div className="brand">
        <div className="logo">Recycle it ♻</div>
      </div>

      <div className="controls">
        {isSearchOpen ? (
          <div className="search-wrapper">
            <input
              autoFocus
              type="text"
              className="search-input"
              placeholder="Поиск пунктов..."
              value={query}
              onChange={updateQuery}
            />

            <button className="control-btn" onClick={closeSearch}>
              ✕
            </button>
          </div>
        ) : (
          <>
            <button className="control-btn" onClick={openSearch}>Поиск 🔍</button>
            <button className="control-btn">Список ☰</button>
            <button className="control-btn">Фильтры ⚲</button>
          </>
        )}

      </div>
    </header>
  );
}
