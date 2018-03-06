const express = require('express');
const router = express.Router();
const Document = require('./model');
const passport = require('passport');
const { jwtStrategy } = require('../auth');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', { session: false });


/**
 * @api {get} /document/ Request all documents
 * @apiName getDocuments
 * @apiGroup Document
 *
 * @apiSuccess (200){Object[]} documents List of documents
 * @apiSuccessExample {json} Success-response:
 *
 *      HTTP/1.1 200 OK
 *      [
 *        {
 *          "title": String,
 *          "description: String
 *        }
 *      ]
 *
 */
router.get('/', jwtAuth, (req, res) => {
  Document
      .find()
      .then(documents => {
        res
            .status(200)
            .json(documents);
      })
      .catch(err => {
        res
            .status(500)
            .json({
              "code":"500",
              "message":"Error loading documents"
            });
      });
});


router.get('/role1', jwtAuth, (req, res) => {
  res.json({
    message: "Congratulations, you are role1"
  });
});


router.get('/role2', jwtAuth, (req, res) => {
  res.json({
    message: "Congratulations, you are role2"
  });
});


/**
 * @api {post} /document/ Create a new document
 * @apiName createDocuments
 * @apiGroup Document
 *
 * @apiParam {String} title Title of new document
 * @apiParam {String} description Long description of document
 *
 * @apiSuccess (201){Object} Document The created document
 * @apiSuccessExample {json} Success-response:
 *
 *      HTTP/1.1 200 OK
 *        {
 *          "_id": ObjectId
 *          "title": String,
 *          "description": String
 *        }
 *
 */
router.post('/',  (req, res) => {
  //validate input
  const { title, author, publishDate } = req.body;
  Document
      .create({
        title: title,
        author: author,
        publishedDate: publishDate
      })
      .then(document => {
        res
            .status(201)
            .json(document);
      })
      .catch(err => {
        res
            .status(500)
            .json(err);
      });
});


module.exports = router;
