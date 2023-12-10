const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

const items = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
}));

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
