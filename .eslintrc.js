module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // process.env.NODE_ENV === 'production' 可以用来判定代码运行的环境
    // 我们开发的时候是这样的   npm run serve   启动开发模式
    // 将来代码开发好了要发布部署到线上：  npm run build   构建生产环境（发布环境）运行的代码
    // process.env.NODE_ENV 有两种值
    // production    生产环境
    // development   开发环境
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    // 'no-unused-vars': 'off' // 关闭验证规则(vue中的逗号)
  }
}
