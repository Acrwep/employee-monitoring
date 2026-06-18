import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdNotifications } from 'react-icons/md';
import DataTable from '../components/common/DataTable';
import './ModulePage.css';

const columns = [
    { key: 'notification_id', label: '#' },
    { key: 'full_name', label: 'User Name' },
    { key: 'app_name', label: 'Application Name' },
    { key: 'package_name', label: 'Package Name' },
    {
        key: 'title',
        label: 'Title',
        render: (v) => (
            <span className="msg-preview" title={v}>
                {v?.length > 45 ? v.slice(0, 45) + '...' : v}
            </span>
        )
    },
    {
        key: 'text_content',
        label: 'Content',
        render: (v) => (
            <span className="msg-preview" title={v}>
                {v?.length > 45 ? v.slice(0, 45) + '...' : v}
            </span>
        )
    },
    { key: 'post_time', label: 'Posted Time' },
];

export default function Notification() {
    const [notificationData, setNotificationData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getNotificationData = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.post(
                'http://localhost:3000/api/notifications',
                {
                    user_id: 101
                }
            );

            if (response.data.success) {
                const sortedData = [...response.data.data].sort(
                    (a, b) => a.notification_id - b.notification_id
                );
                setNotificationData(sortedData);
            }
        } catch (error) {
            console.error('Notification Error:', error);
            setError('Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNotificationData();
    }, []);

    return (
        <div className="module-root">
            <div className="module-header">
                <div className="module-title-row">
                    <span className="module-icon blue">
                        <MdNotifications />
                    </span>
                    <div>
                        <h1 className="module-title">Notifications</h1>
                        <p className="module-sub">
                            Monitor all notifications received from applications
                        </p>
                    </div>
                </div>
            </div>

            {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
            ) : error ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>
            ) : (
                <DataTable
                    title="Application Notifications"
                    icon={<MdNotifications />}
                    columns={columns}
                    data={notificationData}
                />
            )}
        </div>
    );
}