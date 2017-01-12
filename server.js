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
  res.send('/public');
  next();
})

app.post('/login', (req, res) => {
  var response = res;
  knex('profiles')
    .where({ username: req.body.username, password: req.body.password})
    .then(res => {
      if(res[0]) {
        response.sendStatus(200);
      } else {
        response.sendStatus(409);
      };
    });
});

app.post('/new_profile', (req, res) => {
  //Validate email
  const response = res;
  const addProfile = knex('profiles').insert(req.body);
  knex('profiles')
    .where({ email: req.body.email })
    .returning('id')
    .then(res => {
      if(res[0]) {
        response.sendStatus(409);
      } else {
        addProfile
          .then(() => {
            response.sendStatus(201);
          })
          .catch(err => {
            console.log(`Error: ${err}`);
            response.sendStatus(500);
          });
      };
    });
});

app.listen(3000, () => {
  console.log('listening on 3000');
});
