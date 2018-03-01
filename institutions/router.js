'use strict';
const express = require('express');
const router = express.router();
const Institution = require('./model');

/**
 * @api {get} /institution/ Request all institutions
 * @apiName getInstitutions
 * @apiGroup Institution
 *
 * @apiSuccess (200){Object[]} institutions List of institutions
 * @apiSuccessExample {json} Success-response:
 *
 *      HTTP/1.1 200 OK
 *      [
 *        {
 *          "name": String,
 *          "documents: [Document]
 *        }
 *      ]
 *
 */
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
