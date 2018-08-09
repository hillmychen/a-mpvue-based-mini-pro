const https = require('https')
const {mysql} = require('../qcloud')

module.exports = async (ctx, next) => {
    const { isbn, openId } = ctx.request.body
    let openid = openId
    // 判断isbn和openId是否存在
    if (isbn && openid) {
        // 查询数据库是否有图书信息
        const checkRes = await mysql('booksInfo')
                                .select()
                                    .where('isbn', isbn)
        if (checkRes.length) {
            ctx.state = {
                code: 1,
                data: {
                    msg: '图书信息已经存在！'
                }
            }
            return
        }

        // 使用豆瓣api
        let url = 'https://api.douban.com/v2/book/isbn/' + isbn
        // 获取图书信息
        const bookInfo = await getBooks(url)
        // console.log(bookInfo)
        
        // 获取评分
        const rate = bookInfo.rating.average
        // 获取图书相关信息
        let { title, image, alt, publisher, summary, price } = bookInfo
        
        let imageurl = image
        // 映射标题和点评人数
        const tags = bookInfo.tags.map(v => {
            return `${v.title} ${v.count}`
        }).join(',')
        
        console.log(title, image, alt, publisher, summary, price)
        // 获取作者信息
        const author = bookInfo.author.join(',')

        // 插入图书信息
        // 试错误
        try {
            // 插入图书成功
            await mysql('booksInfo')
                    .insert({isbn, openid, title, imageurl, alt, publisher, summary, price, rate, tags, author})
            ctx.state.data = {
                title,
                msg: '插入图书成功！'
            }
        } catch (e) {
            // 插入图书失败
            ctx.state = {
                code: -1,
                data: {
                    msg: '新增失败：' + e.sqlMessage
                }
            }
        }
    }
}

// 封装图书请求函数
function getBooks (url) {
    return new Promise((resolve, reject) => {

        // 请求图书信息
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                // 接受图书信息
                urlData += data
            })
            res.on('end', data => {
                // 数据接受完成
                const bookInfo = JSON.parse(urlData)
                console.log(bookInfo)
                if (bookInfo.title) {
                    resolve(bookInfo)
                    return
                }
                reject(bookInfo)
            })
        })
    })
}