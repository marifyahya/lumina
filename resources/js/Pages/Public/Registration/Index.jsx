import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Layout, Button, Typography, Row, Col, Card, Form, Input, Select, DatePicker, Space, ConfigProvider, Alert, Divider } from 'antd';
import { 
    UserOutlined, 
    BookOutlined, 
    PhoneOutlined, 
    GlobalOutlined,
    ArrowLeftOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import useTranslate from '@/hooks/useTranslate';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function Index({ activeYear }) {
    const { t } = useTranslate();
    const { locale } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        nisn: '',
        birth_date: null,
        gender: null,
        previous_school: '',
        parent_name: '',
        parent_phone: '',
    });

    const handleSubmit = () => {
        post(route('register.student.store'));
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#0f172a',
                    borderRadius: 8,
                },
            }}
        >
            <Layout style={{ minHeight: '100vh', background: '#f8fafc' }}>
                <Head title={t('ppdb.title')} />
                
                <Header style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    background: '#fff',
                    padding: '0 50px',
                    height: 70,
                    borderBottom: '1px solid #e2e8f0'
                }}>
                    <Link href="/">
                        <Space size="middle">
                            <div style={{ 
                                width: 32, 
                                height: 32, 
                                background: '#0f172a', 
                                borderRadius: 8,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontWeight: 900
                            }}>L</div>
                            <Title level={4} style={{ margin: 0, fontWeight: 800 }}>Lumina</Title>
                        </Space>
                    </Link>
                    
                    <Link href={route('register')}>
                        <Button type="text" icon={<ArrowLeftOutlined />}>
                            {t('common.cancel')}
                        </Button>
                    </Link>
                </Header>

                <Content style={{ padding: '50px 20px' }}>
                    <Row justify="center">
                        <Col xs={24} sm={20} md={16} lg={12}>
                            {!activeYear ? (
                                <Alert
                                    message={t('ppdb.closed')}
                                    description={t('ppdb.closed_desc')}
                                    type="error"
                                    showIcon
                                    style={{ borderRadius: 16 }}
                                />
                            ) : (
                                <Card bordered={false} className="shadow-sm" style={{ borderRadius: 24, padding: '20px 10px' }}>
                                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                                        <Title level={2} style={{ margin: 0, fontWeight: 800 }}>{t('ppdb.title')}</Title>
                                        <Text type="secondary" style={{ fontSize: 16 }}>{t('ppdb.subtitle')} {activeYear.year}</Text>
                                        <Paragraph style={{ marginTop: 16, color: '#64748b' }}>
                                            {t('ppdb.form_desc')}
                                        </Paragraph>
                                    </div>

                                    <Form layout="vertical" onFinish={handleSubmit} size="large">
                                        <Divider orientation="left" style={{ marginTop: 0 }}>
                                            <Space><UserOutlined /> {t('ppdb.personal_info')}</Space>
                                        </Divider>

                                        <Form.Item 
                                            label={t('ppdb.full_name')} 
                                            required 
                                            validateStatus={errors.full_name ? 'error' : ''}
                                            help={errors.full_name}
                                        >
                                            <Input 
                                                placeholder={t('ppdb.full_name')}
                                                value={data.full_name}
                                                onChange={e => setData('full_name', e.target.value)}
                                                prefix={<UserOutlined style={{ color: '#94a3b8' }} />}
                                            />
                                        </Form.Item>

                                        <Row gutter={16}>
                                            <Col xs={24} md={12}>
                                                <Form.Item 
                                                    label={t('ppdb.nisn')} 
                                                    validateStatus={errors.nisn ? 'error' : ''}
                                                    help={errors.nisn}
                                                >
                                                    <Input 
                                                        placeholder="e.g., 0123456789"
                                                        value={data.nisn}
                                                        onChange={e => setData('nisn', e.target.value)}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <Form.Item 
                                                    label={t('ppdb.gender')} 
                                                    required
                                                    validateStatus={errors.gender ? 'error' : ''}
                                                    help={errors.gender}
                                                >
                                                    <Select
                                                        placeholder={t('ppdb.gender')}
                                                        value={data.gender}
                                                        onChange={val => setData('gender', val)}
                                                        options={[
                                                            { value: 'M', label: t('ppdb.male') },
                                                            { value: 'F', label: t('ppdb.female') }
                                                        ]}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Form.Item 
                                            label={t('ppdb.birth_date')} 
                                            required
                                            validateStatus={errors.birth_date ? 'error' : ''}
                                            help={errors.birth_date}
                                        >
                                            <DatePicker 
                                                style={{ width: '100%' }}
                                                placeholder={t('ppdb.birth_date')}
                                                onChange={(date, dateString) => setData('birth_date', dateString)}
                                            />
                                        </Form.Item>

                                        <Divider orientation="left" style={{ marginTop: 40 }}>
                                            <Space><BookOutlined /> {t('ppdb.education_info')}</Space>
                                        </Divider>

                                        <Form.Item 
                                            label={t('ppdb.previous_school')} 
                                            required
                                            validateStatus={errors.previous_school ? 'error' : ''}
                                            help={errors.previous_school}
                                        >
                                            <Input 
                                                placeholder={t('ppdb.previous_school')}
                                                value={data.previous_school}
                                                onChange={e => setData('previous_school', e.target.value)}
                                                prefix={<BookOutlined style={{ color: '#94a3b8' }} />}
                                            />
                                        </Form.Item>

                                        <Divider orientation="left" style={{ marginTop: 40 }}>
                                            <Space><PhoneOutlined /> {t('ppdb.parent_info')}</Space>
                                        </Divider>

                                        <Form.Item 
                                            label={t('ppdb.parent_name')} 
                                            required
                                            validateStatus={errors.parent_name ? 'error' : ''}
                                            help={errors.parent_name}
                                        >
                                            <Input 
                                                placeholder={t('ppdb.parent_name')}
                                                value={data.parent_name}
                                                onChange={e => setData('parent_name', e.target.value)}
                                                prefix={<UserOutlined style={{ color: '#94a3b8' }} />}
                                            />
                                        </Form.Item>

                                        <Form.Item 
                                            label={t('ppdb.parent_phone')} 
                                            required
                                            validateStatus={errors.parent_phone ? 'error' : ''}
                                            help={errors.parent_phone}
                                        >
                                            <Input 
                                                placeholder="e.g., 081234567890"
                                                value={data.parent_phone}
                                                onChange={e => setData('parent_phone', e.target.value)}
                                                prefix={<PhoneOutlined style={{ color: '#94a3b8' }} />}
                                            />
                                        </Form.Item>

                                        <div style={{ marginTop: 48 }}>
                                            <Button 
                                                type="primary" 
                                                htmlType="submit" 
                                                block 
                                                loading={processing}
                                                style={{ height: 56, fontSize: 18, fontWeight: 700 }}
                                            >
                                                {t('ppdb.submit')}
                                            </Button>
                                        </div>
                                    </Form>
                                </Card>
                            )}
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </ConfigProvider>
    );
}
