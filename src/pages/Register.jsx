import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, message, Form, Input } from 'antd';
import { auth } from '../configs/firebaseConfig'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'



function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()


  const onFinish = async (data) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, data?.email, data?.password)
      if (response && response.user) {
        
        const verifyResponse = await sendEmailVerification(response.user)

        messageApi.open({
          type: 'success',
          content: 'Verify your email address an email has been sended your email address',
        });

        setTimeout(() => navigate('/auth') , 3000)
      }

    } catch (error) {
      console.error('Error creating user', error);
      messageApi.open({
        type: 'error',
        content: error?.message || 'something went wrong',
      });
    }
  }

  return (
    <div className='register-main'>
      {contextHolder}
      <h1 className='page-title'>Register</h1>
      <div className='register-form-holder'>
        <Form
          name="normal_register"
          className="register-form"
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
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="cPassword"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="login-form-button">
              Register
            </Button>
          </Form.Item>
        </Form>
        <p>Already have an account? <Link to={'/auth'}>login</Link></p>

      </div>
    </div>
  )
}

export default Register