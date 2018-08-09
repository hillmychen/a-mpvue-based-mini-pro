const Koa=require('koa')
const app=new Koa()
const KoaLogger=require('./koa-logger')

app.use(KoaLogger)

app.use(async(ctx,next)=>{
    if(ctx.request.url=="/"){
        ctx.body="首页"
    }else if(ctx.request.url=="/666"){
        ctx.body="666"
    }else{
        ctx.body="404"
    }
})

app.use(async(ctx,next)=>{
    ctx.body="一"
    await next()
    ctx.body+="二"
})

app.use(async(ctx,next)=>{
    ctx.body+="三"
    await next()
    ctx.body+="四"
})

app.use(async(ctx,next)=>{
    ctx.body+="五"
    await next()
    ctx.body+="六"
})

app.listen('8088')
