import { Search, Home, Bell, MessageCircle } from 'lucide-react';
import '../../styles/Header.css';
import React, { useState } from 'react';

export default function Header({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (event) => {
    if (event.key === 'Enter' && searchValue.trim() !== '') {
      onSearch(searchValue.trim()); // Actualiza el subreddit en App.js
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/images/redditLogo.png" alt="LogoDeReddit" className="logo-image" />
        <span className="logo-text">reddit</span>
      </div>

      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Buscar subreddit"
          className="search-input"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSearch} // Detecta Enter
        />
      </div>

      <div className="actions">
        <Home className="action-icon" />
        <Bell className="action-icon" />
        <MessageCircle className="action-icon" />
      </div>
    </header>
  );
}
