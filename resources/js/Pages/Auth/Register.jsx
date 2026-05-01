import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = () => {
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div style={{ marginBottom: 24 }}>
                <Title level={3} style={{ margin: 0, fontWeight: 800 }}>Create Account</Title>
                <Text type="secondary">Join Lumina school management system</Text>
            </div>

            <Form
                layout="vertical"
                onFinish={submit}
                initialValues={data}
            >
                <Form.Item
                    label="Full Name"
                    validateStatus={errors.name ? 'error' : ''}
                    help={errors.name}
                    required
                >
                    <Input 
                        prefix={<UserOutlined className="text-slate-400" />} 
                        placeholder="John Doe"
                        size="large"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                </Form.Item>

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

                <Form.Item
                    label="Confirm Password"
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

                <Form.Item style={{ marginBottom: 0, marginTop: 12 }}>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        size="large" 
                        block 
                        loading={processing}
                        style={{ fontWeight: 700, height: 48 }}
                    >
                        Create Account
                    </Button>
                </Form.Item>
                
                <div style={{ marginTop: 24, textAlign: 'center' }}>
                    <Text type="secondary" className="text-sm">
                        Already have an account? <Link href={route('login')} className="font-bold text-slate-900">Sign in</Link>
                    </Text>
                </div>
            </Form>
        </GuestLayout>
    );
}
