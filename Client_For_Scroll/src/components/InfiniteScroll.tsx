import React from 'react'

const InfiniteScroll = ({items, loading}) => {
    // Inside InfiniteScroll component
console.log('Loading:', loading);
console.log('Items:', items);

  return (
    <div><h1>Infinite Scroll Demo</h1>
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
    {loading && <p>Loading...</p>}
    </div>
  )
}

export default InfiniteScroll