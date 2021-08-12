
/**
 * 登录注册相关
 */
module.exports=app=>{
    const {router,controller}=app;
    router.get('/', controller.user.index);
    router.post('/user/login', controller.user.login);
}
