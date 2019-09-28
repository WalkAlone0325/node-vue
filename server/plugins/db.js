module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })


  // 数据库中引入全部模型 npm i require-all
  // require('require-all')(__dirname, '/../models')

  require('require-all')(__dirname + '/../models')
}