import axios from "axios";
import {message} from "antd";

class Http{
    static async request({
        url,
        data
    }){
        const token = localStorage.getItem('token');
        axios({
            method:'post',
            url:url,
            data:data,
            headers: {'token': token}
        }).then(res=>{
            console.log(res)
            if(res.data.code==401){
                message.error('登录过期，请重新登录');
            }
            return res.data
        })
    }
}
export default Http
