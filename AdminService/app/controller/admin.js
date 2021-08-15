

const Controller = require('egg').Controller

class AdminController extends Controller{
    /**
     * 登录
     * 判断用户名是否正确
     */
    async checkLogin(){
        const {ctx,app}=this
        let userName=this.ctx.request.body.username
        let password=this.ctx.request.body.password
        const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
            "' AND password = '" + password + "'"
        const res = await this.app.mysql.query(sql)
        if (res.length > 0) {
            let openId = new Date().getTime()
            this.ctx.session.openId = {'openId': openId}
            this.ctx.body = {'data': '登录成功', 'openId': openId}
            ctx.returnBody(
                true, {'openId':openId}, "登录成功");
        } else {
            ctx.returnBody(true, {userName:'userName'}, "登录失败", 9999);
        }
    }

    /**
     *  获取用户列表
     */
    async getUserList(){
        const {ctx,app}=this
        console.log("getUserList")
        const sql="select username,registerdate,id from diary.user"
        const res=await this.app.mysql.query(sql)
        //根据注册时间，检测昨日新增用户数，近一个月新增用户数，总用户数
        ctx.returnBody(true,res,"success")
    }

    /**
     * 删除特定用户
     */
    async deleteUser(){
        const {ctx, app} = this
        try {
            const data = this.ctx.request.body
            const userId = data.id
            console.log(userId)
            const sql = "delete from user where id=" + userId
            const res = await this.app.mysql.query(sql)
            ctx.returnBody(true, {}, "success", 200);
        } catch (e) {
            ctx.returnBody(false, {}, "fail", 9999);
        }
    }

}
module.exports = AdminController;
