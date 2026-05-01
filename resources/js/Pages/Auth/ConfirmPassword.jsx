import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Form, Input, Button, Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = () => {
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div style={{ marginBottom: 24 }}>
                <Title level={3} style={{ margin: 0, fontWeight: 800 }}>Security Check</Title>
                <Text type="secondary">
                    This is a secure area of the application. Please confirm your password before continuing.
                </Text>
            </div>

            <Form
                layout="vertical"
                onFinish={submit}
                initialValues={data}
            >
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

                <Form.Item style={{ marginBottom: 0 }}>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        size="large" 
                        block 
                        loading={processing}
                        style={{ fontWeight: 700, height: 48 }}
                    >
                        Confirm
                    </Button>
                </Form.Item>
            </Form>
        </GuestLayout>
    );
}
