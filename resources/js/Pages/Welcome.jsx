import { Head, Link, usePage, router } from '@inertiajs/react';
import { Layout, Button, Typography, Row, Col, Card, Space, ConfigProvider, Dropdown } from 'antd';
import { 
    DashboardOutlined, 
    TeamOutlined, 
    BookOutlined, 
    SafetyCertificateOutlined,
    LoginOutlined,
    UserAddOutlined,
    GlobalOutlined
} from '@ant-design/icons';
import useTranslate from '@/hooks/useTranslate';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function Welcome({ auth }) {
    const { t } = useTranslate();
    const { locale } = usePage().props;

    const handleLanguageChange = (lang) => {
        router.post(route('language.switch'), { locale: lang }, {
            preserveScroll: true,
        });
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
            <Layout style={{ minHeight: '100vh', background: '#fff' }}>
                <Head title="Welcome to Lumina" />
                
                <Header style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    background: '#fff',
                    padding: '0 50px',
                    height: 80,
                    borderBottom: '1px solid #f0f0f0',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    width: '100%'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ 
                            width: 40, 
                            height: 40, 
                            background: '#0f172a', 
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontWeight: 900,
                            fontSize: 20
                        }}>L</div>
                        <Title level={3} style={{ margin: 0, fontWeight: 800, letterSpacing: -1 }}>Lumina</Title>
                    </div>
                    
                    <Space size="large">
                        <Dropdown 
                            menu={{ 
                                items: [
                                    { key: 'en', label: t('common.english') },
                                    { key: 'id', label: t('common.indonesian') }
                                ],
                                onClick: ({ key }) => handleLanguageChange(key)
                            }} 
                            trigger={['click']}
                        >
                            <Button type="text" size="large" icon={<GlobalOutlined />}>
                                {locale === 'id' ? 'ID' : 'EN'}
                            </Button>
                        </Dropdown>

                        {auth.user ? (
                            <Link href={route('dashboard')}>
                                <Button type="primary" size="large" icon={<DashboardOutlined />}>
                                    {t('common.dashboard')}
                                </Button>
                            </Link>
                        ) : (
                            <Space>
                                <Link href={route('login')}>
                                    <Button type="text" size="large" icon={<LoginOutlined />}>
                                        {t('common.sign_in')}
                                    </Button>
                                </Link>
                                <Link href={route('register')}>
                                    <Button type="primary" size="large" icon={<UserAddOutlined />}>
                                        {t('auth.ppdb_notice_title')}
                                    </Button>
                                </Link>
                            </Space>
                        )}
                    </Space>
                </Header>

                <Content>
                    {/* Hero Section */}
                    <div style={{ 
                        padding: '100px 50px', 
                        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                        textAlign: 'center'
                    }}>
                        <Row justify="center">
                            <Col span={24} lg={16}>
                                <Title style={{ fontSize: 56, fontWeight: 900, marginBottom: 24, letterSpacing: -2 }}>
                                    {t('landing.hero_title')} <span style={{ color: '#64748b' }}>{t('landing.hero_subtitle')}</span>
                                </Title>
                                <Paragraph style={{ fontSize: 20, color: '#475569', marginBottom: 40, maxWidth: 800, margin: '0 auto 40px' }}>
                                    {t('landing.hero_desc')}
                                </Paragraph>
                                <Space size="middle">
                                    <Link href={route('register')}>
                                        <Button type="primary" size="large" style={{ height: 56, padding: '0 40px', fontSize: 18, fontWeight: 700 }}>
                                            {t('landing.apply_admission')}
                                        </Button>
                                    </Link>
                                    <Button size="large" style={{ height: 56, padding: '0 40px', fontSize: 18 }}>
                                        {t('landing.book_demo')}
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                    </div>

                    {/* Features Section */}
                    <div style={{ padding: '100px 50px', maxWidth: 1200, margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: 64 }}>
                            <Title level={2} style={{ fontWeight: 800 }}>{t('landing.features_title')}</Title>
                            <Text type="secondary" style={{ fontSize: 18 }}>{t('landing.features_subtitle')}</Text>
                        </div>
                        
                        <Row gutter={[32, 32]}>
                            <Col xs={24} md={12} lg={8}>
                                <Card bordered={false} className="shadow-sm" style={{ height: '100%', textAlign: 'center' }}>
                                    <div style={{ fontSize: 40, color: '#0f172a', marginBottom: 24 }}><TeamOutlined /></div>
                                    <Title level={4}>{t('landing.feat_student_title')}</Title>
                                    <Paragraph type="secondary">
                                        {t('landing.feat_student_desc')}
                                    </Paragraph>
                                </Card>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Card bordered={false} className="shadow-sm" style={{ height: '100%', textAlign: 'center' }}>
                                    <div style={{ fontSize: 40, color: '#0f172a', marginBottom: 24 }}><BookOutlined /></div>
                                    <Title level={4}>{t('landing.feat_curriculum_title')}</Title>
                                    <Paragraph type="secondary">
                                        {t('landing.feat_curriculum_desc')}
                                    </Paragraph>
                                </Card>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Card bordered={false} className="shadow-sm" style={{ height: '100%', textAlign: 'center' }}>
                                    <div style={{ fontSize: 40, color: '#0f172a', marginBottom: 24 }}><SafetyCertificateOutlined /></div>
                                    <Title level={4}>{t('landing.feat_secure_title')}</Title>
                                    <Paragraph type="secondary">
                                        {t('landing.feat_secure_desc')}
                                    </Paragraph>
                                </Card>
                            </Col>
                        </Row>
                    </div>

                    {/* CTA Section */}
                    <div style={{ 
                        padding: '80px 50px', 
                        background: '#0f172a', 
                        textAlign: 'center',
                        color: '#fff'
                    }}>
                        <Title level={2} style={{ color: '#fff', marginBottom: 24 }}>{t('landing.cta_title')}</Title>
                        <Paragraph style={{ color: '#94a3b8', fontSize: 18, marginBottom: 40 }}>
                            {t('landing.cta_desc')}
                        </Paragraph>
                        <Link href={route('register')}>
                            <Button type="primary" size="large" style={{ background: '#fff', color: '#0f172a', border: 'none', height: 50, padding: '0 32px', fontWeight: 700 }}>
                                {t('landing.cta_button')}
                            </Button>
                        </Link>
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center', background: '#fff', borderTop: '1px solid #f0f0f0', padding: '40px 50px' }}>
                    <div style={{ marginBottom: 16 }}>
                        <Title level={4} style={{ margin: 0, fontWeight: 800 }}>Lumina</Title>
                    </div>
                    <Text type="secondary">©{new Date().getFullYear()} Lumina School Management System. All rights reserved.</Text>
                </Footer>
            </Layout>
        </ConfigProvider>
    );
}
