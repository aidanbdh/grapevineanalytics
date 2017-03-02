const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const knex = require('knex')({
    client: 'pg',
    //Testing
    //connection: { database: 'grapevineanalytics' }
    //Implementation
    connection: process.env.DATABASE_URL,
    ssl: true
  });
const app = express();

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send('index.html');
  next();
});

app.post('/newAccount', (req, res) => {
  knex('profiles')
    .where({ email: req.body.email})
    .then(response => {
      if(req.body.url.indexOf('http://') !== -1) {
        req.body.url = req.body.url.slice(7);
      } else if (req.body.url.indexOf('https://') !== -1) {
        req.body.url = req.body.url.slice(8);
      }
      if(req.body.url.endsWith('/')) {
        req.body.url = req.body.url.slice(0, req.body.url.length-1);
      }
      if(response[0]) {
        knex('profiles').insert(req.body)
        res.sendStatus(201)
      } else {
        res.sendStatus(409)
      }
    })
    .catch(() => { res.sendStatus(500) })
})

app.post('/login', (req, res) => {
  knex('profiles')
    .where({ email: req.body.email })
    .returning('email')
    .then(response => {
      response[0]
        ? res.status(200).send({ profile: response[0] });
        : res.sendStatus(409);
    })
});

app.post('/find', (req, res) => {
  knex('profiles')
    .where(req.body)
    .returning('id')
    .then(response => {
      if(response[0]) {
        knex(`analytics`)
          .where({ user: response[0].id})
          .then(resp => {
            res.status(200).send({ profile: response[0], data: resp });
          })
      } else {
        res.sendStatus(409);
      };
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    });
});

app.get('/data.gif', (req, res) => {
    knex('profiles')
      .where({ url: req.get('host') })
      .select('id')
      .then(response => {
        knex(`analytics`)
          .insert({ cookie: req.ip, time: `${moment().dayOfYear()}-${moment().month() + 1}-${moment().year()}`, user: response[0].id })
          .then(() => {
            res.header('content-type', 'image/gif');
            res.send('GIF89a\u0001\u0000\u0001\u0000\u00A1\u0001\u0000\u0000\u0000\u0000\u00FF\u00FF\u00FF\u00FF\u00FF\u00FF\u00FF\u00FF\u00FF\u0021\u00F9\u0004\u0001\u000A\u0000\u0001\u0000\u002C\u0000\u0000\u0000\u0000\u0001\u0000\u0001\u0000\u0000\u0002\u0002\u004C\u0001\u0000;');
          })
          .catch(err => res.sendStatus(400));
        })
        .catch(() => res.sendStatus(401));
});

app.listen(port, () => {
  console.log('listening on ' + port);
});
