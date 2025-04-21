import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Feed from "../../Components/Feed/Feed";
import './Home.css'

const Home = ({ sidebar, searchQuery, darkMode }) => {
  const [category, setCategory] = useState(0);

  return (
    <>
      <Sidebar setCategory={setCategory} sidebar={sidebar} category={category} darkMode={darkMode} />
      <div className={`container ${sidebar ? '' : 'large-container'}`}>
        <Feed category={category} searchQuery={searchQuery} darkMode={darkMode} />
      </div>
    </>
  );
};

export default Home;