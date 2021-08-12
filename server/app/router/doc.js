

module.exports=app=>{
    const {router,controller} = app
    const gzip = app.middleware.gzip({});
    router.post('/doc/getAll',gzip, controller.doc.getAll);
    router.post('/doc/readsingle',gzip, controller.doc.readsingle);
    router.post('/doc/createdoc',gzip, controller.doc.createDoc);
    router.post('/doc/update', gzip,controller.doc.updatedoc);
    router.post('/doc/delete', gzip,controller.doc.deletedoc);
}
