const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    // 获取图书列表

    // 获取页数
    const { page, openid } = ctx.request.query
    // 定义加载条数
    const size = 5
    const booksList = mysql('booksInfo')
                        .select('booksInfo.*', 'cSessionInfo.user_info')
                        .join('cSessionInfo', 'booksInfo.openid', 'cSessionInfo.open_id')
                        .orderBy('booksInfo.id', 'desc')
    let books = []
    // 如果是评论页面的图书列表
    if (openid) {
        books = await booksList.where('booksInfo.openid', openid)
    } else {
    // 如果是图书详情页的图书
        books = await booksList.limit(size).offset(Number(page) * size)
    }

    ctx.state.data = {
        lists: books.map(v => {
            const userInfo = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: userInfo.nickName
                }
            })
        })
    }
}
