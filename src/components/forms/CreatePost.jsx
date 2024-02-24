import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, message, Form, Input } from 'antd';
import { auth, db } from '../../configs/firebaseConfig';
import { set, ref, push } from 'firebase/database'

function CreatePost({ handleIsFetch }) {
    const [form] = Form.useForm();

    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false)

    const onFinish = async (data) => {
        try {
            setLoading(true)
            const postRef = ref(db, `posts`);
            const newPostRef = push(postRef);

            const response = await set(ref(db, `posts/${newPostRef.key}`), {
                uid: auth.currentUser.uid,
                email: auth.currentUser.email,
                title: data.postTitle,
                description: data.postDescription
            });


            setLoading(false)
            messageApi.open({
                type: 'success',
                content: 'post created',
            });
            form.resetFields()
            handleIsFetch()
        } catch (error) {
            setLoading(false)
            messageApi.open({
                type: 'error',
                content: 'error in post creation',
            });
        }
    }

    return (
        <div>
            {contextHolder}
            <Form
                form={form}
                name="normal_post"
                className="create-post-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="postTitle"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            type: 'text',
                            message: 'Please input your post title!',
                        },
                    ]}
                >
                    <Input placeholder="Post Title" />
                </Form.Item>
                <Form.Item
                    name="postDescription"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            type: 'text',
                            message: 'Please input your post description!',
                        },
                    ]}
                >
                    <Input placeholder="Post Description" />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block className="create-post-form-button">
                        Create Post
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreatePost