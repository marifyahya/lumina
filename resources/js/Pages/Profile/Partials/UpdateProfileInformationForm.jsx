import { Link, useForm, usePage } from '@inertiajs/react';
import { Form, Input, Button, Typography, Alert, message } from 'antd';
import { UserOutlined, MailOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

const { Title, Text } = Typography;

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = () => {
        patch(route('profile.update'));
    };

    useEffect(() => {
        if (recentlySuccessful) {
            message.success('Profile information updated successfully.');
        }
    }, [recentlySuccessful]);

    return (
        <section className={className}>
            <header style={{ marginBottom: 24 }}>
                <Title level={4} style={{ margin: 0 }}>Profile Information</Title>
                <Text type="secondary">
                    Update your account's profile information and email address.
                </Text>
            </header>

            <Form
                layout="vertical"
                onFinish={submit}
                initialValues={data}
                disabled={processing}
            >
                <Form.Item
                    label="Full Name"
                    validateStatus={errors.name ? 'error' : ''}
                    help={errors.name}
                    required
                >
                    <Input 
                        prefix={<UserOutlined className="text-slate-400" />}
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
                        size="large"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                </Form.Item>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div style={{ marginBottom: 24 }}>
                        <Alert
                            message="Your email address is unverified."
                            description={
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="font-bold"
                                >
                                    Click here to re-send the verification email.
                                </Link>
                            }
                            type="warning"
                            showIcon
                        />

                        {status === 'verification-link-sent' && (
                            <Alert
                                message="A new verification link has been sent to your email address."
                                type="success"
                                showIcon
                                style={{ marginTop: 12 }}
                            />
                        )}
                    </div>
                )}

                <Form.Item style={{ marginBottom: 0 }}>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        size="large" 
                        loading={processing}
                        icon={recentlySuccessful ? <CheckCircleOutlined /> : null}
                    >
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </section>
    );
}
