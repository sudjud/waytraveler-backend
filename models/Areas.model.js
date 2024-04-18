const mongoose = require('mongoose')
const areaSchema = mongoose.Schema({
    name : String,
    description : String
})

const Area = mongoose.model('Area', areaSchema)


module.exports = Area 