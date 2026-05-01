import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Table, Tag, Space, Button, Card, Typography, Input, Select, Badge } from 'antd';
import { 
    EyeOutlined, 
    CheckOutlined, 
    CloseOutlined,
    SearchOutlined,
    FilterOutlined
} from '@ant-design/icons';
import useTranslate from '@/hooks/useTranslate';

const { Title, Text } = Typography;

export default function Index({ registrations, filters }) {
    const { t } = useTranslate();

    const columns = [
        {
            title: t('ppdb.reg_number'),
            dataIndex: 'registration_number',
            key: 'registration_number',
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: t('ppdb.full_name'),
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: t('ppdb.step_school'),
            dataIndex: 'previous_school',
            key: 'previous_school',
        },
        {
            title: t('common.status'),
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = 'gold';
                if (status === 'Approved') color = 'green';
                if (status === 'Rejected') color = 'red';
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link href={route('admin.admissions.show', record.id)}>
                        <Button icon={<EyeOutlined />} size="small">Detail</Button>
                    </Link>
                    {record.status === 'Pending' && (
                        <>
                            <Button 
                                type="primary" 
                                size="small" 
                                icon={<CheckOutlined />}
                                onClick={() => router.post(route('admin.admissions.approve', record.id))}
                                style={{ background: '#10b981', borderColor: '#10b981' }}
                            >
                                Approve
                            </Button>
                            <Button 
                                danger 
                                size="small" 
                                icon={<CloseOutlined />}
                                onClick={() => router.post(route('admin.admissions.reject', record.id))}
                            >
                                Reject
                            </Button>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    const handleFilterChange = (value) => {
        router.get(route('admin.admissions.index'), { status: value }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title="PPDB Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <Title level={2} style={{ margin: 0 }}>PPDB Admissions</Title>
                            <Text type="secondary">Review and verify new student registrations</Text>
                        </div>
                        
                        <Space>
                            <Select 
                                placeholder="Filter Status" 
                                style={{ width: 150 }} 
                                onChange={handleFilterChange}
                                allowClear
                                defaultValue={filters.status}
                            >
                                <Select.Option value="Pending">Pending</Select.Option>
                                <Select.Option value="Approved">Approved</Select.Option>
                                <Select.Option value="Rejected">Rejected</Select.Option>
                            </Select>
                        </Space>
                    </div>

                    <Card bordered={false} style={{ borderRadius: 16 }}>
                        <Table 
                            columns={columns} 
                            dataSource={registrations.data} 
                            pagination={{
                                current: registrations.current_page,
                                total: registrations.total,
                                pageSize: registrations.per_page,
                                onChange: (page) => router.get(route('admin.admissions.index'), { page, ...filters })
                            }}
                            rowKey="id"
                        />
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
