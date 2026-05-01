import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, Row, Col, Typography } from 'antd';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

const { Title } = Typography;

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header="My Account Profile"
        >
            <Head title="Profile" />

            <div className="py-2">
                <Row gutter={[24, 24]}>
                    <Col span={24}>
                        <Card bordered={false} className="shadow-sm">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </Card>
                    </Col>

                    <Col span={24}>
                        <Card bordered={false} className="shadow-sm">
                            <UpdatePasswordForm />
                        </Card>
                    </Col>

                    <Col span={24}>
                        <Card bordered={false} className="shadow-sm border-red-50" style={{ borderLeft: '4px solid #ef4444' }}>
                            <DeleteUserForm />
                        </Card>
                    </Col>
                </Row>
            </div>
        </AuthenticatedLayout>
    );
}
