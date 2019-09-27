module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert') // 错误时返回 npm i http-assert
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    mergeParams: true
  })
  // const Category = require('../../models/Category')

  // 创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 修改资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 删除资源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  // 资源列表接口  中间件
  router.get('/', async (req, res, next) => {
    // const token = req.headers.authorization
    const token = String(req.headers.authorization || '').split(' ').pop()
    // console.log(token)
    // assert(token, 401, '请提供jwt token')
    assert(token, 401, '请先登录')
    const { id } = jwt.verify(token, app.get('secret'))
    // console.log(id)
    // assert(id, 401, '无效的jwt token')
    assert(id, 401, '请先登录')
    req.user = await AdminUser.findById(id)
    // console.log(res.user)
    assert(req.user, 401, '请先登录')
    await next()
  }, async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })
  // 资源详情数据
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // 登录校验授权中间件
  const authMiddleware = require('../../middleware/auth')

  // 资源中间件
  const resourceMiddleware = require('../../middleware/resource')

  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)


  // 上传文件, npm i multer
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 登录
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1.根据用户名找用户。引入用户模型
    // const AdminUser = require('../../models/AdminUser') 放在了上面
    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')
    // if (!user) {
    //   return res.status(422).send({
    //     message: "用户不存在"
    //   })
    // }
    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password) // 明文密码， 加密后密码
    assert(isValid, 422, '密码错误')
    // if (!isValid) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }
    // 3.返回token。 安装npm i jsonwebtoken
    // const jwt = require('jsonwebtoken') 放到了上面
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}