

module.exports=app=>{
    const {router,controller} = app
    router.post('/admin/login',controller.admin.checkLogin);
    router.post('/admin/getUserList', controller.admin.getUserList);
    router.post('/admin/deleteUser', controller.admin.deleteUser);
}
