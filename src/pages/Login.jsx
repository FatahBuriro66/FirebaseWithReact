import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, message } from 'antd';
import SocialLoginButton from '../components/Buttons/SocialLoginButton';
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth'
import { auth } from '../configs/firebaseConfig';

function Login() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = async (data) => {
        try {
            await setPersistence(auth, browserSessionPersistence)

            const response = await signInWithEmailAndPassword(auth, data.email, data.password)
            messageApi.open({
                type: 'success',
                content: 'login successful',
            });

            setTimeout(() => navigate('/'), 3000)
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: error?.message || 'something went wrong',
            });
        }
    };


    return (
        <div className='login-main'>
            {contextHolder}
            <h1 className='page-title'>Login</h1>
            <div className='login-form-holder'>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
                <Divider />
                <SocialLoginButton
                    provider='google'
                />

                <p>Dont have an account? <Link to={'/auth/register'}>register</Link></p>
            </div>
        </div>
    )
}

export default Login