const { mysql } = require('../qcloud')

module.exports= async (ctx,next)=> {
  const top= await mysql('booksInfo')
                    .select('id','imageurl','count' ,'title')
                      .orderBy('count','desc')
                        .limit(6)
  ctx.state.data={
    topList:top
  }
}