'use strict';

const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const expressWinston = require('express-winston');

const { DATABASE_URL, PORT } = require('./config');

const { router: documentRouter } = require('./documents/');

//configure mongoose
mongoose.Promise = global.Promise;

const app = express();

app.use(expressWinston.logger({
  transports: [
      new winston.transports.Console({
        json: true,
        colorize: true
      })
  ],
  meta: true,
  expressFormat: true,
  colorize: true
}));

app.use('/document', documentRouter);

//dummy end point
app.get('/', (req, res) => {
  res.json({messsage:"It Works!"});
});

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {

    mongoose.connect(databaseUrl, err => {
      if (err) {
        console.log('There was an error starting the database');
        return reject(err);
      }

      console.log("Connected to mongo");
      server = app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        resolve();
      }).on('error', err => {
        console.log('Express server could not start');
        mongoose.disconnect();
        return reject(err);
      });
    });
  });
}

function closeServer(){
  return mongoose
      .disconnect()
      .then(() => {
         return new Promise((resolve,  reject) => {
           server.close(err => {
              if(err){
                return reject(err);
              }
              resolve();
           })
         });
      })
}

if(require.main === module) {
  runServer()
      .then(() => console.log('Everything is fine'))
      .catch(err => console.log(err));
}

module.exports = { app, runServer, closeServer };
