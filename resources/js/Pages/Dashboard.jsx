import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, Row, Col, Statistic, Typography, Divider } from 'antd';
import { UserOutlined, BookOutlined, CalendarOutlined, BankOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header="Dashboard Overview"
        >
            <Head title="Dashboard" />

            <div className="py-2">
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card bordered={false} className="shadow-sm">
                            <Statistic
                                title="Total Students"
                                value={1250}
                                prefix={<UserOutlined className="text-slate-400 mr-2" />}
                                valueStyle={{ fontWeight: 700, color: '#0f172a' }}
                            />
                            <div className="mt-2">
                                <Text type="secondary" className="text-xs">
                                    <span className="text-emerald-500 font-bold">+12%</span> from last month
                                </Text>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card bordered={false} className="shadow-sm">
                            <Statistic
                                title="Active Teachers"
                                value={84}
                                prefix={<BookOutlined className="text-slate-400 mr-2" />}
                                valueStyle={{ fontWeight: 700, color: '#0f172a' }}
                            />
                            <div className="mt-2">
                                <Text type="secondary" className="text-xs">
                                    <span className="text-slate-500 font-bold">Full Staff</span>
                                </Text>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card bordered={false} className="shadow-sm">
                            <Statistic
                                title="Today's Attendance"
                                value={98.2}
                                precision={1}
                                suffix="%"
                                prefix={<CalendarOutlined className="text-slate-400 mr-2" />}
                                valueStyle={{ fontWeight: 700, color: '#0f172a' }}
                            />
                            <div className="mt-2">
                                <Text type="secondary" className="text-xs">
                                    <span className="text-emerald-500 font-bold">Above Target</span>
                                </Text>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card bordered={false} className="shadow-sm">
                            <Statistic
                                title="Classes"
                                value={42}
                                prefix={<BankOutlined className="text-slate-400 mr-2" />}
                                valueStyle={{ fontWeight: 700, color: '#0f172a' }}
                            />
                            <div className="mt-2">
                                <Text type="secondary" className="text-xs">
                                    Across 3 Buildings
                                </Text>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[24, 24]} className="mt-6">
                    <Col span={24}>
                        <Card bordered={false} className="shadow-sm">
                            <Title level={4}>Welcome back to Lumina</Title>
                            <Divider className="my-4" />
                            <div className="py-4">
                                <Text type="secondary" size="large">
                                    You are logged into the school management system. Use the sidebar to manage students, staff, and academic workflows.
                                </Text>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </AuthenticatedLayout>
    );
}
