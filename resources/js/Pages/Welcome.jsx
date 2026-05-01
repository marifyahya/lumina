import { Head, Link } from '@inertiajs/react';
import { Layout, Button, Typography, Row, Col, Card, Space, ConfigProvider } from 'antd';
import { 
    DashboardOutlined, 
    TeamOutlined, 
    BookOutlined, 
    SafetyCertificateOutlined,
    LoginOutlined,
    UserAddOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function Welcome({ auth }) {
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
                        {auth.user ? (
                            <Link href={route('dashboard')}>
                                <Button type="primary" size="large" icon={<DashboardOutlined />}>
                                    Go to Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <Space>
                                <Link href={route('login')}>
                                    <Button type="text" size="large" icon={<LoginOutlined />}>
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href={route('register')}>
                                    <Button type="primary" size="large" icon={<UserAddOutlined />}>
                                        Get Started
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
                                    The Intelligent Hub for <span style={{ color: '#64748b' }}>Modern Schools</span>
                                </Title>
                                <Paragraph style={{ fontSize: 20, color: '#475569', marginBottom: 40, maxWidth: 800, margin: '0 auto 40px' }}>
                                    Lumina streamlines administration, empowers teachers, and engages parents. 
                                    A complete ecosystem designed to elevate the educational experience.
                                </Paragraph>
                                <Space size="middle">
                                    <Link href={route('register')}>
                                        <Button type="primary" size="large" style={{ height: 56, padding: '0 40px', fontSize: 18, fontWeight: 700 }}>
                                            Start Free Trial
                                        </Button>
                                    </Link>
                                    <Button size="large" style={{ height: 56, padding: '0 40px', fontSize: 18 }}>
                                        Book a Demo
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                    </div>

                    {/* Features Section */}
                    <div style={{ padding: '100px 50px', maxWidth: 1200, margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: 64 }}>
                            <Title level={2} style={{ fontWeight: 800 }}>Complete School Management</Title>
                            <Text type="secondary" style={{ fontSize: 18 }}>Everything you need to run your institution efficiently</Text>
                        </div>
                        
                        <Row gutter={[32, 32]}>
                            <Col xs={24} md={12} lg={8}>
                                <Card bordered={false} className="shadow-sm" style={{ height: '100%', textAlign: 'center' }}>
                                    <div style={{ fontSize: 40, color: '#0f172a', marginBottom: 24 }}><TeamOutlined /></div>
                                    <Title level={4}>Student Information</Title>
                                    <Paragraph type="secondary">
                                        Comprehensive student profiles, attendance tracking, and performance analytics at your fingertips.
                                    </Paragraph>
                                </Card>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Card bordered={false} className="shadow-sm" style={{ height: '100%', textAlign: 'center' }}>
                                    <div style={{ fontSize: 40, color: '#0f172a', marginBottom: 24 }}><BookOutlined /></div>
                                    <Title level={4}>Curriculum & Grading</Title>
                                    <Paragraph type="secondary">
                                        Manage courses, lesson plans, and automated grading systems with ease and precision.
                                    </Paragraph>
                                </Card>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Card bordered={false} className="shadow-sm" style={{ height: '100%', textAlign: 'center' }}>
                                    <div style={{ fontSize: 40, color: '#0f172a', marginBottom: 24 }}><SafetyCertificateOutlined /></div>
                                    <Title level={4}>Secure & Reliable</Title>
                                    <Paragraph type="secondary">
                                        Enterprise-grade security ensuring your data is protected and accessible whenever you need it.
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
                        <Title level={2} style={{ color: '#fff', marginBottom: 24 }}>Ready to transform your school?</Title>
                        <Paragraph style={{ color: '#94a3b8', fontSize: 18, marginBottom: 40 }}>
                            Join hundreds of institutions already using Lumina to power their growth.
                        </Paragraph>
                        <Link href={route('register')}>
                            <Button type="primary" size="large" style={{ background: '#fff', color: '#0f172a', border: 'none', height: 50, padding: '0 32px', fontWeight: 700 }}>
                                Create Your Account Now
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
