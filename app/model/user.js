'use strict';

module.exports = app => {
  const mongoose = app.mongoose;

  const UserSchema = new mongoose.Schema({
    nickName: { type: String, require: true },
    username: { type: String, require: true, index: true, unique: true },
    password: { type: String, require: true },
  }, {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  });


  return mongoose.model('User', UserSchema);
};
