'user strict';
const express = require('express');
const router = express.Router();
const validator = require('validator');
const User = require('./models');

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

router.post('/', (req, res) => {
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
          && validator.isAscii(req.body[field]));

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

  if(validator.isLength(req.body.username, {min:1})){
    return res
        .status(422)
        .json({
          code: 422,
          reason: 'ValidationError',
          message: 'Username must contain at least one character',
          location: 'username'
        });
  }
  if(validator.isLength(req.body.password, {min:10,max:72})){

  }


});

module.exports = router;
