'use strict';
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

});

const User = mongoose.model('User', UserSchema);
module.exports = User;
