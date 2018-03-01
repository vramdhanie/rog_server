'use strict';
const express = require('express');
const router = express.router();
const Institution = require('./model');

router.get('/', (req, res) => {
  Institution
      .find()
      .populate('documents')
      .exec()
      .then(institution => {
        res
            .status(200)
            .json(institution);
      })
      .catch(err => {
        res
            .status(500)
            .json({
              message: err.message
            });
      });
});
module.exports = router;
