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
    Typography,
    Alert,
    Empty
} from 'antd';
import { 
    PlusOutlined, 
    DeleteOutlined,
    BookOutlined,
    UserOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function Index({ classes, teachers, activeYear }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        level: 1,
        teacher_id: null,
    });

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => {
        setIsModalOpen(false);
        reset();
    };

    const handleSubmit = () => {
        post(route('admin.classes.store'), {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
                message.success('Class created successfully');
            },
        });
    };

    const handleDelete = (id) => {
        router.delete(route('admin.classes.destroy', id), {
            onSuccess: () => message.success('Class deleted successfully'),
        });
    };

    const columns = [
        {
            title: 'Class Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
            render: (level) => <Tag color="blue">Level {level}</Tag>,
        },
        {
            title: 'Homeroom Teacher',
            dataIndex: 'teacher',
            key: 'teacher',
            render: (teacher) => (
                teacher ? (
                    <Space>
                        <UserOutlined style={{ color: '#94a3b8' }} />
                        <Text>{teacher.user.name}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>({teacher.nip || 'No NIP'})</Text>
                    </Space>
                ) : (
                    <Text type="warning italic">Not Assigned</Text>
                )
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Popconfirm
                    title="Delete class?"
                    description="Are you sure you want to delete this class?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button 
                        type="link" 
                        danger 
                        size="small" 
                        icon={<DeleteOutlined />}
                        style={{ padding: 0 }}
                    >
                        Delete
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            header="Class Management"
        >
            <Head title="Classes" />

            {!activeYear ? (
                <Alert
                    message="Active Academic Year Required"
                    description={
                        <span>
                            No active academic year found. Please <Text strong onClick={() => router.get(route('admin.academic-years.index'))} style={{ cursor: 'pointer', textDecoration: 'underline' }}>activate an academic year</Text> before managing classes.
                        </span>
                    }
                    type="warning"
                    showIcon
                    icon={<InfoCircleOutlined />}
                />
            ) : (
                <>
                    <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <Title level={4} style={{ margin: 0 }}>
                                Classes for {activeYear.year} ({activeYear.semester})
                            </Title>
                            <Text type="secondary">Organize students into groups and assign homeroom teachers.</Text>
                        </div>
                        <Button 
                            type="primary" 
                            icon={<PlusOutlined />} 
                            onClick={showModal}
                            size="large"
                        >
                            Add Class
                        </Button>
                    </div>

                    <Card bordered={false} className="shadow-sm" bodyStyle={{ padding: classes.length === 0 ? 64 : 0 }}>
                        {classes.length === 0 ? (
                            <Empty description="No classes found for the active year." />
                        ) : (
                            <Table 
                                columns={columns} 
                                dataSource={classes} 
                                rowKey="id" 
                                pagination={false}
                            />
                        )}
                    </Card>
                </>
            )}

            <Modal
                title={
                    <Space>
                        <BookOutlined />
                        <span>Create New Class</span>
                    </Space>
                }
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={handleCancel}
                confirmLoading={processing}
                okText="Create Class"
            >
                <Form layout="vertical" style={{ marginTop: 24 }}>
                    <Form.Item 
                        label="Class Name" 
                        required 
                        validateStatus={errors.name ? 'error' : ''}
                        help={errors.name}
                    >
                        <Input 
                            placeholder="e.g., XII-IPA-1" 
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Level" 
                        required
                        validateStatus={errors.level ? 'error' : ''}
                        help={errors.level}
                    >
                        <Select
                            value={data.level}
                            onChange={(value) => setData('level', value)}
                            options={Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: `Level ${i + 1}` }))}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Homeroom Teacher" 
                        validateStatus={errors.teacher_id ? 'error' : ''}
                        help={errors.teacher_id}
                    >
                        <Select
                            placeholder="Select a teacher"
                            value={data.teacher_id}
                            onChange={(value) => setData('teacher_id', value)}
                            allowClear
                            showSearch
                            optionFilterProp="children"
                        >
                            {teachers.map(teacher => (
                                <Select.Option key={teacher.id} value={teacher.id}>
                                    {teacher.user.name} ({teacher.nip || 'No NIP'})
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </AuthenticatedLayout>
    );
}
