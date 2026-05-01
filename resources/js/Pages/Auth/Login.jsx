import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Form, Input, Button, Checkbox, Alert, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = () => {
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div style={{ marginBottom: 24 }}>
                <Title level={3} style={{ margin: 0, fontWeight: 800 }}>Welcome Back</Title>
                <Text type="secondary">Sign in to your account to continue</Text>
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
                        placeholder="admin@lumina.test"
                        size="large"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
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

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <Checkbox 
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                    >
                        Remember me
                    </Checkbox>
                    
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm font-medium text-slate-500 hover:text-slate-900"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                <Form.Item style={{ marginBottom: 0 }}>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        size="large" 
                        block 
                        loading={processing}
                        style={{ fontWeight: 700, height: 48 }}
                    >
                        Log in
                    </Button>
                </Form.Item>
                
                <div style={{ marginTop: 24, textAlign: 'center' }}>
                    <Text type="secondary" className="text-sm">
                        Don't have an account? <Link href={route('register')} className="font-bold text-slate-900">Sign up</Link>
                    </Text>
                </div>
            </Form>
        </GuestLayout>
    );
}
