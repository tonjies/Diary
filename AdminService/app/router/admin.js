

module.exports=app=>{
    const {router,controller} = app
    const gzip = app.middleware.gzip({});
    router.post('/admin/login',controller.admin.checkLogin);
    router.post('/admin/getUserList',gzip, controller.admin.getUserList);
    router.post('/admin/deleteUser', gzip, controller.admin.deleteUser);
}
