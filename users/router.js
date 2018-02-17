'user strict';
const express = require('express');
const router = express.Router();

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



});

module.exports = router;
