'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

    //初始入口
    async index() {
        const {ctx} = this;
        ctx.body = 'hi, egg';
    }

    /**
     * 登录并生成token，login
     * /login
     */
    async login() {
        console.log("登录")
        const {ctx, app} = this
        const data = this.ctx.request.body
        const username = data.username;
        const password = data.password;
        if(username==null||password==null){
            ctx.returnBody(false, {}, "请输入账号或密码",9999);
            return
        }
        const sql = "SELECT id FROM user WHERE username = '" + username + "' AND password = '" + password + "'"
        const res = await this.app.mysql.query(sql)
        //账号和密码都正确
        if (res.length > 0){
            const user = {username: username, password: password, userId: res[0].id};
            let token =await ctx.getToken(user);
            ctx.returnBody(true, {'token':token}, "登录成功");
        }
        else {
            await this.userOrPassError(username, ctx, password);
        }
    }

    /**
     * 用户名或者密码错误
     */
    async userOrPassError(username, ctx, password) {
        const sql = "SELECT userName FROM user WHERE username = '" + username + "'"
        const res = await this.app.mysql.query(sql)
        //密码错误
        if (res.length > 0) {
            console.log("该用户存在，密码错误")
            ctx.returnBody(false, {}, "密码错误", 9999);
        }
        //用户不存在，自动创建
        else {
            const tag = Date.parse(new Date());
            await this.app.mysql.insert('user', {username: username, password: password,registerdate:tag})
            const sql = "SELECT id FROM user WHERE username = '" + username + "' AND password = '" + password + "'"
            const res = await this.app.mysql.query(sql)
            const user = {username: username, password: password, userId: res[0].id};
            let token = await ctx.getToken(user);
            ctx.returnBody(false, {'token': token}, "登录成功");
        }
    }
}

module.exports = HomeController;
