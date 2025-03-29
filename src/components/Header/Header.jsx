import { Search, Home, Bell, MessageCircle } from 'lucide-react';
import '../../styles/Header.css'; // Importa el archivo CSS
import React from 'react';


export default function Header() {
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <img src="/images/redditLogo.png" alt="LogoDeReddit" className="logo-image" />
        <span className="logo-text">reddit</span>
      </div>

      {/* Search bar */}
      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search Reddit"
          className="search-input"
        />
      </div>

      {/* Actions */}
      <div className="actions">
        <Home className="action-icon" />
        <Bell className="action-icon" />
        <MessageCircle className="action-icon" />
      </div>
    </header>
  );
}
