const express = require('express');
const app = express();
const hostname = 'localhost';
const port = 3000;

const DB = {
  users: [],
  books: [],
};

app.use(express.json());

app.get('/', (req, res) => {
  res.send('first page of website');
});

app.get('/api/users', (req, res) => {
  res.json(DB['users']);
});

app.post('/api/users', (req, res) => {
  const data = req.body;

  const users = addToDataBase('users', {
    id: 0,
    username: data.username,
    password: data.password,
    email: data.email,
    isAdmin: 0,
  });

  res.send(JSON.stringify({ id: users.id }));
});

app.get('/api/books', (req, res) => {
  res.json(DB['books']);
});

app.post('/api/books', (req, res) => {
  const data = req.body;

  const books = addToDataBase('books', {
    id: 0,
    name: data.name,
    price: data.price,
  });

  res.send(JSON.stringify({ id: books.id }));
});

app.listen(port, hostname, () => {
  console.log(`my website running at website http://${hostname}:${port}/`);
});

function addToDataBase(table, data) {
  const db = DB[table];
  data.id = db.length + 1;
  db.push(data);

  return data;
}
