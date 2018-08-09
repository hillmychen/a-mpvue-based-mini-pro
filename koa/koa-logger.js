module.exports=async(ctx,next)=>{
    const start=new Date().getTime()
    await next() 
    const end=new Date().getTime()

    console.log(ctx.request.url,ctx.body.length)
}