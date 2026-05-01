import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Form, Input, Button, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = () => {
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div style={{ marginBottom: 24 }}>
                <Title level={3} style={{ margin: 0, fontWeight: 800 }}>Create New Password</Title>
                <Text type="secondary">Enter your new password below to reset your account access.</Text>
            </div>

            <Form
                layout="vertical"
                onFinish={submit}
                initialValues={data}
            >
                <Form.Item
                    label="Email Address"
                    validateStatus={errors.email ? 'error' : ''}
                    help={errors.email}
                    required
                >
                    <Input 
                        prefix={<MailOutlined className="text-slate-400" />} 
                        placeholder="john@example.com"
                        size="large"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="New Password"
                    validateStatus={errors.password ? 'error' : ''}
                    help={errors.password}
                    required
                >
                    <Input.Password
                        prefix={<LockOutlined className="text-slate-400" />}
                        placeholder="••••••••"
                        size="large"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Confirm New Password"
                    validateStatus={errors.password_confirmation ? 'error' : ''}
                    help={errors.password_confirmation}
                    required
                >
                    <Input.Password
                        prefix={<LockOutlined className="text-slate-400" />}
                        placeholder="••••••••"
                        size="large"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        size="large" 
                        block 
                        loading={processing}
                        style={{ fontWeight: 700, height: 48 }}
                    >
                        Reset Password
                    </Button>
                </Form.Item>
            </Form>
        </GuestLayout>
    );
}
