const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex')({
  client: 'pg',
  connection: {
    database: 'grapevineanalytics'
  }
});

const app = express();

var port = process.env.PORT || 3000;
console.log(port);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send('index.html');
  next();
})

app.post('/login', (req, res) => {
  knex('profiles')
    .where({ email: req.body.email })
    .then(response => {
      if(response[0]) {
        res.status(200).send(response[0]);
      } else {
        res.sendStatus(409);
      };
    });
});

app.post('/new_profile', (req, res) => {
  //Validate email
  const addProfile = knex('profiles').insert(req.body);
  knex('profiles')
    .where({ email: req.body.email })
    .returning('id')
    .then(response => {
      if(response[0]) {
        res.sendStatus(409);
      } else {
        addProfile
          .then(() => {
            res.sendStatus(201);
            res.send(response[0]);
          })
          .catch(err => {
            console.log(`Error: ${err}`);
            res.sendStatus(500);
          });
      };
    });
});

app.post('/find', (req,res) => {
  knex('profiles')
    .where(req.body)
    .then(response => {
      if(response[0]) {
        res.status(200).send(response[0]);
      };
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    });
});

app.listen(port, () => {
  console.log('listening on ' + port);
});
