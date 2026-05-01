import { useForm } from '@inertiajs/react';
import { Form, Input, Button, Typography, message } from 'antd';
import { LockOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

const { Title, Text } = Typography;

export default function UpdatePasswordForm({ className = '' }) {
    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = () => {
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    useEffect(() => {
        if (recentlySuccessful) {
            message.success('Password updated successfully.');
        }
    }, [recentlySuccessful]);

    return (
        <section className={className}>
            <header style={{ marginBottom: 24 }}>
                <Title level={4} style={{ margin: 0 }}>Update Password</Title>
                <Text type="secondary">
                    Ensure your account is using a long, random password to stay secure.
                </Text>
            </header>

            <Form
                layout="vertical"
                onFinish={updatePassword}
                initialValues={data}
                disabled={processing}
            >
                <Form.Item
                    label="Current Password"
                    validateStatus={errors.current_password ? 'error' : ''}
                    help={errors.current_password}
                    required
                >
                    <Input.Password
                        prefix={<LockOutlined className="text-slate-400" />}
                        size="large"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
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
                        loading={processing}
                        icon={recentlySuccessful ? <CheckCircleOutlined /> : null}
                    >
                        Update Password
                    </Button>
                </Form.Item>
            </Form>
        </section>
    );
}
