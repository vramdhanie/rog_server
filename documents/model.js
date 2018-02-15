'use strict';

const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  publishedDate: {type: Date, required: true}
});

const Document = mongoose.model('document', documentSchema);
module.exports = Document ;
