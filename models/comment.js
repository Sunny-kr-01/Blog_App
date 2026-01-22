const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'blogs',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

const COMMENTS= mongoose.model('comments', commentSchema);

module.exports = COMMENTS;
