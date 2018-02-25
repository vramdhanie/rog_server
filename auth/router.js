'user strict';

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const config = require('../config');
const router = express.Router();

const createAuthToken = user => jwt.sign(
    { user },
    config.JWT_SECRET,
    {
      subject: user.username,
      expiresIn: config.JWT_EXPIRY,
      algorithm: 'HS256'
    }
);

const localAuth = passport.authenticate('local', { session: false });

router.user(bodyParser.json());

/**
 * @api {post} /auth/ Login the user
 * @apiName login
 * @apiGroup Auth
 *
 * @apiParam {String} username Unique username to identify this user
 * @apiParam {String} passsword
 *
 * @apiSuccess (200){Object} Token The JWT
 * @apiSuccessExample {json} Success-response:
 *
 *      HTTP/1.1 200 OK
 *        {
 *          "token": JWT_TOKEN
 *        }
 */
router.post('/login', localAuth, (req, res) => {
  const token = createAuthToken(req.user.serialize());
  res.json({ token });
});

const jwtAuth = passport.authenticate('jwt', { session: false });

/**
 * @api {post} /refresh/ Refresh the authentication token
 * @apiName refresh
 * @apiGroup Auth
 *
 *
 * @apiSuccess (200){Object} Token The JWT
 * @apiSuccessExample {json} Success-response:
 *
 *      HTTP/1.1 200 OK
 *        {
 *          "token": JWT_TOKEN
 *        }
 */
router.post('/refresh', jwtAuth, (req, res) => {
  const token = createAuthToken(req.user);
  res.json({ token });
});

module.exports = router;
