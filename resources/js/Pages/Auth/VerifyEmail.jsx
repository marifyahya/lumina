import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Typography, Alert, Space } from 'antd';
import { MailOutlined, LogoutOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = () => {
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div style={{ marginBottom: 24, textAlign: 'center' }}>
                <div style={{ fontSize: 48, color: '#0f172a', marginBottom: 16 }}>
                    <MailOutlined />
                </div>
                <Title level={3} style={{ margin: 0, fontWeight: 800 }}>Verify Email</Title>
                <Text type="secondary">
                    Thanks for signing up! Please verify your email address by clicking on the link we just emailed to you.
                </Text>
            </div>

            {status === 'verification-link-sent' && (
                <Alert
                    message="A new verification link has been sent to your email address."
                    type="success"
                    showIcon
                    style={{ marginBottom: 24 }}
                />
            )}

            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Button 
                    type="primary" 
                    size="large" 
                    block 
                    onClick={submit}
                    loading={processing}
                    style={{ fontWeight: 700, height: 48 }}
                >
                    Resend Verification Email
                </Button>

                <div style={{ textAlign: 'center' }}>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        className="text-sm font-medium text-slate-500 hover:text-slate-900"
                    >
                        <LogoutOutlined /> Log Out
                    </Link>
                </div>
            </Space>
        </GuestLayout>
    );
}
