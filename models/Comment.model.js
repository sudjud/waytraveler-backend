const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
  text: String,
  photos: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Image'
    }
  ],
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;