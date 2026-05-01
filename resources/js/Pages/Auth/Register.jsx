import React, { useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Button, 
    Typography, 
    Card, 
    Space, 
    Alert, 
    Steps, 
    Form, 
    Input, 
    Select, 
    DatePicker, 
    Row, 
    Col, 
    Divider, 
    Checkbox,
    Upload
} from 'antd';
import { 
    TeamOutlined, 
    SolutionOutlined,
    ArrowRightOutlined,
    InfoCircleOutlined,
    UserOutlined,
    HomeOutlined,
    BookOutlined,
    PhoneOutlined,
    FileProtectOutlined,
    UploadOutlined,
    CheckCircleOutlined,
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';

import useTranslate from '@/hooks/useTranslate';

const { Title, Text, Paragraph } = Typography;

export default function Register({ activeYear }) {
    const { t } = useTranslate();
    const [regType, setRegType] = useState(null); // null, 'Student', 'Staff'
    const [currentStep, setCurrentStep] = useState(0);

    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        gender: '',
        place_birth: '',
        birth_date: null,
        religion: '',
        nisn: '',
        nik: '',
        kk_number: '',
        address_full: '',
        rt: '',
        rw: '',
        village: '',
        district: '',
        city: '',
        previous_school: '',
        grades: '',
        achievements: '',
        father_name: '',
        father_job: '',
        mother_name: '',
        mother_job: '',
        parent_education: '',
        parent_phone: '',
        path: '',
        declaration: false,
    });

    const steps = [
        { title: t('ppdb.step_identity'), icon: <UserOutlined /> },
        { title: t('ppdb.step_address'), icon: <HomeOutlined /> },
        { title: t('ppdb.step_school'), icon: <BookOutlined /> },
        { title: t('ppdb.step_parent'), icon: <TeamOutlined /> },
        { title: t('ppdb.step_path'), icon: <FileProtectOutlined /> },
    ];

    const next = () => setCurrentStep(currentStep + 1);
    const prev = () => setCurrentStep(currentStep - 1);

    const handleSubmit = () => {
        post(route('register.student.store'));
    };

    const renderSelection = () => (
        <div style={{ width: '100%' }}>
            <div style={{ marginBottom: 32, textAlign: 'center' }}>
                <Title level={3} style={{ margin: 0, fontWeight: 900, letterSpacing: -1 }}>{t('auth.create_account')}</Title>
                <Text type="secondary">{t('auth.select_type')}</Text>
            </div>

            <Space direction="vertical" size="middle" style={{ width: '100%', marginBottom: 32 }}>
                <Card 
                    hoverable 
                    onClick={() => setRegType('Student')}
                    style={{ 
                        borderRadius: 16, 
                        border: '2px solid #f1f5f9',
                        transition: 'all 0.2s'
                    }}
                    bodyStyle={{ padding: '24px' }}
                >
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        <div style={{ 
                            width: 48, 
                            height: 48, 
                            background: '#0f172a', 
                            borderRadius: 12, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            color: '#fff',
                            fontSize: 20
                        }}>
                            <TeamOutlined />
                        </div>
                        <div style={{ flex: 1 }}>
                            <Title level={5} style={{ margin: 0 }}>{t('auth.student_title')}</Title>
                            <Text type="secondary" style={{ fontSize: 13 }}>{t('auth.student_desc')}</Text>
                        </div>
                        <ArrowRightOutlined style={{ color: '#0f172a' }} />
                    </div>
                </Card>

                <Card 
                    hoverable 
                    onClick={() => setRegType('Staff')}
                    style={{ 
                        borderRadius: 16, 
                        border: '2px solid #f1f5f9',
                        transition: 'all 0.2s'
                    }}
                    bodyStyle={{ padding: '24px' }}
                >
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        <div style={{ 
                            width: 48, 
                            height: 48, 
                            background: '#f1f5f9', 
                            borderRadius: 12, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            color: '#64748b',
                            fontSize: 20
                        }}>
                            <SolutionOutlined />
                        </div>
                        <div style={{ flex: 1 }}>
                            <Title level={5} style={{ margin: 0 }}>{t('auth.staff_title')}</Title>
                            <Text type="secondary" style={{ fontSize: 13 }}>{t('auth.staff_desc')}</Text>
                        </div>
                        <ArrowRightOutlined style={{ color: '#0f172a' }} />
                    </div>
                </Card>
            </Space>

            <div style={{ textAlign: 'center' }}>
                <Text type="secondary" className="text-sm">
                    {t('auth.already_have_account')} <Link href={route('login')} className="font-bold text-slate-900">{t('auth.sign_in')}</Link>
                </Text>
            </div>
        </div>
    );

    const renderStaffNotice = () => (
        <div style={{ width: '100%' }}>
             <Button type="text" onClick={() => setRegType(null)} icon={<LeftOutlined />}>
                {t('common.back') || 'Back'}
            </Button>
            <div style={{ marginTop: 24 }}>
                <Alert
                    message={t('auth.staff_notice_title')}
                    description={t('auth.staff_notice_desc')}
                    type="info"
                    showIcon
                    style={{ borderRadius: 12 }}
                />
            </div>
        </div>
    );

    const renderStudentForm = () => (
        <div style={{ width: '100%' }}>
            <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button type="text" onClick={() => setRegType(null)} icon={<LeftOutlined />}>
                    {t('common.back') || 'Back'}
                </Button>
                <div style={{ textAlign: 'center' }}>
                    <Title level={3} style={{ margin: 0, fontWeight: 900 }}>{t('ppdb.title')}</Title>
                    {activeYear && <Text type="secondary">{t('ppdb.subtitle')} {activeYear.year}</Text>}
                </div>
                <div style={{ width: 80 }}></div> {/* spacer */}
            </div>

            {!activeYear ? (
                <Alert
                    message={t('ppdb.closed')}
                    description={t('ppdb.closed_desc')}
                    type="error"
                    showIcon
                    style={{ borderRadius: 16 }}
                />
            ) : (
                <>
                    <Steps 
                        current={currentStep} 
                        style={{ marginBottom: 40 }}
                        items={steps}
                    />

                    <Card bordered={false} style={{ borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <Form layout="vertical" size="large" onFinish={handleSubmit}>
                    {currentStep === 0 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Divider orientation="left">{t('ppdb.personal_info')}</Divider>
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
                                    prefix={<UserOutlined style={{color: '#94a3b8'}}/>} 
                                />
                            </Form.Item>
                            <Row gutter={16}>
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
                                            options={[{value: 'M', label: t('ppdb.male')}, {value: 'F', label: t('ppdb.female')}]} 
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item 
                                        label={t('ppdb.religion')} 
                                        required
                                        validateStatus={errors.religion ? 'error' : ''}
                                        help={errors.religion}
                                    >
                                        <Select 
                                            placeholder={t('ppdb.religion')} 
                                            value={data.religion}
                                            onChange={val => setData('religion', val)}
                                            options={['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Khonghucu'].map(v => ({value: v, label: v}))} 
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item 
                                        label={t('ppdb.place_birth')} 
                                        required
                                        validateStatus={errors.place_birth ? 'error' : ''}
                                        help={errors.place_birth}
                                    >
                                        <Input 
                                            placeholder={t('ppdb.place_birth')} 
                                            value={data.place_birth}
                                            onChange={e => setData('place_birth', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item 
                                        label={t('ppdb.birth_date')} 
                                        required
                                        validateStatus={errors.birth_date ? 'error' : ''}
                                        help={errors.birth_date}
                                    >
                                        <DatePicker 
                                            style={{ width: '100%' }} 
                                            onChange={(date, dateString) => setData('birth_date', dateString)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item 
                                label={t('ppdb.nisn')} 
                                required
                                validateStatus={errors.nisn ? 'error' : ''}
                                help={errors.nisn}
                            >
                                <Input 
                                    placeholder="10 Digit NISN" 
                                    maxLength={10} 
                                    value={data.nisn}
                                    onChange={e => setData('nisn', e.target.value)}
                                />
                            </Form.Item>
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item 
                                        label={t('ppdb.nik')} 
                                        required
                                        validateStatus={errors.nik ? 'error' : ''}
                                        help={errors.nik}
                                    >
                                        <Input 
                                            placeholder="16 Digit NIK" 
                                            maxLength={16} 
                                            value={data.nik}
                                            onChange={e => setData('nik', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item 
                                        label={t('ppdb.kk_number')} 
                                        required
                                        validateStatus={errors.kk_number ? 'error' : ''}
                                        help={errors.kk_number}
                                    >
                                        <Input 
                                            placeholder="16 Digit Nomor KK" 
                                            maxLength={16} 
                                            value={data.kk_number}
                                            onChange={e => setData('kk_number', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <Divider orientation="left">{t('ppdb.address_info')}</Divider>
                            <Form.Item 
                                label={t('ppdb.address_full')} 
                                required
                                validateStatus={errors.address_full ? 'error' : ''}
                                help={errors.address_full}
                            >
                                <Input.TextArea 
                                    rows={3} 
                                    placeholder={t('ppdb.address_full')} 
                                    value={data.address_full}
                                    onChange={e => setData('address_full', e.target.value)}
                                />
                            </Form.Item>
                            <Row gutter={16}>
                                <Col xs={12} md={6}>
                                    <Form.Item 
                                        label={t('ppdb.rt')} 
                                        required
                                        validateStatus={errors.rt ? 'error' : ''}
                                        help={errors.rt}
                                    >
                                        <Input 
                                            placeholder="000" 
                                            value={data.rt}
                                            onChange={e => setData('rt', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Item 
                                        label={t('ppdb.rw')} 
                                        required
                                        validateStatus={errors.rw ? 'error' : ''}
                                        help={errors.rw}
                                    >
                                        <Input 
                                            placeholder="000" 
                                            value={data.rw}
                                            onChange={e => setData('rw', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item 
                                        label={t('ppdb.village')} 
                                        required
                                        validateStatus={errors.village ? 'error' : ''}
                                        help={errors.village}
                                    >
                                        <Input 
                                            placeholder={t('ppdb.village')} 
                                            value={data.village}
                                            onChange={e => setData('village', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item 
                                        label={t('ppdb.district')} 
                                        required
                                        validateStatus={errors.district ? 'error' : ''}
                                        help={errors.district}
                                    >
                                        <Input 
                                            placeholder={t('ppdb.district')} 
                                            value={data.district}
                                            onChange={e => setData('district', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Item 
                                        label={t('ppdb.city')} 
                                        required
                                        validateStatus={errors.city ? 'error' : ''}
                                        help={errors.city}
                                    >
                                        <Input 
                                            placeholder={t('ppdb.city')} 
                                            value={data.city}
                                            onChange={e => setData('city', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Item 
                                        label={t('ppdb.postal_code')} 
                                        validateStatus={errors.postal_code ? 'error' : ''}
                                        help={errors.postal_code}
                                    >
                                        <Input 
                                            placeholder="12345" 
                                            maxLength={5}
                                            value={data.postal_code}
                                            onChange={e => setData('postal_code', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <Divider orientation="left">{t('ppdb.school_info')}</Divider>
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
                                    prefix={<BookOutlined style={{color: '#94a3b8'}}/>} 
                                />
                            </Form.Item>
                            <Form.Item 
                                label={t('ppdb.grades')}
                                validateStatus={errors.grades ? 'error' : ''}
                                help={errors.grades}
                            >
                                <Input 
                                    placeholder="Nilai Rapor / Ijazah" 
                                    value={data.grades}
                                    onChange={e => setData('grades', e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item 
                                label={t('ppdb.achievements')}
                                validateStatus={errors.achievements ? 'error' : ''}
                                help={errors.achievements}
                            >
                                <Input.TextArea 
                                    rows={3} 
                                    placeholder="Sebutkan prestasi atau sertifikat yang dimiliki (jika ada)" 
                                    value={data.achievements}
                                    onChange={e => setData('achievements', e.target.value)}
                                />
                            </Form.Item>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <Divider orientation="left">{t('ppdb.parent_info')}</Divider>
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item 
                                        label={t('ppdb.father_name')} 
                                        required
                                        validateStatus={errors.father_name ? 'error' : ''}
                                        help={errors.father_name}
                                    >
                                        <Input 
                                            placeholder={t('ppdb.father_name')} 
                                            value={data.father_name}
                                            onChange={e => setData('father_name', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item 
                                        label={t('ppdb.mother_name')} 
                                        required
                                        validateStatus={errors.mother_name ? 'error' : ''}
                                        help={errors.mother_name}
                                    >
                                        <Input 
                                            placeholder={t('ppdb.mother_name')} 
                                            value={data.mother_name}
                                            onChange={e => setData('mother_name', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item 
                                        label={t('ppdb.father_job')}
                                        validateStatus={errors.father_job ? 'error' : ''}
                                        help={errors.father_job}
                                    >
                                        <Input 
                                            placeholder={t('ppdb.father_job')} 
                                            value={data.father_job}
                                            onChange={e => setData('father_job', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item 
                                        label={t('ppdb.mother_job')}
                                        validateStatus={errors.mother_job ? 'error' : ''}
                                        help={errors.mother_job}
                                    >
                                        <Input 
                                            placeholder={t('ppdb.mother_job')} 
                                            value={data.mother_job}
                                            onChange={e => setData('mother_job', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item 
                                label={t('ppdb.parent_education')}
                                validateStatus={errors.parent_education ? 'error' : ''}
                                help={errors.parent_education}
                            >
                                <Select 
                                    placeholder={t('ppdb.parent_education')} 
                                    value={data.parent_education}
                                    onChange={val => setData('parent_education', val)}
                                    options={['SD', 'SMP', 'SMA/SMK', 'D3', 'S1', 'S2', 'S3'].map(v => ({value: v, label: v}))} 
                                />
                            </Form.Item>
                            <Form.Item 
                                label={t('ppdb.parent_phone')} 
                                required
                                validateStatus={errors.parent_phone ? 'error' : ''}
                                help={errors.parent_phone}
                            >
                                <Input 
                                    placeholder="08xxxxxxxxxx" 
                                    value={data.parent_phone}
                                    onChange={e => setData('parent_phone', e.target.value)}
                                    prefix={<PhoneOutlined style={{color: '#94a3b8'}}/>} 
                                />
                            </Form.Item>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <Divider orientation="left">{t('ppdb.path_info')}</Divider>
                            <Form.Item 
                                label={t('ppdb.path_select')} 
                                required
                                validateStatus={errors.path ? 'error' : ''}
                                help={errors.path}
                            >
                                <Select 
                                    placeholder={t('ppdb.path_select')}
                                    value={data.path}
                                    onChange={val => setData('path', val)}
                                    options={[
                                        { value: 'domicile', label: t('ppdb.path_domicile') },
                                        { value: 'affirmation', label: t('ppdb.path_affirmation') },
                                        { value: 'mutation', label: t('ppdb.path_mutation') },
                                        { value: 'achievement', label: t('ppdb.path_achievement') },
                                    ]} 
                                />
                            </Form.Item>

                            <Divider orientation="left" style={{ marginTop: 40 }}>{t('ppdb.docs_info')}</Divider>
                            <Row gutter={[16, 16]}>
                                {[
                                    { label: t('ppdb.doc_birth_cert'), key: 'birth_cert' },
                                    { label: t('ppdb.doc_kk'), key: 'kk' },
                                    { label: t('ppdb.doc_ijazah'), key: 'ijazah' },
                                    { label: t('ppdb.doc_photo'), key: 'photo' },
                                    { label: t('ppdb.doc_report'), key: 'report' },
                                ].map(doc => (
                                    <Col xs={24} sm={12} key={doc.key}>
                                        <Card size="small" style={{ background: '#f8fafc', borderRadius: 12 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text strong style={{ fontSize: 13 }}>{doc.label}</Text>
                                                <Upload 
                                                    maxCount={1}
                                                    beforeUpload={(file) => {
                                                        setData(`doc_${doc.key}`, file);
                                                        return false;
                                                    }}
                                                >
                                                    <Button size="small" icon={<UploadOutlined />}>Upload</Button>
                                                </Upload>
                                            </div>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                            <div style={{ marginTop: 40, padding: 20, background: '#fffbeb', borderRadius: 16, border: '1px solid #fef3c7' }}>
                                <Checkbox 
                                    checked={data.declaration}
                                    onChange={e => setData('declaration', e.target.checked)}
                                >
                                    <Text style={{ fontSize: 13 }}>{t('ppdb.declaration')}</Text>
                                </Checkbox>
                                {errors.declaration && <div style={{ color: '#ff4d4f', fontSize: 12, marginTop: 4 }}>{errors.declaration}</div>}
                            </div>
                        </div>
                    )}

                    <div style={{ marginTop: 48, display: 'flex', justifyContent: 'space-between' }}>
                        {currentStep > 0 && (
                            <Button size="large" onClick={prev} icon={<LeftOutlined />}>
                                {t('ppdb.prev')}
                            </Button>
                        )}
                        <div style={{ flex: 1 }}></div>
                        {currentStep < steps.length - 1 ? (
                            <Button type="primary" size="large" onClick={next} icon={<RightOutlined />}>
                                {t('ppdb.next')}
                            </Button>
                        ) : (
                            <Button 
                                type="primary" 
                                size="large" 
                                onClick={handleSubmit}
                                loading={processing}
                                icon={<CheckCircleOutlined />} 
                                style={{ background: '#10b981', borderColor: '#10b981' }}
                            >
                                {t('ppdb.submit')}
                            </Button>
                        )}
                    </div>
                </Form>
            </Card>
            </>
            )}
        </div>
    );

    return (
        <GuestLayout maxWidth={regType === 'Student' ? 900 : 500} noCard={regType === 'Student'}>
            <Head title={t('auth.create_account')} />
            
            {!regType && renderSelection()}
            {regType === 'Staff' && renderStaffNotice()}
            {regType === 'Student' && renderStudentForm()}

        </GuestLayout>
    );
}
