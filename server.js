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

app.post('/account', (req, res) => {
  knex('profiles')
    .where({ email: req.body.email })
    .then(response => {
      switch(req.body.view) {
        case 'create-profile':
          knex('profiles')
            .where({ url: req.body.url })
            .then(response => {
              if(response[0]) {
                res.sendStatus(409);
                return;
              }
            })
            .catch(err => {
              res.sendStatus(500);
            })
            delete req.body.view;
            if(req.body.url.indexOf('http://') !== -1) {
              req.body.url = req.body.url.slice(7);
            } else if (req.body.url.indexOf('https://') !== -1) {
              req.body.url = req.body.url.slice(8);
            }
            if(req.body.url.endsWith('/')) {
              req.body.url.slice(0, req.body.url.length-1);
            }
            const addProfile = knex('profiles').insert(req.body);
            if(response[0]) {
              res.sendStatus(409);
            } else {
              addProfile
                .then(() => {
                  knex('profiles')
                    .where({ email: req.body.email })
                    .then(response => {
                      knex.schema.createTable(`analytics_${response[0].id}`, table => {
                        table.increments('id');
                        table.string('name');
                        })
                        .then(() => { knex(`analytics_${response[0].id}`)
                          .then(responseA => {
                            res.status(201).send({profile: response[0], analytics: responseA});
                          })
                          .catch(err => res.sendStatus(500))
                        })
                        .catch(err => { console.log(`Error creating analytics for ${req.body.email}. ${err}`) });
                    })
                    .catch(err => {
                      console.log(`Error: ${err}`);
                      res.sendStatus(500);
                    });
                  });
                };
          break;
        case 'login':
          if(response[0]) {
            knex(`analytics_${response[0].id}`)
              .where({ name: 'views'})
              .returning('id')
              .then(resp => {
                knex(`analytics_${response[0].id}_${resp[0].id}`)
                .select('*')
                  .then((resp => {
                    res.status(200).send({ profile: response[0], data: resp });
                  }))
              })
          } else {
            res.sendStatus(409);
          };
          break;
        default:
          console.log('Error new view not suppored by server server.js 64');
          break;
      }
    })
    .catch(err => {
      console.log(`Error ${err}`);
    });
});

app.post('/find', (req, res) => {
  knex('profiles')
    .where(req.body)
    .then(response => {
      if(response[0]) {
        knex(`analytics_${response[0].id}`)
          .where({ name: 'views'})
          .returning('id')
          .then(resp => {
            knex(`analytics_${response[0].id}_${resp[0].id}`)
            .select('*')
              .then((resp => {
                res.status(200).send({ profile: response[0], data: resp });
              }))
          })
      } else {
        res.sendStatus(409);
      };
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    });
});

app.post('/analytics', (req, res) => {
  knex('profiles')
    .where({ email: req.body.user })
    .returning('id')
    .then((response) => {
      knex(`analytics_${response[0].id}`)
        .insert({ name: req.body.name })
        .returning('id')
        .then((resp) => {
          knex.schema.createTable(`analytics_${response[0].id}_${resp[0]}`, table => {
            table.increments('id');
            table.string('cookie');
            table.string('time');
          })
          .then(response => res.sendStatus(201))
          .catch(err => console.log(err));
        })
    })
    .catch(() => res.sendStatus(501));
})

app.get('/data.gif', (req, res) => {
    knex('profiles')
      .where({ url: req.get('host') })
      .select('id')
      .then(response => {
        console.log(req.get('host'));
        knex(`analytics_${response[0].id}`)
          .where('name', 'views')
          .returning('id')
          .then(resp => {
            knex(`analytics_${response[0].id}_${resp[0].id}`)
              .where('cookie' , req.ip)
              .insert({ cookie: req.ip, time: `${moment().dayOfYear()}-${moment().month() + 1}-${moment().year()}` })
              .then(() => {
                res.header('content-type', 'image/gif');
                res.send('GIF89a\u0001\u0000\u0001\u0000\u00A1\u0001\u0000\u0000\u0000\u0000\u00FF\u00FF\u00FF\u00FF\u00FF\u00FF\u00FF\u00FF\u00FF\u0021\u00F9\u0004\u0001\u000A\u0000\u0001\u0000\u002C\u0000\u0000\u0000\u0000\u0001\u0000\u0001\u0000\u0000\u0002\u0002\u004C\u0001\u0000;');
              })
              .catch(err => res.sendStatus(400));
          })
          .catch(err => console.log(err));
        })
        .catch(() => res.sendStatus(401));
});

app.listen(port, () => {
  console.log('listening on ' + port);
});
