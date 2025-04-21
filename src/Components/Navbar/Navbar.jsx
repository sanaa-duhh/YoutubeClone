import React, { useState } from 'react';
import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import logoDark from '../../assets/logo-dark.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { API_KEY } from '../../data';

const Navbar = ({ setSidebar, setSearchQuery }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const sidebar_toggle = () => {
    setSidebar((prev) => !prev);
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearch(query);
    setSearchQuery(query);

    if (query.length > 2) {
      const search_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(query)}&key=${API_KEY}`;
      try {
        const response = await fetch(search_url);
        const data = await response.json();
        setSuggestions(data.items || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Search API error:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img src={menu_icon} alt="Menu" className="menu-icon" onClick={sidebar_toggle} />
        <Link to="/">
          <img src={isDarkMode ? logoDark : logo} alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
            onFocus={() => setShowSuggestions(search.length > 2 && suggestions.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          <img src={search_icon} alt="Search" />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="search-suggestions">
              {suggestions.map((item) => (
                <li key={item.id.videoId || item.id}>
                  <Link
                    to={`/video/${item.snippet.categoryId || '0'}/${item.id.videoId || item.id}`}
                    onClick={() => {
                      setSearch(item.snippet.title);
                      setSearchQuery(item.snippet.title);
                      setShowSuggestions(false);
                    }}
                  >
                    {item.snippet.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="nav-right flex-div">
        <img src={upload_icon} alt="Upload" />
        <img src={more_icon} alt="More" />
        <img src={notification_icon} alt="Notification" />
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;