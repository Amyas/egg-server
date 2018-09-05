'use strict';

module.exports = app => {
  const mongoose = app.mongoose;

  const ArticleSchema = new mongoose.Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
  }, {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  });

  return mongoose.model('Article', ArticleSchema);
};
