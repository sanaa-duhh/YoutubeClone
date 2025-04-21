import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import Subscriptions from "./Pages/Subscriptions/Subscriptions";

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div>
      <Navbar setSidebar={setSidebar} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} searchQuery={searchQuery} />} />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
        <Route path="/subscriptions" element={<Subscriptions sidebar={sidebar} />} />
        <Route path="/subscriptions/:channel" element={<Subscriptions sidebar={sidebar} />} />
      </Routes>
    </div>
  );
};

export default App;
