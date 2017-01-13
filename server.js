const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex')({
    client: 'pg',
    //Testing
    connection: { database: 'grapevineanalytics' }
    //Implementation
    /*connection: 'postgres://xuapadzjztxhns:5a36040cc5803628188a06fc5fafee4358fed714559c00df6ef8037833ea456e@ec2-50-17-220-223.compute-1.amazonaws.com:5432/dc39hfq2kphpm9',
    ssl: true*/
  });

const app = express();

var port = process.env.PORT || 3000;

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
    .then(response => {
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
                  table.timestamps();
                })
                  .catch(err => { console.log(`Error creating analytics for ${req.body.email}. ${err}`) });
                res.status(201).send(response[0]);
              });
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
