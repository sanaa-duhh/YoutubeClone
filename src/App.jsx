import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import Subscriptions from "./Pages/Subscriptions/Subscriptions";

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div>
      <Navbar 
        setSidebar={setSidebar} 
        setSearchQuery={setSearchQuery} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
      />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} searchQuery={searchQuery} darkMode={darkMode} />} />
        <Route path="/video/:categoryId/:videoId" element={<Video darkMode={darkMode} />} />
        <Route path="/subscriptions" element={<Subscriptions sidebar={sidebar} darkMode={darkMode} />} />
        <Route path="/subscriptions/:channel" element={<Subscriptions sidebar={sidebar} darkMode={darkMode} />} />
      </Routes>
    </div>
  );
};

export default App;