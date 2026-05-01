import React, { useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { Button, Typography, Card, Space, Alert } from 'antd';
import { 
    TeamOutlined, 
    SolutionOutlined,
    ArrowRightOutlined,
    InfoCircleOutlined 
} from '@ant-design/icons';

import useTranslate from '@/hooks/useTranslate';

const { Title, Text, Paragraph } = Typography;

export default function Register() {
    const { t } = useTranslate();
    const [regType, setRegType] = useState('Student');

    return (
        <GuestLayout>
            <Head title={t('auth.create_account')} />

            <div style={{ marginBottom: 32, textAlign: 'center' }}>
                <Title level={3} style={{ margin: 0, fontWeight: 900, letterSpacing: -1 }}>{t('auth.create_account')}</Title>
                <Text type="secondary">{t('auth.select_type')}</Text>
            </div>

            <Space direction="vertical" size="middle" style={{ width: '100%', marginBottom: 32 }}>
                {/* Prospective Student Card */}
                <Card 
                    hoverable 
                    onClick={() => setRegType('Student')}
                    style={{ 
                        borderRadius: 16, 
                        border: regType === 'Student' ? '2px solid #0f172a' : '2px solid #f1f5f9',
                        background: regType === 'Student' ? '#f8fafc' : '#fff',
                        transition: 'all 0.2s'
                    }}
                >
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        <div style={{ 
                            width: 48, 
                            height: 48, 
                            background: regType === 'Student' ? '#0f172a' : '#f1f5f9', 
                            borderRadius: 12, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            color: regType === 'Student' ? '#fff' : '#64748b',
                            fontSize: 20
                        }}>
                            <TeamOutlined />
                        </div>
                        <div style={{ flex: 1 }}>
                            <Title level={5} style={{ margin: 0 }}>{t('auth.student_title')}</Title>
                            <Text type="secondary" style={{ fontSize: 13 }}>{t('auth.student_desc')}</Text>
                        </div>
                        {regType === 'Student' && <ArrowRightOutlined style={{ color: '#0f172a' }} />}
                    </div>
                </Card>

                {/* Staff / Teacher Card */}
                <Card 
                    hoverable 
                    onClick={() => setRegType('Staff')}
                    style={{ 
                        borderRadius: 16, 
                        border: regType === 'Staff' ? '2px solid #0f172a' : '2px solid #f1f5f9',
                        background: regType === 'Staff' ? '#f8fafc' : '#fff',
                        transition: 'all 0.2s'
                    }}
                >
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        <div style={{ 
                            width: 48, 
                            height: 48, 
                            background: regType === 'Staff' ? '#0f172a' : '#f1f5f9', 
                            borderRadius: 12, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            color: regType === 'Staff' ? '#fff' : '#64748b',
                            fontSize: 20
                        }}>
                            <SolutionOutlined />
                        </div>
                        <div style={{ flex: 1 }}>
                            <Title level={5} style={{ margin: 0 }}>{t('auth.staff_title')}</Title>
                            <Text type="secondary" style={{ fontSize: 13 }}>{t('auth.staff_desc')}</Text>
                        </div>
                        {regType === 'Staff' && <ArrowRightOutlined style={{ color: '#0f172a' }} />}
                    </div>
                </Card>
            </Space>

            <div style={{ marginBottom: 32 }}>
                {regType === 'Student' ? (
                    <div style={{ textAlign: 'center' }}>
                        <Alert
                            message={t('auth.ppdb_notice_title')}
                            description={t('auth.ppdb_notice_desc')}
                            type="success"
                            showIcon
                            icon={<InfoCircleOutlined />}
                            style={{ borderRadius: 12, marginBottom: 24, textAlign: 'left' }}
                        />
                        <Link href="#">
                            <Button type="primary" size="large" block style={{ fontWeight: 700, height: 54, borderRadius: 12 }}>
                                {t('auth.proceed_ppdb')}
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <Alert
                        message={t('auth.staff_notice_title')}
                        description={t('auth.staff_notice_desc')}
                        type="info"
                        showIcon
                        style={{ borderRadius: 12 }}
                    />
                )}
            </div>

            <div style={{ textAlign: 'center' }}>
                <Text type="secondary" className="text-sm">
                    {t('auth.already_have_account')} <Link href={route('login')} className="font-bold text-slate-900">{t('auth.sign_in')}</Link>
                </Text>
            </div>
        </GuestLayout>
    );
}
