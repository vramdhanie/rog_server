'use strict';

const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const expressWinston = require('express-winston');
const passport = require('passport');

const { DATABASE_URL, PORT } = require('./config');

const { router: documentRouter } = require('./documents/');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const { router: userRouter } = require('./users');

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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if(req.method === 'OPTIONS'){
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(express.static('public'));
app.use('/v1/document', documentRouter);
app.use('/v1/user/', userRouter);
app.use('/v1/auth/', authRouter);


app.use('*', (req, res) => {
  return res
      .status(404)
      .json({ message: 'Not Found'} );
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
