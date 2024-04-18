const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
  name: String,
  desc: String,
  points: [
    {
      ref: 'Place',
      type: mongoose.SchemaTypes.ObjectId,
    },
  ], 
  likes: [
    {
      ref: 'User',
      type: mongoose.SchemaTypes.ObjectId,
    },
  ],
  comments: [
    {
      ref: 'Comment',
      type: mongoose.SchemaTypes.ObjectId,
    },
  ],
  author: {
    ref: 'User',
    type: mongoose.SchemaTypes.ObjectId,
  },
});

const Trip = mongoose.model('Trip', tripSchema);


module.exports = Trip;