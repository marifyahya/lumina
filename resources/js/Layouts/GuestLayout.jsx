import { Layout, Card, ConfigProvider, theme } from 'antd';
import { Link } from '@inertiajs/react';

const { Content } = Layout;

export default function GuestLayout({ children, maxWidth = 400, noCard = false }) {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.defaultAlgorithm,
                token: {
                    colorPrimary: '#0f172a',
                    borderRadius: 12,
                    fontFamily: 'Inter, sans-serif',
                },
            }}
        >
            <Layout style={{ minHeight: '100vh', background: '#f8fafc' }}>
                <Content style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    padding: '24px',
                    width: '100%'
                }}>
                    <div style={{ marginBottom: 32, textAlign: 'center' }}>
                        <Link href="/">
                            <div style={{ fontWeight: 900, fontSize: 32, letterSpacing: '-0.05em', color: '#0f172a' }}>
                                LUMINA
                            </div>
                        </Link>
                    </div>

                    {noCard ? (
                        <div style={{ width: '100%', maxWidth }}>
                            {children}
                        </div>
                    ) : (
                        <Card 
                            style={{ width: '100%', maxWidth, border: 'none' }} 
                            className="shadow-xl"
                            bodyStyle={{ padding: '32px' }}
                        >
                            {children}
                        </Card>
                    )}
                </Content>
            </Layout>
        </ConfigProvider>
    );
}
