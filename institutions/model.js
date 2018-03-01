'use strict';

const mongoose = require('mongoose');

const institutionSchema = mongoose.Schema({
  name: {type: String, required: true},
  documents: {type: mongoose.Schema.Types.ObjectId, ref:'Document'}
});

const Institution = mongoose.model('institution', institutionSchema);
module.exports = Institution;
