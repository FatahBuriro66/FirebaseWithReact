import React, { useState } from 'react';
import { auth } from '../configs/firebaseConfig'
import { signOut } from 'firebase/auth'
import {
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useIsMobile from '../hooks/useIsMobile';

const { Header, Sider, Content } = Layout;


const DashboardLayout = () => {
    const { isMobile } = useIsMobile()


    const navigate = useNavigate()
    const location = useLocation()
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleClickNav = (route) => {
        console.log("R", route);
        navigate(route)
    }

    const handleLogout = async () => {
        try {
            const result = signOut(auth)
            localStorage.removeItem('user')
            navigate('/auth')

        } catch (error) {
            console.error('Error', error)
        }
    }

    console.log("Hi");
    return (
        <Layout style={{
            minHeight: '100vh'
        }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[location.pathname]}
                    items={[
                        {
                            key: '/',
                            icon: <UserOutlined />,
                            label: 'Home',
                            onClick: () => handleClickNav('/')
                        },
                        {
                            key: '/posts',
                            icon: <VideoCameraOutlined />,
                            label: 'Posts',
                            onClick: () => handleClickNav('/posts')
                        },
                        {
                            key: '3',
                            icon: <LogoutOutlined />,
                            label: 'Logout',
                            onClick: () => handleLogout()
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />

                    {!isMobile && <Button
                        onClick={() => {
                        }}
                    >
                        CHANGE THEME
                    </Button>}
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default DashboardLayout;