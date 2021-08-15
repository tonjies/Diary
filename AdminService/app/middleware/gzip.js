
module.exports=options=>{
    return async function gzip(ctx, next) {
        let token = ctx.get('token');
        console.log(token)
        if(!token){
            ctx.returnBody(false,{}, '该接口需要传入token', 401);
            return
        }
        let user;
        try{
            user = await ctx.checkToken(token);
        }catch (e) {
            ctx.returnBody(false,e, 'Token 无效，请重新登录', 401);
        }
        if (!user) {
            ctx.returnBody(false,{}, 'Token 无效，请重新登录', 401);
            return;
        }
        ctx.request.user = user;
        await next();
    };
}
