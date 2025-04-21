import React from 'react'
import './Sidebar.css'
import home from '../../assets/home.png'
import game_icon from '../../assets/game_icon.png'
import automobiles from '../../assets/automobiles.png'
import sports from '../../assets/sports.png'
import entertainment from '../../assets/entertainment.png'
import tech from '../../assets/tech.png'
import music from '../../assets/music.png'
import blogs from '../../assets/blogs.png'
import news from '../../assets/news.png'
import jack from '../../assets/jack.jpg'
import simon from '../../assets/simon.png'
import tom from '../../assets/tom.png'
import megan from '../../assets/megan.png'
import cameron from '../../assets/cameron.png'
import { Link } from 'react-router-dom';

const Sidebar = ({sidebar,category,setCategory}) => {
  return (
    <div className={`sidebar ${sidebar?"":"small-sidebar"}`}>
      <div className="shortcut-links">
            <div onClick={()=>{setCategory(0)}} className={`side-link ${category===0?"active":""}`}><img src={home} alt="" /><p>Home</p></div>
            <div onClick={()=>{setCategory(20)}} className={`side-link ${category===20?"active":""}`}><img src={game_icon} alt="" /><p>Gaming</p></div>
            <div onClick={()=>{setCategory(2)}} className={`side-link ${category===2?"active":""}`}><img src={automobiles} alt="" /><p>Automobiles</p></div>
            <div onClick={()=>{setCategory(17)}} className={`side-link ${category===17?"active":""}`}><img src={sports} alt="" /><p>Sports</p></div>
            <div onClick={()=>{setCategory(24)}} className={`side-link ${category===24?"active":""}`}><img src={entertainment} alt="" /><p>Entertainment</p></div>
            <div onClick={()=>{setCategory(28)}} className={`side-link ${category===28?"active":""}`}><img src={tech} alt="" /><p>Technology</p></div>
            <div onClick={()=>{setCategory(10)}} className={`side-link ${category===10?"active":""}`}><img src={music} alt="" /><p>Music</p></div>
            <div onClick={()=>{setCategory(22)}} className={`side-link ${category===22?"active":""}`}><img src={blogs} alt="" /><p>Vlogs</p></div>
            <div onClick={()=>{setCategory(25)}} className={`side-link ${category===25?"active":""}`}><img src={news} alt="" /><p>News</p></div>
            <hr/>
        </div>
        <div className="subscribed-list">
            <h3>Subscriptions</h3>
            <Link to="/subscriptions/T-Series" className="side-link">
          <img src={jack} alt="T-Series" />
          <p>T-Series</p>
        </Link>
        <Link to="/subscriptions/MrBeast" className="side-link">
          <img src={simon} alt="MrBeast" />
          <p>MrBeast</p>
        </Link>
        <Link to="/subscriptions/5-MinuteCrafts" className="side-link">
          <img src={megan} alt="5-Minute Crafts" />
          <p>5-Minute Crafts</p>
        </Link>
        </div>
    </div>
  )
}

export default Sidebar
