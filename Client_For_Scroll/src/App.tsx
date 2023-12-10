import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import InfiniteScroll from './components/InfiniteScroll'

function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if there are more items
  const pageSize = 20;
  const uri = `http://localhost:5000`;

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${uri}/api/items?page=${page}&pageSize=${pageSize}`);
        const newItems = response.data;

        if (newItems.length === 0) {
          // No more items, stop fetching
          setHasMore(false);
        } else {
          setItems((prevItems) => [...prevItems, ...newItems]);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }

      setLoading(false);
    };

    if (hasMore) {
      fetchItems();
    }
  }, [page, hasMore]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    const scrollThreshold = 100;

    if (scrollTop + clientHeight >= scrollHeight - scrollThreshold && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <div style={{
      height: '100vh'
    }}>
      <InfiniteScroll loading={loading} items={items} />
    </div>
  );
}

export default App;



