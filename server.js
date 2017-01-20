const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex')({
    client: 'pg',
    //Testing
    connection: { database: 'grapevineanalytics' }
    //Implementation
    //connection: process.env.DATABASE_URL,
    //ssl: true
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
            delete req.body.view;
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
                        table.integer('num');
                        })
                        .then(() => { knex(`analytics_${response[0].id}`).insert({ name: 'views', num: 0 }).then() })
                        .catch(err => { console.log(`Error creating analytics for ${req.body.email}. ${err}`) });
                      knex(`analytics_${response[0].id}`)
                        .then(responseA => {
                          res.status(201).send({profile: response[0], analytics: responseA});
                        })
                    })
                  })
                .catch(err => {
                  console.log(`Error: ${err}`);
                  res.sendStatus(500);
                });
            };
          break;
        case 'login':
          if(response[0]) {
            knex(`analytics_${response[0].id}`)
              .then(responseA => {
                res.status(200).send({profile: response[0], analytics: responseA});
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
          .then(responseA => {
            res.status(200).send({profile: response[0], analytics: responseA});
          })
      } else {
        res.sendStatus(409);
      }
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    });
});

app.post('/analytics', (req, res) => {
  knex('profiles')
    .where(req.user)
    .returning('id')
    .then((response) => {
      knex(`analytics_${response[0].id}`)
        .insert({ name: req.name })
        .returning('id')
        .then((resp) => {
          knex.schema.createTable(`analytics_${response[0].id}.${resp[0].id}`)
        })
    })
})

app.get('/data.gif', (req, res) => {
  knex('profiles')
    .where({ url: req.get('host') })
    .select('id')
    .then(response => {
      knex(`analytics_${response[0].id}`)
        .where('name', 'views')
        .increment('num', 1)
        .then(() => {
          res.header('content-type', 'image/gif');
          res.send('GIF89a\u0001\u0000\u0001\u0000\u00A1\u0001\u0000\u0000\u0000\u0000\u00FF\u00FF\u00FF\u00FF\u00FF\u00FF\u00FF\u00FF\u00FF\u0021\u00F9\u0004\u0001\u000A\u0000\u0001\u0000\u002C\u0000\u0000\u0000\u0000\u0001\u0000\u0001\u0000\u0000\u0002\u0002\u004C\u0001\u0000;');
        })
        .catch(err => { console.log(err) })
      })
      .catch(() => res.sendStatus(401));
})

app.listen(port, () => {
  console.log('listening on ' + port);
});
