'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.methods.serialize = () => ({
  username: this.username,
  name: `${this.firstName} ${this.lastName}`
});

UserSchema.methods.validatePassword = password => bcrypt.compare(password, this.password);

UserSchema.statics.hashPassword = password => bcrypt.hash(password, 10);

const User = mongoose.model('User', UserSchema);
module.exports = User;
