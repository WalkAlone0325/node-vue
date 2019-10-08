const express = require('express')

const app = express()

// 设置全局秘钥
app.set('secret', 'sa12335sasac')

app.use(require('cors')())
app.use(express.json())

// 静态文件托管
// 线上环境时更改上传文件到admin下的admin文件夹下
app.use('/', express.static(__dirname + '/web'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)

require('./routes/web')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})