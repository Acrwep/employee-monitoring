import React, { useEffect, useState } from 'react';
import { getNotifications, getUsers } from '../services/api';
import { MdNotifications } from 'react-icons/md';
import DataTable from '../components/common/DataTable';
import './ModulePage.css';

const columns = [
    // { key: 'notification_id', label: '#' },
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
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [userId, setUserId] = useState(null);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

    useEffect(() => {
        getUsers().then(res => {
            if (res.data && res.data.success) {
                setUsers(res.data.data);
            }
        }).catch(err => console.error("Failed to fetch users:", err));
    }, []);

    const getNotificationData = async () => {
        try {
            setLoading(true);
            setError(null);

            const payload = {
                page,
                limit
            };
            if (userId) {
                payload.user_id = userId;
            }

            const response = await getNotifications(payload);

            if (response.data && response.data.success) {
                const logs = response.data.data.data || [];
                const sortedData = [...logs].sort(
                    (a, b) => a.notification_id - b.notification_id
                );
                setNotificationData(sortedData);
                setPagination({
                    total: response.data.data.pagination.total || 0,
                    totalPages: response.data.data.pagination.totalPages || 1
                });
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
    }, [page, limit, userId]);

    return (
        <div className="module-root">
            {/* <div className="module-header">
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
            </div> */}

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
                    currentPage={page}
                    totalPages={pagination.totalPages}
                    totalRecords={pagination.total}
                    onPageChange={(newPage) => setPage(newPage)}
                    rowsPerPage={limit}
                    onRowsPerPageChange={(newLimit) => {
                        setLimit(newLimit);
                        setPage(1);
                    }}
                    userId={userId}
                    users={users}
                    onUserChange={(newUserId) => {
                        setUserId(newUserId);
                        setPage(1);
                    }}
                />
            )}
        </div>
    );
}