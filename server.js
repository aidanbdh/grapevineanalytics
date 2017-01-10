const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res, next) => {
  res.send('index.html');
  next();
})

app.post('/home', (req, res) => {
  res.sendStatus(201);
});

app.listen(3000, () => {
  console.log('listening on 3000');
});
