import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';
import { Link } from 'react-router-dom';
import '../../Components/Feed/Feed.css';

const Subscriptions = ({ sidebar }) => {
  const { channel } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const subscribedChannels = {
    'T-Series': 'UCq-Fj5jknLsUf-MWSy4_brA',
    'CarryMinati': 'UCj0n3gW3qQ0l1A3B7k7D7qA', 
    'MrBeast': 'UCX6OQ3DkcsbYNE6H8uQQuVA',
    '5-MinuteCrafts': 'UC295-Dw_tDNtZXFeAPAW6Aw',
    'TechnicalGuruji': 'UCzP5O4sv1kUj1q0W_7Vag0A', 
  };

  const fetchSubscriptionsData = async () => {
    setLoading(true);
    try {
      let allVideos = [];
      if (!channel || channel === 'all') {
        for (const [name, id] of Object.entries(subscribedChannels)) {
          try {
            const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${id}&maxResults=3&order=date&type=video&key=${API_KEY}`;
            const response = await fetch(url);
            const result = await response.json();
            if (result.items && result.items.length > 0) {
              const videoIds = result.items.map(item => item.id.videoId).join(',');
              const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videoIds}&key=${API_KEY}`;
              const videoResponse = await fetch(videoDetailsUrl);
              const videoData = await videoResponse.json();
              allVideos.push(...videoData.items.map(video => ({ ...video, channelName: name })));
            } else {
              console.warn(`No items found for ${name}. Skipping. Response:`, result);
            }
          } catch (channelError) {
            console.error(`Error fetching ${name} (${id}):`, channelError);
          }
        }
        allVideos.sort((a, b) => new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt));
      } else {
        const channelId = subscribedChannels[channel.replace(/ /g, '')];
        if (channelId) {
          const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&type=video&key=${API_KEY}`;
          const response = await fetch(url);
          const result = await response.json();
          if (result.items) {
            const videoIds = result.items.map(item => item.id.videoId).join(',');
            const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videoIds}&key=${API_KEY}`;
            const videoResponse = await fetch(videoDetailsUrl);
            const videoData = await videoResponse.json();
            allVideos = videoData.items.map(video => ({ ...video, channelName: channel }));
          }
        }
      }
      setData(allVideos);
    } catch (error) {
      console.error('Subscriptions API error:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionsData();
  }, [channel]);

  if (loading) {
    return <div className={`container ${sidebar ? '' : 'large-container'}`}>Loading...</div>;
  }

  return (
    <div className={`container ${sidebar ? '' : 'large-container'}`}>
      <div className="feed">
        {data.length > 0 ? (
          data.map((item) => (
            <Link
              key={item.id}
              to={`/video/${item.snippet.categoryId || '0'}/${item.id}`}
              className="card"
            >
              <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
              <h2>{item.snippet.title}</h2>
              <h3>{item.channelName || item.snippet.channelTitle}</h3>
              <p>
                {value_converter(item.statistics.viewCount)} Views •{' '}
                {moment(item.snippet.publishedAt).fromNow()}
              </p>
            </Link>
          ))
        ) : (
          <p>No videos found for {channel || 'all subscriptions'}.</p>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;