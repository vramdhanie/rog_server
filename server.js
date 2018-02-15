'use strict';

const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const expressWinston = require('express-winston');

const { DATABASE_URL, PORT } = require('./config');

const { Document } = require('./documents/model');

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


//dummy end point
app.get('/', (req, res) => {
  res.json({messsage:"It Works!"});
});

app.post('/document', (req, res) => {
  //validate input
  Document
      .create({
        title: req.body.title,
        author: 'A Author',
        publishedDate: new Date()
      })
      .then(document => {
        res.status(201).json(document);
      });
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
