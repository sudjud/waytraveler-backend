const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
  name: { type: String, require: true },
  point: { type: String, require: true },
  description: String,
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  likes: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    },
  ],
  comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Comment'
    }
  ],
  photos: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Image'
    }
  ],
  categories : [
    {
    type : mongoose.SchemaTypes.ObjectId,
    ref : 'Category'
  }
],
  areas : {
    type : mongoose.SchemaTypes.ObjectId,
    ref : 'Area'
  }
})

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;

// {
//   "photos": ["62fd268f79622de3db334fb2", "62fd268f79622de3db334fb2"]
// }
