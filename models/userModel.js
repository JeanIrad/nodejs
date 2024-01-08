const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    // unique: true,
    required: [true, 'Username must be provided'],
  },
  photo: String,
  email: {
    type: String,
    required: [true, 'email must be provided'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please confirm your password!'],
    validate: {
      // this only works on SAVE!!! on create() or save()
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords must be the same',
    },
  },
});

userSchema.pre('save', async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  //   Hash the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  //   delete the passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model('User', userSchema);
module.exports = User;
