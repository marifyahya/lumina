import React, { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown, Space, Avatar, ConfigProvider, theme, Button, Drawer } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    LogoutOutlined,
    DownOutlined,
    SwapOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SettingOutlined,
    CalendarOutlined,
    BookOutlined,
    GlobalOutlined
} from '@ant-design/icons';
import { Link, usePage, router } from '@inertiajs/react';
import useTranslate from '@/hooks/useTranslate';

const { Header, Sider, Content } = Layout;

export default function AuthenticatedLayout({ header, children }) {
    const { t } = useTranslate();
    const { auth, locale } = usePage().props;
    const user = auth.user;
    const roles = user.roles || [];
    const activeRole = auth.active_role || (roles.length > 0 ? roles[0] : null);

    const [collapsed, setCollapsed] = useState(false);
    const [mobileVisible, setMobileVisible] = useState(false);

    const switchRole = (role) => {
        router.post(route('role.switch'), { role }, {
            preserveScroll: true,
        });
    };

    const handleLanguageChange = (lang) => {
        router.post(route('language.switch'), { locale: lang }, {
            preserveScroll: true,
        });
    };

    const userMenuItems = [
        {
            key: 'profile',
            label: <Link href={route('profile.edit')}>{t('common.profile')}</Link>,
            icon: <SettingOutlined />,
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: t('common.logout'),
            icon: <LogoutOutlined />,
            danger: true,
            onClick: () => router.post(route('logout')),
        },
    ];

    const roleMenuItems = roles.map(role => ({
        key: role,
        label: role,
        onClick: () => switchRole(role),
        disabled: role === activeRole,
    }));

    const languageMenuItems = [
        {
            key: 'en',
            label: t('common.english'),
            onClick: () => handleLanguageChange('en'),
            disabled: locale === 'en',
        },
        {
            key: 'id',
            label: t('common.indonesian'),
            onClick: () => handleLanguageChange('id'),
            disabled: locale === 'id',
        },
    ];

    const navItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: <Link href={route('dashboard')}>{t('common.dashboard')}</Link>,
        },
        {
            key: 'academic-years',
            icon: <CalendarOutlined />,
            label: <Link href={route('admin.academic-years.index')}>{t('academic.title')}</Link>,
        },
        {
            key: 'classes',
            icon: <BookOutlined />,
            label: <Link href={route('admin.classes.index')}>{t('class.title')}</Link>,
        },
        {
            key: 'admissions',
            icon: <UserOutlined />,
            label: <Link href={route('admin.admissions.index')}>{t('ppdb.title')}</Link>,
        },
    ];

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.defaultAlgorithm,
                token: {
                    colorPrimary: '#0f172a', // slate-900
                    borderRadius: 8,
                    fontFamily: 'Inter, sans-serif',
                },
                components: {
                    Layout: {
                        headerBg: '#ffffff',
                        siderBg: '#ffffff',
                    },
                    Menu: {
                        itemSelectedBg: '#f1f5f9', // slate-100
                        itemSelectedColor: '#0f172a', // slate-900
                    }
                }
            }}
        >
            <Layout style={{ minHeight: '100vh' }}>
                {/* Desktop Sider */}
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    breakpoint="lg"
                    collapsedWidth="80"
                    onBreakpoint={(broken) => {
                        // Handle breakpoint if needed
                    }}
                    style={{
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        borderRight: '1px solid #f0f0f0',
                        zIndex: 100,
                        background: '#fff'
                    }}
                    className="hidden lg:block"
                    width={260}
                >
                    <div style={{ height: 64, display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: '1px solid #f8fafc' }}>
                        <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.05em', color: '#0f172a' }}>
                            {collapsed ? 'L' : 'LUMINA'}
                        </div>
                    </div>
                    <Menu
                        mode="inline"
                        selectedKeys={[
                            route().current('dashboard') ? 'dashboard' : 
                            route().current('admin.academic-years.*') ? 'academic-years' : 
                            route().current('admin.classes.*') ? 'classes' : 
                            route().current('admin.admissions.*') ? 'admissions' : ''
                        ]}
                        items={navItems}
                        style={{ borderRight: 0, marginTop: 16 }}
                    />
                    
                    {!collapsed && (
                        <div style={{ position: 'absolute', bottom: 0, width: '100%', padding: '16px 24px', borderTop: '1px solid #f8fafc', background: '#fcfcfc' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                                Active Role
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></div>
                                {activeRole}
                            </div>
                        </div>
                    )}
                </Sider>

                {/* Mobile Drawer */}
                <Drawer
                    title="LUMINA"
                    placement="left"
                    onClose={() => setMobileVisible(false)}
                    open={mobileVisible}
                    bodyStyle={{ padding: 0 }}
                    width={260}
                >
                    <Menu
                        mode="inline"
                        selectedKeys={[
                            route().current('dashboard') ? 'dashboard' : 
                            route().current('admin.academic-years.*') ? 'academic-years' : 
                            route().current('admin.classes.*') ? 'classes' : 
                            route().current('admin.admissions.*') ? 'admissions' : ''
                        ]}
                        items={navItems}
                        style={{ borderRight: 0 }}
                    />
                </Drawer>

                <Layout 
                    className="site-layout transition-all" 
                    style={{ 
                        marginLeft: collapsed ? 80 : 260, 
                        transition: 'all 0.2s', 
                        display: 'flex', 
                        flexDirection: 'column',
                        minHeight: '100vh'
                    }}
                >
                    <Header style={{ padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, zIndex: 99 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => {
                                    if (window.innerWidth < 1024) {
                                        setMobileVisible(true);
                                    } else {
                                        setCollapsed(!collapsed);
                                    }
                                }}
                                style={{ fontSize: '16px', width: 40, height: 40 }}
                            />
                            {header && (
                                <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>
                                    {header}
                                </div>
                            )}
                        </div>

                        <Space size="large">
                            <Dropdown menu={{ items: languageMenuItems }} trigger={['click']}>
                                <Button size="small" type="text" style={{ fontSize: 12, fontWeight: 600 }}>
                                    <Space>
                                        <GlobalOutlined style={{ fontSize: 14 }} />
                                        {locale === 'en' ? 'EN' : 'ID'}
                                    </Space>
                                </Button>
                            </Dropdown>

                            {roles.length > 1 && (
                                <Dropdown menu={{ items: roleMenuItems }} trigger={['click']}>
                                    <Button size="small" style={{ fontSize: 11, fontWeight: 700, borderRadius: 6 }}>
                                        <Space>
                                            <span style={{ color: '#64748b' }}>ROLE:</span>
                                            {activeRole.toUpperCase()}
                                            <DownOutlined style={{ fontSize: 10 }} />
                                        </Space>
                                    </Button>
                                </Dropdown>
                            )}

                            <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
                                <Space style={{ cursor: 'pointer' }}>
                                    <Avatar 
                                        size="small" 
                                        style={{ backgroundColor: '#f1f5f9', color: '#64748b', fontWeight: 700, fontSize: 12 }}
                                    >
                                        {user.name.charAt(0)}
                                    </Avatar>
                                    <span style={{ fontWeight: 600, fontSize: 14, color: '#334155' }} className="hidden sm:inline">
                                        {user.name}
                                    </span>
                                </Space>
                            </Dropdown>
                        </Space>
                    </Header>

                    <Content style={{ margin: '24px', minHeight: 280 }}>
                        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                            {children}
                        </div>
                    </Content>
                </Layout>
            </Layout>

            <style dangerouslySetInnerHTML={{ __html: `
                .ant-layout-sider {
                    position: fixed !important;
                }
                @media (max-width: 1023px) {
                    .site-layout {
                        margin-left: 0 !important;
                    }
                }
            ` }} />
        </ConfigProvider>
    );
}
