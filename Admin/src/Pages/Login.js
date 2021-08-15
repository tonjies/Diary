import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {Card, Input, Button, Spin, message, Icon} from "antd";
import '../static/css/Login.css';
import axios from 'axios'
import servicePath from '../config/apiUrl'
function Login(props) {
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const checkLogin = () => {
        setIsLoading(true)
        setTimeout(()=>{
            setIsLoading(false)
        },1000)
        if(!userName){
            message.error('用户名不存在')
            return false
        }else if(!password){
            message.error('密码不能为空')
            return false
        }
        let dataProps={
            'username':userName,
            'password':password
        }
        {
            console.log('url地址:')
        }
        axios({
            method:'post',
            url:servicePath.login,
            data:dataProps
        }).then(res => {
            console.log('登录成功1')
            console.log(res.data)
            console.log('登录成功2')
            setIsLoading(false)
            if(res.data.status==true){
                localStorage.setItem('token',res.data.body.token)
                props.history.push('/index')
            }else {
                message.error('用户名密码错误')
            }
        })
    }
    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={false}>
                <Card title="Diary System" bordered={true} style={{width: 400}}>
                    <Input
                        id="username"
                        size="large"
                        placeholder="Enter tou userName"
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                    />
                    <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter you password"
                        prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin}>Login in</Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login
