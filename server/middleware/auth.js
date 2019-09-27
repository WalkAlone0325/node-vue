/**
 * 中间件
 * 登录校验授权中间件
 */
module.exports = options => {
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert') // 错误时返回 npm i http-assert
  const AdminUser = require('../models/AdminUser')

  return async (req, res, next) => {
    // const token = req.headers.authorization
    const token = String(req.headers.authorization || '').split(' ').pop()
    // console.log(token)
    // assert(token, 401, '请提供jwt token')
    assert(token, 401, '请先登录')
    const { id } = jwt.verify(token, req.app.get('secret'))
    // console.log(id)
    // assert(id, 401, '无效的jwt token')
    assert(id, 401, '请先登录')
    req.user = await AdminUser.findById(id)
    // console.log(res.user)
    assert(req.user, 401, '请先登录')
    await next()
  }
}