import { Layout, Card, ConfigProvider, theme } from 'antd';
import { Link } from '@inertiajs/react';

const { Content } = Layout;

export default function GuestLayout({ children }) {
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
                <Content style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                    <div style={{ marginBottom: 32, textAlign: 'center' }}>
                        <Link href="/">
                            <div style={{ fontWeight: 900, fontSize: 32, letterSpacing: '-0.05em', color: '#0f172a' }}>
                                LUMINA
                            </div>
                        </Link>
                    </div>

                    <Card 
                        style={{ width: '100%', maxWidth: 400, border: 'none' }} 
                        className="shadow-xl"
                        bodyStyle={{ padding: '32px' }}
                    >
                        {children}
                    </Card>
                </Content>
            </Layout>
        </ConfigProvider>
    );
}
