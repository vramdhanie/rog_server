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

class _User {
  serialize(){
    return {
      username: this.username,
      name: `${this.firstName} ${this.lastName}`
    }
  }

  validatePassword(password){
    return bcrypt.compare(password, this.password);
  }

  static hashPassword(password){
    return bcrypt.hash(password, 10);
  }
}

UserSchema.loadClass(_User);

const User = mongoose.model('User', UserSchema);
module.exports = User;
