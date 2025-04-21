import React, { useEffect, useState } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';

const Feed = ({ category, searchQuery }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    if (searchQuery) {
      url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${encodeURIComponent(searchQuery)}&type=video&key=${API_KEY}`;
    }
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(searchQuery ? result.items.map(item => ({ ...item, id: item.id.videoId })) : result.items);
    } catch (error) {
      console.error('Feed API error:', error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category, searchQuery]);

  return (
    <div className="feed">
      {data.length > 0 ? (
        data.map((item, index) => (
          <Link
            key={item.id || index}
            to={`/video/${item.snippet.categoryId || category}/${item.id}`}
            className="card"
          >
            <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>
              {value_converter(item.statistics ? item.statistics.viewCount : 0)} Views •{' '}
              {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </Link>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Feed;
