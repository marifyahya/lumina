import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Card, 
    Row, 
    Col, 
    Typography, 
    Descriptions, 
    Tag, 
    Button, 
    Space, 
    Divider,
    Alert
} from 'antd';
import { 
    ArrowLeftOutlined, 
    CheckOutlined, 
    CloseOutlined,
    FilePdfOutlined,
    UserOutlined,
    HomeOutlined,
    BookOutlined,
    TeamOutlined
} from '@ant-design/icons';
import useTranslate from '@/hooks/useTranslate';

const { Title, Text } = Typography;

export default function Detail({ registration }) {
    const { t } = useTranslate();

    const handleApprove = () => {
        router.post(route('admin.admissions.approve', registration.id));
    };

    const handleReject = () => {
        router.post(route('admin.admissions.reject', registration.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Detail - ${registration.full_name}`} />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Space size="large">
                            <Link href={route('admin.admissions.index')}>
                                <Button icon={<ArrowLeftOutlined />} shape="circle" />
                            </Link>
                            <div>
                                <Title level={3} style={{ margin: 0 }}>{registration.full_name}</Title>
                                <Text type="secondary">{registration.registration_number}</Text>
                            </div>
                        </Space>

                        <Space>
                            {registration.status === 'Pending' && (
                                <>
                                    <Button 
                                        type="primary" 
                                        size="large" 
                                        icon={<CheckOutlined />}
                                        onClick={handleApprove}
                                        style={{ background: '#10b981', borderColor: '#10b981' }}
                                    >
                                        Approve & Create Student
                                    </Button>
                                    <Button 
                                        danger 
                                        size="large" 
                                        icon={<CloseOutlined />}
                                        onClick={handleReject}
                                    >
                                        Reject
                                    </Button>
                                </>
                            )}
                            {registration.status !== 'Pending' && (
                                <Tag color={registration.status === 'Approved' ? 'green' : 'red'} style={{ padding: '4px 12px', fontSize: 14 }}>
                                    {registration.status.toUpperCase()}
                                </Tag>
                            )}
                        </Space>
                    </div>

                    <Row gutter={[24, 24]}>
                        <Col xs={24} lg={16}>
                            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                                {/* Personal Info */}
                                <Card title={<Space><UserOutlined /> {t('ppdb.personal_info')}</Space>} bordered={false} style={{ borderRadius: 16 }}>
                                    <Descriptions column={2} bordered>
                                        <Descriptions.Item label={t('ppdb.full_name')}>{registration.full_name}</Descriptions.Item>
                                        <Descriptions.Item label={t('ppdb.gender')}>{registration.gender === 'M' ? t('ppdb.male') : t('ppdb.female')}</Descriptions.Item>
                                        <Descriptions.Item label={t('ppdb.place_birth')}>{registration.place_birth}</Descriptions.Item>
                                        <Descriptions.Item label={t('ppdb.birth_date')}>{registration.birth_date}</Descriptions.Item>
                                        <Descriptions.Item label={t('ppdb.religion')}>{registration.religion}</Descriptions.Item>
                                        <Descriptions.Item label={t('ppdb.nisn')}>{registration.nisn}</Descriptions.Item>
                                        <Descriptions.Item label={t('ppdb.nik')}>{registration.nik}</Descriptions.Item>
                                        <Descriptions.Item label={t('ppdb.kk_number')}>{registration.kk_number}</Descriptions.Item>
                                    </Descriptions>
                                </Card>

                                {/* Address */}
                                <Card title={<Space><HomeOutlined /> {t('ppdb.address_info')}</Space>} bordered={false} style={{ borderRadius: 16 }}>
                                    <Descriptions column={1} bordered>
                                        <Descriptions.Item label={t('ppdb.address_full')}>{registration.address_full}</Descriptions.Item>
                                        <Descriptions.Item label="RT / RW">{registration.rt} / {registration.rw}</Descriptions.Item>
                                        <Descriptions.Item label={t('ppdb.village')}>{registration.village}</Descriptions.Item>
                                        <Descriptions.Item label={t('ppdb.district')}>{registration.district}</Descriptions.Item>
                                        <Descriptions.Item label={t('ppdb.city')}>{registration.city}</Descriptions.Item>
                                        <Descriptions.Item label={t('ppdb.postal_code')}>{registration.postal_code}</Descriptions.Item>
                                    </Descriptions>
                                </Card>

                                {/* School */}
                                <Card title={<Space><BookOutlined /> {t('ppdb.school_info')}</Space>} bordered={false} style={{ borderRadius: 16 }}>
                                    <Descriptions column={1} bordered>
                                        <Descriptions.Item label={t('ppdb.previous_school')}>{registration.previous_school}</Descriptions.Item>
                                        <Descriptions.Item label={t('ppdb.grades')}>{registration.grades}</Descriptions.Item>
                                        <Descriptions.Item label={t('ppdb.achievements')}>{registration.achievements}</Descriptions.Item>
                                    </Descriptions>
                                </Card>

                                {/* Parents */}
                                <Card title={<Space><TeamOutlined /> {t('ppdb.parent_info')}</Space>} bordered={false} style={{ borderRadius: 16 }}>
                                    <Descriptions column={2} bordered>
                                        <Descriptions.Item label={t('ppdb.father_name')}>{registration.father_name}</Descriptions.Item>
                                        <Descriptions.Item label={t('ppdb.mother_name')}>{registration.mother_name}</Descriptions.Item>
                                        <Descriptions.Item label={t('ppdb.father_job')}>{registration.father_job}</Descriptions.Item>
                                        <Descriptions.Item label={t('ppdb.mother_job')}>{registration.mother_job}</Descriptions.Item>
                                        <Descriptions.Item label={t('ppdb.parent_education')}>{registration.parent_education}</Descriptions.Item>
                                        <Descriptions.Item label={t('ppdb.parent_phone')}>{registration.parent_phone}</Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Space>
                        </Col>

                        <Col xs={24} lg={8}>
                            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                                <Card title="Admission Status" bordered={false} style={{ borderRadius: 16 }}>
                                    <Descriptions column={1}>
                                        <Descriptions.Item label="Path">
                                            <Tag color="blue">{registration.path.toUpperCase()}</Tag>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Academic Year">
                                            {registration.academic_year?.year}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Applied At">
                                            {new Date(registration.created_at).toLocaleString()}
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>

                                <Card title="Documents" bordered={false} style={{ borderRadius: 16 }}>
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        {[
                                            { label: t('ppdb.doc_birth_cert'), path: registration.doc_birth_cert },
                                            { label: t('ppdb.doc_kk'), path: registration.doc_kk },
                                            { label: t('ppdb.doc_ijazah'), path: registration.doc_ijazah },
                                            { label: t('ppdb.doc_photo'), path: registration.doc_photo },
                                            { label: t('ppdb.doc_report'), path: registration.doc_report },
                                        ].map(doc => (
                                            <div key={doc.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                                                <Text size="small">{doc.label}</Text>
                                                {doc.path ? (
                                                    <a href={`/storage/${doc.path}`} target="_blank" rel="noreferrer">
                                                        <Button size="small" icon={<FilePdfOutlined />}>View</Button>
                                                    </a>
                                                ) : (
                                                    <Tag>Not Uploaded</Tag>
                                                )}
                                            </div>
                                        ))}
                                    </Space>
                                </Card>

                                {registration.declaration && (
                                    <Alert
                                        message="Declaration Signed"
                                        description="Applicant has declared that all information provided is true."
                                        type="success"
                                        showIcon
                                    />
                                )}
                            </Space>
                        </Col>
                    </Row>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
