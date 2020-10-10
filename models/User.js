const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const validator = require('validator');

// user schema
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: [true, 'Email is not empty.'],
    lowercase: true,
    unique: [true, 'Email is exist.'],
    validate: [validator.isEmail, 'Please fill a valid email address.'],
  },
  password: {
    type: String,
    required: [true, 'Password is not empty.'],
    minlength: [6, 'Min length password is 6 characters.'],
  }
});

// use hooks previous save
userSchema.pre('save', async function(next) {
  try {
    const salt = await bcryptjs.genSalt();
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// create model
const User = mongoose.model('user', userSchema);

module.exports = User;