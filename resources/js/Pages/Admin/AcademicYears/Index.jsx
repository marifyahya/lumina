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

const { Title, Text } = Typography;

export default function Index({ academicYears }) {
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
                message.success('Academic year created successfully');
            },
        });
    };

    const handleActivate = (id) => {
        router.patch(route('admin.academic-years.activate', id), {}, {
            onSuccess: () => message.success('Academic year activated successfully'),
        });
    };

    const handleDelete = (id) => {
        router.delete(route('admin.academic-years.destroy', id), {
            onSuccess: () => message.success('Academic year deleted successfully'),
            onError: (errors) => message.error(errors.error || 'Failed to delete'),
        });
    };

    const columns = [
        {
            title: 'Academic Year',
            dataIndex: 'year',
            key: 'year',
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Semester',
            dataIndex: 'semester',
            key: 'semester',
            render: (semester) => (
                <Tag color={semester === 'Odd' ? 'blue' : 'orange'}>
                    {semester.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (isActive) => (
                isActive ? (
                    <Tag color="success" icon={<CheckCircleOutlined />}>ACTIVE</Tag>
                ) : (
                    <Tag color="default">INACTIVE</Tag>
                )
            ),
        },
        {
            title: 'Actions',
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
                            Activate
                        </Button>
                    )}
                    <Popconfirm
                        title="Delete academic year?"
                        description="Are you sure you want to delete this year?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                        disabled={record.is_active}
                    >
                        <Button 
                            type="link" 
                            danger 
                            size="small" 
                            disabled={record.is_active}
                            style={{ padding: 0 }}
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            header="Academic Years Management"
        >
            <Head title="Academic Years" />

            <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <Title level={4} style={{ margin: 0 }}>All Academic Years</Title>
                    <Text type="secondary">Manage institution academic periods and active status.</Text>
                </div>
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />} 
                    onClick={showModal}
                    size="large"
                >
                    Add Academic Year
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
                        <span>Create Academic Year</span>
                    </Space>
                }
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={handleCancel}
                confirmLoading={processing}
                okText="Create"
            >
                <Form layout="vertical" style={{ marginTop: 24 }}>
                    <Form.Item 
                        label="Year" 
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
                        label="Semester" 
                        required
                        validateStatus={errors.semester ? 'error' : ''}
                        help={errors.semester}
                    >
                        <Select
                            value={data.semester}
                            onChange={(value) => setData('semester', value)}
                            options={[
                                { value: 'Odd', label: 'Odd' },
                                { value: 'Even', label: 'Even' },
                            ]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </AuthenticatedLayout>
    );
}
