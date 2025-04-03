import { Search, Home, Bell, MessageCircle, X } from 'lucide-react'; 
import '../../styles/Header.css';
import React, { useState } from 'react';

export default function Header({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (event) => {
    if (event.key === 'Enter' && searchValue.trim() !== '') {
      onSearch(searchValue.trim());
    }
  };

  const clearSearch = () => {
    setSearchValue('');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/images/Logo/redditLogo.png" alt="LogoDeReddit" className="logo-image" />
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
          onKeyDown={handleSearch}
        />
        {searchValue && (
          <X className="clear-icon" onClick={clearSearch} />
        )}
      </div>

      <div className="actions">
  <span className="action-icon" onClick={() => onSearch("EarthPorn")}>
    <Home />
  </span>
  <span className="action-icon" onClick={() => onSearch("Popular")}>
    <Bell />
  </span>
  <span className="action-icon" onClick={() => onSearch("Discusions")}>
    <MessageCircle />
  </span>
</div>
    </header>
  );
}
