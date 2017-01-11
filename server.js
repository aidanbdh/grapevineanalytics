const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex')({
  client: 'pg',
  connection: {
    database: 'grapevineanalytics'
  }
});

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send('index.html');
  next();
})

app.post('/new_profile', (req, res) => {
  const addProfile = knex('profiles').insert(req.body);
  addProfile
    .catch(err => console.log(`Error: ${err}`));
  res.sendStatus(201);
});

app.listen(3000, () => {
  console.log('listening on 3000');
});
