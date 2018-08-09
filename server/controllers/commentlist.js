const { mysql } = require('../qcloud')
module.exports = async (ctx, next) => {
    const {bookid, openid} = ctx.request.query
    // 获取所有图书评论列表
    const comments = mysql('comments')
                    .select('comments.*', 'cSessionInfo.user_info')
                    .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
    console.log(comments)
    let commentsList= []
    if(openid) {
      // 如果是个人评论页面的评论
        commentsList= await comments.where('openid', openid)
    }else {
        commentsList= await comments.where('bookid', bookid)
    }

    ctx.state.data = {
      comments: commentsList.map(v => {
        let user_info = JSON.parse(v.user_info)
        return Object.assign({}, v, {
          user_info: {
            nickName: user_info.nickName,
            avatar: user_info.avatarUrl
          }
        })
      })
    }
}
