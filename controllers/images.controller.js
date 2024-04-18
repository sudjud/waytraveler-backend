const path = require('path')
const Image = require('../models/Image.model');

module.exports.imageController = {
  upload: async (req, res) => {
    const image = req.files.image
    const randName = Math.round(Math.random() * 100000000000);
    const uploadPath = path.resolve('uploads', 'images', `${randName}${image.name}`);
    try {
      image.mv(uploadPath);
      let newImage = await Image.create({
        name: `${randName}${image.name}`
      })
      res.json(newImage._id);
    } catch (e) {
      res.json(e);
    }
  }
}