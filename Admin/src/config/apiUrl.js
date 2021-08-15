
//http://127.0.0.1:7001/admin/getUserList

let ipUrl='http://127.0.0.1:7001/admin/'
let servicePath={
    login:ipUrl+'login',//检查用户名和密码是否正确
    getUserList:ipUrl+'getUserList',
    deleteUser:ipUrl+'deleteUser'
}
export default servicePath
