import {Layout, List, Menu, Icon, Breadcrumb, Slider} from 'antd';
import React, {useEffect} from 'react';
import '../static/css/AdminIndex.css'
import {Route} from 'react-router-dom'
import DataList from './DataList'

/**
 * 后台管理页面
 */
function AdminIndex(props) {
    useEffect(() => {
        console.log('Hello')
    })
    //添加文章
    const handleClickArticle=e=>{
        if(e.key=='addArticle'){
            console.log('添加文章')
        }else {
            console.log('文章列表')
        }
    }
    //退出登录
    const handleExit = e => {
        console.log('退出登录')
    }
    return <div>
        <Layout  >
            <Sider collapsible className="slider">
                <div className="logo"/>
                <Menu theme="dark" defaultOpenKeys={['01']} mode="inline">
                    {/* 左侧菜单一，工作台 */}
                    <Menu.Item key="1">
                        <Icon type="user"/>
                        <span>用户管理</span>
                    </Menu.Item>

                </Menu>
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Content style={{margin:'16px 0'}}>
                    <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                        <Route path="/index/"  component={DataList}/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    </div>
}

export default AdminIndex
