const express = require('express');
const router = express.Router();
const Document = require('./model');
const passport = require('passport');
const { jwtStrategy } = require('../auth');

passport.use(jwtStrategy);

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
router.get('/', jwtStrategy, (req, res) => {
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
router.post('/', jwtStrategy, (req, res) => {
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


module.exports = router;
