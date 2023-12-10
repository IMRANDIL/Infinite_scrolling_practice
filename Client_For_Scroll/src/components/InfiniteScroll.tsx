import React from 'react';

const InfiniteScroll = ({ items, loading }) => {
  return (
    <div className='infinite-scroll-container'>
      <h1>Infinite PixiMania</h1>
      <ul className='item-grid'>
        {items.map((item) => (
          <li key={item.id} className='grid-item'>
            <div className='image-container'>
              <img src={item.imageUrl} alt={`Item ${item.id}`} draggable={false}/>
            </div>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScroll;
