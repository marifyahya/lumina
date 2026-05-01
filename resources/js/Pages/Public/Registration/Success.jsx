import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Layout, Button, Typography, Result, Card, Space, ConfigProvider, Descriptions, Tag } from 'antd';
import { 
    CheckCircleFilled,
    HomeOutlined,
    PrinterOutlined
} from '@ant-design/icons';
import useTranslate from '@/hooks/useTranslate';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function Success({ registration }) {
    const { t } = useTranslate();

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
                <Head title={t('ppdb.success_title')} />
                
                <Content style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card 
                        bordered={false} 
                        className="shadow-sm" 
                        style={{ borderRadius: 32, maxWidth: 600, width: '100%', textAlign: 'center' }}
                    >
                        <Result
                            status="success"
                            title={<Title level={2} style={{ fontWeight: 800 }}>{t('ppdb.success_title')}</Title>}
                            subTitle={<Text type="secondary" style={{ fontSize: 16 }}>{t('ppdb.success_subtitle')}</Text>}
                            extra={[
                                <Link href="/" key="home">
                                    <Button type="primary" size="large" icon={<HomeOutlined />} style={{ height: 48, padding: '0 32px' }}>
                                        {t('ppdb.back_home')}
                                    </Button>
                                </Link>,
                                <Button key="print" size="large" icon={<PrinterOutlined />} onClick={() => window.print()} style={{ height: 48 }}>
                                    {t('common.print') || 'Print'}
                                </Button>
                            ]}
                        />

                        <div style={{ padding: '0 20px 20px' }}>
                            <Card 
                                background="#f1f5f9" 
                                style={{ background: '#f1f5f9', border: 'none', borderRadius: 16, textAlign: 'left' }}
                                bodyStyle={{ padding: 24 }}
                            >
                                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                    <Text type="secondary" style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
                                        {t('ppdb.reg_number')}
                                    </Text>
                                    <Title level={3} style={{ margin: 0, letterSpacing: 2 }}>{registration.registration_number}</Title>
                                </Space>
                                
                                <Divider style={{ margin: '16px 0' }} />
                                
                                <Descriptions column={1} size="small">
                                    <Descriptions.Item label={t('ppdb.full_name')}>{registration.full_name}</Descriptions.Item>
                                    <Descriptions.Item label={t('ppdb.birth_date')}>{registration.birth_date}</Descriptions.Item>
                                    <Descriptions.Item label={t('common.status')}>
                                        <Tag color="orange">{registration.status.toUpperCase()}</Tag>
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>

                            <Paragraph style={{ marginTop: 24, color: '#64748b' }}>
                                {t('ppdb.save_notice')}
                            </Paragraph>
                        </div>
                    </Card>
                </Content>
            </Layout>
        </ConfigProvider>
    );
}

const Divider = ({ style }) => <div style={{ height: '1px', background: '#e2e8f0', width: '100%', ...style }} />;
