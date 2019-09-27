const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }], // 做关联用mongoose.SchemaTypes.ObjectId, ref:
  body: { type: String },
})

module.exports = mongoose.model('Article', schema)