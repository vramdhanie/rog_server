const express = require('express');
const router = express.Router();
const Document = require('./model');

/**
 * Get all documents
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
 * Create a new document
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
