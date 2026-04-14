const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const items = [
  { id: 1, name: 'Item 1', price: 100 },
  { id: 2, name: 'Item 2', price: 200 },
];
let nextId = 3;

app.get('/', (req, res) => res.json({ service: 'the', version: '1.0.0', author: 'Mia' }));
app.get('/items', (req, res) => res.json({ data: items }));
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === +req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'Not found' });
});
app.post('/items', (req, res) => {
  const item = { id: nextId++, ...req.body };
  items.push(item);
  res.status(201).json(item);
});

app.listen(PORT, () => console.log(`${PORT}`));
