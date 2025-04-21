import React, { useEffect, useState, useRef } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';

const Feed = ({ category, searchQuery }) => {
  const [data, setData] = useState([]);
  const [pageToken, setPageToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const fetchTimeoutRef = useRef(null);

  const fetchData = async (token = '') => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    let url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=5&key=${API_KEY}`;
    if (searchQuery) {
      url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(searchQuery)}&type=video&key=${API_KEY}`;
    } else if (category && category !== '0') {
      url += `&videoCategoryId=${category}®ionCode=US`;
    }
    if (token) {
      url += `&pageToken=${token}`;
    }

    console.log('Request URL:', url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }
      const result = await response.json();
      console.log('API Response:', result);
      const newData = result.items || [];
      if (searchQuery) {
        setData(prevData => [
          ...prevData,
          ...newData.map(item => ({ ...item, id: item.id.videoId })),
        ]);
      } else {
        setData(prevData => [...prevData, ...newData]);
      }
      setPageToken(result.nextPageToken || '');
      setHasMore(!!result.nextPageToken);
    } catch (error) {
      console.error('Feed API error:', error.message, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !isLoading) {
      // Debounce the fetch to prevent multiple rapid calls
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
      fetchTimeoutRef.current = setTimeout(() => {
        fetchData(pageToken);
      }, 500); // 500ms delay
    }
  };

  useEffect(() => {
    setData([]);
    setPageToken('');
    setHasMore(true);
    fetchData();
    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, [category, searchQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '100px',
      threshold: 1.0,
    });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, isLoading]);

  return (
    <div className="feed">
      {data.length > 0 ? (
        <>
          {data.map((item, index) => (
            <Link
              key={`${item.id}-${index}`} // Unique key using videoId + index
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
          ))}
          {hasMore && (
            <div ref={observerRef} style={{ height: '20px' }}>
              {isLoading && <p>Loading more videos...</p>}
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Feed;