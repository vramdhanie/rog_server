'user strict';
const express = require('express');
const router = express.Router();
const validator = require('validator');
const User = require('./models');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


/**
 * @api {post} /user/ Create a new user
 * @apiName createUsers
 * @apiGroup User
 *
 * @apiParam {String} username Unique username to identify this user
 * @apiParam {String} [firstName] First name of user
 * @apiParam {String} [lastName] Last name of user
 * @apiParam {String} email Email address of the user
 *
 *
 * @apiSuccess (201){Object} User The created user object
 * @apiSuccessExample {json} Success-response:
 *
 *      HTTP/1.1 200 OK
 *        {
 *          "_id": ObjectId
 *          "username": String,
 *          "name": String
 *        }
 * @apiError VaidationError A field is invalid or missing
 * @apiErrorExample {json} Error-Response:
 *
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *        code: 422,
 *        reason: 'ValidationError',
 *        message: 'Missing parameter',
 *        location: String
 *      }
 */

router.post('/',  jsonParser, (req, res) => {
  const requiredFields = ['username', 'firstName', 'lastName', 'email'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if(missingField){
    return res
        .status(422)
        .json({
          code: 422,
          reason: 'ValidationError',
          message: 'Missing parameter',
          location: missingField
        });
  }

  const stringFields = ['username', 'password', 'firstName', 'lastName'];
  const nonStringField = stringFields
      .find(field =>
          field in req.body
          && !validator.isAscii(req.body[field]));

  if(nonStringField){
    return res
        .status(422)
        .json({
          code: 422,
          reason: 'ValidationError',
          message: 'Incorrect field type: String expected',
          location: nonStringField
        });
  }

  const explicitlyTrimmedFields = ['username', 'password'];
  const nonTrimmedField = explicitlyTrimmedFields
      .find(field =>
          req.body[field].trim() !== req.body[field]);

  if(nonTrimmedField){
    return res
        .status(422)
        .json({
          code: 422,
          reason: 'ValidationError',
          message: 'Cannot use space in username or password',
          location: nonTrimmedField
        });
  }

  if(!validator.isLength(req.body.username, {min:1})){
    return res
        .status(422)
        .json({
          code: 422,
          reason: 'ValidationError',
          message: 'Username must contain at least one character',
          location: 'username'
        });
  }
  if(!validator.isLength(req.body.password, {min:6,max:72})){
    return res
        .status(422)
        .json({
          code: 422,
          reason: 'ValidationError',
          message: 'Password must be between 6 and 72 characters',
          location: 'password'
        });
  }

  if(!validator.isEmail(req.body.email)){
    return res
        .status(422)
        .json({
          code: 422,
          reason: 'ValidationError',
          message: 'Please provide valid email address',
          location: 'email'
        });
  }

  let { username, password, firstName = '', lastName = '', email } = req.body;
  firstName = firstName.trim();
  lastName = lastName.trim();

  return User
      .find({username})
      .count()
      .then(count => {
        if( count > 0){
          return Promise.reject({
            code: 422,
            reason: 'ValidationError',
            message: 'Username is not available',
            location: 'username'
          });
        }
        return User.hashPassword(password);
      })
      .then(hash => {
        return User
            .create({
              username,
              password: hash,
              firstName,
              lastName,
              email
            });
      })
      .then(user => {
        return res
            .status(201)
            .json(user.serialize());
      })
      .catch(err => {
        if(err.reason === 'ValidationError'){
          return res
              .status(err.code)
              .json(err);
        }
        res
            .status(500)
            .json({
              code: 500,
              message: 'Internal server error'
            });
      })

});

module.exports = router;
