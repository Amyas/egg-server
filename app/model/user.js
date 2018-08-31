'use strict';

module.exports = app => {
  const mongoose = app.mongoose;

  const UserSchema = new mongoose.Schema({
    nickName: { type: String, require: true },
    username: { type: String, require: true, index: true, unique: true },
    password: { type: String, require: true },
    createTime: { type: Number, default: Date.now },
    updateTime: { type: Number, default: Date.now },
  });

  const updateHook = function() {
    // if overwrite option is false. If overwrite is true, sent without the $set wrapper.
    // 参考https://github.com/Automattic/mongoose/issues/2144
    if (this.options.overwrite) {
      this._update.updateTime = Date.now();
    } else {
      this._update.$set = this._update.$set || {};
      this._update.$set.updateTime = Date.now();
    }
  };

  UserSchema.pre('findOneAndUpdate', updateHook);
  UserSchema.pre('update', updateHook);


  return mongoose.model('User', UserSchema);
};
