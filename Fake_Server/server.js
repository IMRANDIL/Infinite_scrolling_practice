const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

const items = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
}));

// Array of sample image URLs
const imageUrls = [
  'https://media.istockphoto.com/id/1463013729/photo/online-registration-form-for-modish-form-filling.jpg?s=1024x1024&w=is&k=20&c=EHI3hS1rXOMpRmM1LKEV8zxwYBFEkU-TqffuKtoBPC4=',
  'https://media.istockphoto.com/id/1276936276/photo/creative-background-online-casino-in-a-mans-hand-a-smartphone-with-playing-cards-roulette-and.jpg?s=1024x1024&w=is&k=20&c=Hd5hqc5Ey6IqZmPKvmXjfclw9E5OR5x_-AXjEvGDvWM=',
  'https://cdn.pixabay.com/photo/2013/02/01/18/14/url-77169_1280.jpg',
  'https://media.istockphoto.com/id/894954832/photo/digital-security-concept.jpg?s=1024x1024&w=is&k=20&c=9Zn013q53Tg3RzBU_frgH9NcJ82RhI0zD3Xvaff2Lvw=',
  'https://cdn.pixabay.com/photo/2020/05/31/16/53/bookmarks-5243253_1280.jpg',
  'https://cdn.pixabay.com/photo/2017/12/26/21/19/circle-3041437_1280.jpg',
  'https://cdn.pixabay.com/photo/2015/05/31/11/23/headphones-791163_1280.jpg',
  'https://cdn.pixabay.com/photo/2018/05/23/13/14/earth-3424042_1280.jpg',
  'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg',
  'https://cdn.pixabay.com/photo/2015/06/19/20/13/sunset-815270_1280.jpg',
  'https://cdn.pixabay.com/photo/2018/09/23/18/30/drop-3698073_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/11/14/04/36/boy-1822614_1280.jpg',
  'https://cdn.pixabay.com/photo/2012/09/15/02/22/forest-56930_1280.jpg',
  'https://cdn.pixabay.com/photo/2018/01/22/14/13/animal-3099035_1280.jpg',
  'https://cdn.pixabay.com/photo/2013/02/21/19/06/drink-84533_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/12/27/21/03/lone-tree-1934897_1280.jpg',
  'https://cdn.pixabay.com/photo/2018/06/09/17/25/trees-3464777_1280.jpg',
  'https://cdn.pixabay.com/photo/2013/07/19/00/18/splashing-165192_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/12/11/12/02/mountains-1899264_1280.jpg',
  'https://cdn.pixabay.com/photo/2017/11/15/13/27/river-2951997_1280.jpg',
  'https://cdn.pixabay.com/photo/2013/06/12/22/20/mountains-139012_1280.jpg'
];

// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// Shuffle the array of image URLs
shuffleArray(imageUrls);

// Function to get a random image URL, ensuring it is not the same as the previous one
let previousImageUrl;
const getRandomImageUrl = () => {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * imageUrls.length);
  } while (imageUrls[randomIndex] === previousImageUrl);

  previousImageUrl = imageUrls[randomIndex];
  return previousImageUrl;
};
// Update the items array with imageUrl
items.forEach((item) => {
  item.imageUrl = getRandomImageUrl();
});
app.use(cors())

app.get('/api/items', (req, res) => {
  const { page, pageSize } = req.query;
  const start = (page - 1) * pageSize;
  const end = start + Number(pageSize);
  const paginatedItems = items.slice(start, end);
  
  res.json(paginatedItems);
});

app.listen(port, () => {
  console.log(`Fake API server is running at http://localhost:${port}`);
});
