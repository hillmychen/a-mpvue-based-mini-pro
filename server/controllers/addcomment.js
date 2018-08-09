const { mysql } = require('../qcloud')

module.exports = async ctx => {
  const { bookid, comment, openId, location, phone } = ctx.request.body
  let openid= openId
  try{

    await mysql('comments').insert({ bookid, comment, openid, location, phone })
    ctx.state.data = {
      code:1,
      msg: "评论成功!"
    }
  }catch(e) {
    ctx.state = {
      code: -1,
      msg: "评论失败：" + e.sqlMessage
    }
  }
}