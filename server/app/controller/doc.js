'use strict';

const Controller = require('egg').Controller;

class DocumentController extends Controller {

    /**
     * 读取已有文档
     * 根据token拿出userId，再根据userId取出对应的内容
     * /doc/getAll
     */
    async getAll() {
        const {ctx, app} = this
        try {
            //获取用户通过post请求传递过来的参数
            let user = ctx.request.user
            console.log(user)
            //根据userid拿出所有时间的文档
            const sql = "SELECT addtime,title,tag,content,user_id,id,content FROM document WHERE user_id = " + user.userId
            const res = await this.app.mysql.query(sql)
            this.bSort(res)
            ctx.returnBody(true, res.reverse(), "success");
        } catch (e) {
            console.log(e)
            ctx.returnBody(true, {}, "获取文档失败",9999);
        }
    }

    /**
     * 根据什锦锉对文档顺序进行排序
     */
    async bSort(arr) {
        var len = arr.length;
        for (var i = 0; i < len-1; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                // 相邻元素两两对比，元素交换，大的元素交换到后面
                if (arr[j].tag > arr[j + 1].tag) {
                    var temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
        return arr;
    }

    /**
     * 根据时间戳读取单个具体文章内容
     * /doc/readsingle
     */
    async readsingle() {

        try {
            const {ctx, app} = this
            const data = this.ctx.request.body
            let user = ctx.request.user
            //获取用户通过post请求传递过来的参数
            const tag = data.tag;
            if (tag === undefined) {
                ctx.returnBody(false, {}, "必须要传入tag参数", 9999);
                return
            }
            const sql = "select user_id,addtime,title,tag,content,user_id,id from document doc where user_id=" + user.userId + " and tag=" + tag
            const result = await this.app.mysql.query(sql)
            if(result[0]===undefined){
                ctx.returnBody(true, result, "该文档已经被删除",9999);
            }else {
                ctx.returnBody(true, result, "success",200);
            }
        } catch (e) {
            ctx.returnBody(false, {}, "fail",9999);
        }
    }

    /**
     * 创建新文章内容
     * /doc/createdoc
     */
    async createDoc() {
        const {ctx, app} = this
        const data = this.ctx.request.body
        let user = ctx.request.user
        let tag;
        tag = Date.parse(new Date());
        const myDate = new Date();
        const year = myDate.getFullYear();
        const month = myDate.getMonth();
        const date = myDate.getDay();
        const resultDate = year + "年" + (month+1) + "月" + date + "日";
        const tempObect = {addtime: resultDate, tag: tag, user_id: user.userId};
        const obj = Object.assign(tempObect, data);
        const result = await this.app.mysql.insert('document', obj)
        const insertSuccess = result.affectedRows === 1
        if (insertSuccess === true) {
            ctx.returnBody(true, tempObect, "success");
        } else {
            ctx.returnBody(false, result, "插入失败，请进行反馈", 9999);
        }
    }

    /**
     * 修改单个文档内容
     * /doc/update
     */
    async updatedoc(){
        const {ctx, app} = this
        const data = this.ctx.request.body
        console.log(data)
        try {
            const result = await this.app.mysql.update('document', data);
            const insertSuccess = result.affectedRows === 1
            if (insertSuccess === true) {
                ctx.returnBody(true, {}, "success");
            } else {
                ctx.returnBody(true, result, "修改文档失败", 9999);
            }
        } catch (e) {
            console.log(e)
            ctx.returnBody(false, {}, "修改文档失败", 9999);
        }
    }

    /**
     * 删除文档
     * /doc/delete
     */
    async deletedoc(){
        try {
            const {ctx, app} = this
            const data = this.ctx.request.body
            const tag = data.tag;
            //获取用户通过post请求传递过来的参数
            let user = ctx.request.user
            console.log("tag:"+tag)
            console.log("userId:"+user.userId )
            const sql = "delete from document where tag=" + tag + " and user_id=" + user.userId + ""
            const res = await this.app.mysql.query(sql)
            ctx.returnBody(true, {}, "success", 200);
        } catch (e) {
            ctx.returnBody(false, res, "fail", 9999);
        }
    }
}

module.exports = DocumentController;
