// 发布到线上时，将dist文件夹放在server端，想要在网页里以 http://localhost:3000/admin 访问后台管理页面，以 http://localhost:3000/web 访问前台页面、

module.exports = {
  // 输出的文件夹
  outputDir: __dirname + '/../server/web',
  // 开发环境 ‘/’，生产环境访问时 添加为 /admin/...
  // publicPath: process.env.NODE_ENV === 'production' ? '/web/' : '/'
}