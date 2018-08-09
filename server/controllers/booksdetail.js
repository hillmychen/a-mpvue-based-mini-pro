const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
  const {id} = ctx.request.query

  // 通过id查询图书信息
  const booksInfo = await mysql('booksInfo')
                            .select('booksInfo.*', 'cSessionInfo.user_info')
                            .join('cSessionInfo', 'booksInfo.openid', 'cSessionInfo.open_id')
                            .where('id', id)
                            .first()

  const userinfo = JSON.parse(booksInfo.user_info)
  ctx.state.data = Object.assign({}, booksInfo, {
    tags: booksInfo.tags.split(','),
    summary:booksInfo.summary.split('\n'),
    user_info: {
      nickName: userinfo.nickName,
      avatarUrl:  userinfo.avatarUrl
    }
  })

  await mysql('booksInfo')
          .where('id', id)
            .increment('count', 1)
}
