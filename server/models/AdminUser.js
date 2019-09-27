const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    // 编辑时使密码为空
    select: false,
    // 安装 npm i bcrypt，进行密码的加密
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  },
})

module.exports = mongoose.model('AdminUser', schema)