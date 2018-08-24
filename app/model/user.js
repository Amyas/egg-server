'use strict';

module.exports = app => {
  const mongoose = app.mongoose;

  const UserSchema = new mongoose.Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
  });

  return mongoose.model('User', UserSchema);
};
