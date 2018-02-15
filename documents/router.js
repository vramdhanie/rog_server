const express = require('express');
const router = express.Router();
const Document = require('./model');

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
router.get('/', (req, res) => {
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
 * @apiParam {String} [title] Mandatory Title of new document
 * @apiParam {String} [description] Mandatory Long description of document
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
router.post('/', (req, res) => {
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
