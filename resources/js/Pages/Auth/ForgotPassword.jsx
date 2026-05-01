import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = () => {
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div style={{ marginBottom: 24 }}>
                <Title level={3} style={{ margin: 0, fontWeight: 800 }}>Reset Password</Title>
                <Text type="secondary">
                    Forgot your password? No problem. Just let us know your email address and we will email you a password reset link.
                </Text>
            </div>

            {status && (
                <Alert
                    message={status}
                    type="success"
                    showIcon
                    style={{ marginBottom: 24 }}
                />
            )}

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

                <Form.Item style={{ marginBottom: 0 }}>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        size="large" 
                        block 
                        loading={processing}
                        style={{ fontWeight: 700, height: 48 }}
                    >
                        Send Reset Link
                    </Button>
                </Form.Item>
                
                <div style={{ marginTop: 24, textAlign: 'center' }}>
                    <Link href={route('login')} className="text-sm font-medium text-slate-500 hover:text-slate-900">
                        <ArrowLeftOutlined /> Back to Sign in
                    </Link>
                </div>
            </Form>
        </GuestLayout>
    );
}
