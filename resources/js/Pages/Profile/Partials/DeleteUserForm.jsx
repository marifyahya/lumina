import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button, Modal, Input, Typography, Alert } from 'antd';
import { ExclamationCircleOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = () => {
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={className}>
            <header style={{ marginBottom: 24 }}>
                <Title level={4} style={{ margin: 0, color: '#ef4444' }}>Danger Zone</Title>
                <Text type="secondary">
                    Once your account is deleted, all of its resources and data will be permanently deleted.
                </Text>
            </header>

            <Button type="primary" danger onClick={confirmUserDeletion}>
                Delete Account permanently
            </Button>

            <Modal
                title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <ExclamationCircleOutlined style={{ color: '#ef4444' }} />
                        <span>Are you sure you want to delete your account?</span>
                    </div>
                }
                open={confirmingUserDeletion}
                onCancel={closeModal}
                onOk={deleteUser}
                okText="Delete Account"
                okButtonProps={{ danger: true, loading: processing }}
                cancelText="Cancel"
                width={500}
            >
                <div style={{ marginTop: 16 }}>
                    <Text type="secondary">
                        Once your account is deleted, all of its resources and data will be permanently deleted. 
                        Please enter your password to confirm you would like to permanently delete your account.
                    </Text>
                    
                    <div style={{ marginTop: 24 }}>
                        <Input.Password
                            prefix={<LockOutlined className="text-slate-400" />}
                            size="large"
                            placeholder="Confirm Password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            status={errors.password ? 'error' : ''}
                        />
                        {errors.password && (
                            <div style={{ color: '#ff4d4f', marginTop: 8, fontSize: 14 }}>
                                {errors.password}
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </section>
    );
}
