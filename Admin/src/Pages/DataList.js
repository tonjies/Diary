import {Layout, List, Menu, Icon, Breadcrumb, Slider, message,Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import { Table } from 'antd';
import axios from "axios";
import servicePath from "../config/apiUrl";

const { confirm } = Modal;

function extracted(setList) {
    axios({
        method: 'post',
        url: servicePath.getUserList
    }).then(res => {
        let list = res.data.body
        const userlist = new Array();
        for (let i = 0; i < list.length; i++) {
            const myDate = new Date(Number(list[i].registerdate));
            const result = myDate.getFullYear() + "年" + myDate.getMonth() + "月" + myDate.getDay() + "日";
            userlist.unshift({key: i, name: list[i].username, date: result, userId: list[i].id})
        }
        setList(userlist)
    })
}

/**
 * 后台管理页面
 */
function DataList(props) {
    const [userlist, setList] = useState([])
    useEffect(() => {
        extracted(setList);
    },[])

    const columns = [
        {
            title: '用户名',
            dataIndex: 'name'
        },
        {
            title: '注册时间',
            dataIndex: 'date',
        },
        {
            title: 'Action',
            dataIndex: '',
            render: (text,record,index) => <a onClick={()=>deleteData(index)}>Delete</a>,
        },
    ];

    const deleteData=(record)=>{
        console.log(record)
        //拿到下标，发送删除请求，接受到成功的标志后
        confirm({
            title: '确认要删除该用户吗？',
            onCancel() {},
            onOk() {
                console.log("onOk")
                axios({
                    method:'post',
                    url:servicePath.deleteUser,
                    data:{
                        id:userlist[record].userId
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.data.status==true){
                        extracted(setList)
                    }
                })
            }
        });
    }

    return <div>
        <Table columns={columns} dataSource={userlist} />,
    </div>
}

export default DataList
