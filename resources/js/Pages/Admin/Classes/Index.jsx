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

import useTranslate from '@/hooks/useTranslate';

const { Title, Text } = Typography;

export default function Index({ classes, teachers, activeYear }) {
    const { t } = useTranslate();
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
                message.success(t('class.success_create'));
            },
        });
    };

    const handleDelete = (id) => {
        router.delete(route('admin.classes.destroy', id), {
            onSuccess: () => message.success(t('class.success_delete')),
        });
    };

    const columns = [
        {
            title: t('class.name'),
            dataIndex: 'name',
            key: 'name',
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: t('class.level'),
            dataIndex: 'level',
            key: 'level',
            render: (level) => <Tag color="blue">{t('class.level')} {level}</Tag>,
        },
        {
            title: t('class.homeroom'),
            dataIndex: 'teacher',
            key: 'teacher',
            render: (teacher) => (
                teacher ? (
                    <Space>
                        <UserOutlined style={{ color: '#94a3b8' }} />
                        <Text>{teacher.user.name}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>({teacher.nip || t('class.no_nip')})</Text>
                    </Space>
                ) : (
                    <Text type="warning italic">{t('class.not_assigned')}</Text>
                )
            ),
        },
        {
            title: t('common.actions'),
            key: 'actions',
            render: (_, record) => (
                <Popconfirm
                    title={t('class.confirm_delete_title')}
                    description={t('class.confirm_delete_desc')}
                    onConfirm={() => handleDelete(record.id)}
                    okText={t('common.yes')}
                    cancelText={t('common.no')}
                >
                    <Button 
                        type="link" 
                        danger 
                        size="small" 
                        icon={<DeleteOutlined />}
                        style={{ padding: 0 }}
                    >
                        {t('common.delete')}
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            header={t('class.mgmt')}
        >
            <Head title={t('class.title')} />

            {!activeYear ? (
                <Alert
                    message={t('class.err_no_active_year')}
                    description={
                        <span>
                            {t('class.err_no_active_year_desc')}
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
                                {t('class.list_for')} {activeYear.year} ({t(`academic.${activeYear.semester.toLowerCase()}`)})
                            </Title>
                            <Text type="secondary">{t('class.desc')}</Text>
                        </div>
                        <Button 
                            type="primary" 
                            icon={<PlusOutlined />} 
                            onClick={showModal}
                            size="large"
                        >
                            {t('class.add')}
                        </Button>
                    </div>

                    <Card bordered={false} className="shadow-sm" bodyStyle={{ padding: classes.length === 0 ? 64 : 0 }}>
                        {classes.length === 0 ? (
                            <Empty description={t('class.empty')} />
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
                        <span>{t('class.create')}</span>
                    </Space>
                }
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={handleCancel}
                confirmLoading={processing}
                okText={t('class.create')}
            >
                <Form layout="vertical" style={{ marginTop: 24 }}>
                    <Form.Item 
                        label={t('class.name')} 
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
                        label={t('class.level')} 
                        required
                        validateStatus={errors.level ? 'error' : ''}
                        help={errors.level}
                    >
                        <Select
                            value={data.level}
                            onChange={(value) => setData('level', value)}
                            options={Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: `${t('class.level')} ${i + 1}` }))}
                        />
                    </Form.Item>
                    <Form.Item 
                        label={t('class.homeroom')} 
                        validateStatus={errors.teacher_id ? 'error' : ''}
                        help={errors.teacher_id}
                    >
                        <Select
                            placeholder={t('class.select_teacher')}
                            value={data.teacher_id}
                            onChange={(value) => setData('teacher_id', value)}
                            allowClear
                            showSearch
                            optionFilterProp="children"
                        >
                            {teachers.map(teacher => (
                                <Select.Option key={teacher.id} value={teacher.id}>
                                    {teacher.user.name} ({teacher.nip || t('class.no_nip')})
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </AuthenticatedLayout>
    );
}
