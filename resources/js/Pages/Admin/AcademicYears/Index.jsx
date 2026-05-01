import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Table, 
    Button, 
    Card, 
    Tag, 
    Space, 
    Modal, 
    Form, 
    Input, 
    Select, 
    Popconfirm, 
    message,
    Typography
} from 'antd';
import { 
    PlusOutlined, 
    CheckCircleOutlined, 
    DeleteOutlined,
    CalendarOutlined
} from '@ant-design/icons';

import useTranslate from '@/hooks/useTranslate';

const { Title, Text } = Typography;

export default function Index({ academicYears }) {
    const { t } = useTranslate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        year: '',
        semester: 'Odd',
    });

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => {
        setIsModalOpen(false);
        reset();
    };

    const handleSubmit = () => {
        post(route('admin.academic-years.store'), {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
                message.success(t('academic.success_create'));
            },
        });
    };

    const handleActivate = (id) => {
        router.patch(route('admin.academic-years.activate', id), {}, {
            onSuccess: () => message.success(t('academic.success_activate')),
        });
    };

    const handleDelete = (id) => {
        router.delete(route('admin.academic-years.destroy', id), {
            onSuccess: () => message.success(t('academic.success_delete')),
            onError: (errors) => message.error(t(errors.error) || t('Failed to delete')),
        });
    };

    const columns = [
        {
            title: t('academic.year'),
            dataIndex: 'year',
            key: 'year',
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: t('academic.semester'),
            dataIndex: 'semester',
            key: 'semester',
            render: (semester) => (
                <Tag color={semester === 'Odd' ? 'blue' : 'orange'}>
                    {t(`academic.${semester.toLowerCase()}`).toUpperCase()}
                </Tag>
            ),
        },
        {
            title: t('common.status'),
            dataIndex: 'is_active',
            key: 'is_active',
            render: (isActive) => (
                isActive ? (
                    <Tag color="success" icon={<CheckCircleOutlined />}>{t('common.active').toUpperCase()}</Tag>
                ) : (
                    <Tag color="default">{t('common.inactive').toUpperCase()}</Tag>
                )
            ),
        },
        {
            title: t('common.actions'),
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    {!record.is_active && (
                        <Button 
                            type="link" 
                            size="small" 
                            onClick={() => handleActivate(record.id)}
                            style={{ padding: 0 }}
                        >
                            {t('Activate')}
                        </Button>
                    )}
                    <Popconfirm
                        title={t('academic.confirm_delete_title')}
                        description={t('academic.confirm_delete_desc')}
                        onConfirm={() => handleDelete(record.id)}
                        okText={t('common.yes')}
                        cancelText={t('common.no')}
                        disabled={record.is_active}
                    >
                        <Button 
                            type="link" 
                            danger 
                            size="small" 
                            disabled={record.is_active}
                            style={{ padding: 0 }}
                        >
                            {t('common.delete')}
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            header={t('academic.mgmt')}
        >
            <Head title={t('academic.title')} />

            <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <Title level={4} style={{ margin: 0 }}>{t('academic.all')}</Title>
                    <Text type="secondary">{t('academic.desc')}</Text>
                </div>
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />} 
                    onClick={showModal}
                    size="large"
                >
                    {t('academic.add')}
                </Button>
            </div>

            <Card bordered={false} className="shadow-sm" bodyStyle={{ padding: 0 }}>
                <Table 
                    columns={columns} 
                    dataSource={academicYears} 
                    rowKey="id" 
                    pagination={false}
                />
            </Card>

            <Modal
                title={
                    <Space>
                        <CalendarOutlined />
                        <span>{t('academic.create')}</span>
                    </Space>
                }
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={handleCancel}
                confirmLoading={processing}
                okText={t('common.create')}
            >
                <Form layout="vertical" style={{ marginTop: 24 }}>
                    <Form.Item 
                        label={t('academic.year')} 
                        required 
                        validateStatus={errors.year ? 'error' : ''}
                        help={errors.year}
                    >
                        <Input 
                            placeholder="e.g., 2024/2025" 
                            value={data.year}
                            onChange={(e) => setData('year', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item 
                        label={t('academic.semester')} 
                        required
                        validateStatus={errors.semester ? 'error' : ''}
                        help={errors.semester}
                    >
                        <Select
                            value={data.semester}
                            onChange={(value) => setData('semester', value)}
                            options={[
                                { value: 'Odd', label: t('academic.odd') },
                                { value: 'Even', label: t('academic.even') },
                            ]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </AuthenticatedLayout>
    );
}
