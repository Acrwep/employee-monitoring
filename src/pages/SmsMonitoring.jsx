import React, { useEffect, useState } from 'react';
import { getMessages, getUsers } from '../services/api';
import { MdMessage } from 'react-icons/md';
import DataTable from '../components/common/DataTable';
import './ModulePage.css';

const columns = [

    { key: 'contact', label: 'Contact' },
    { key: 'number', label: 'Number' },
    {
        key: 'type', label: 'Type', render: (v) => (
            <span className={v === 'Incoming' ? 'dir-incoming' : 'dir-outgoing'}>{v}</span>
        )
    },
    {
        key: 'message', label: 'Message', render: (v) => (
            <span className="msg-preview" title={v}>
                {v.length > 45 ? v.slice(0, 45) + '…' : v}
            </span>
        )
    },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
];

export default function SmsMonitoring() {
    const [smsData, setSmsData] = useState([]);
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        fetchMessage();
    }, [page, limit, userId]);

    const fetchMessage = async () => {
        try {
            const payload = {
                page,
                limit
            };
            if (userId) {
                payload.user_id = userId;
            }
            const response = await getMessages(payload);

            if (response.data.success) {

                const transformedData = response.data.data.data.map((msg, index) => {

                    const dateObj = new Date(msg.time_periode);

                    return {

                        contact: msg.full_name,
                        number: msg.sender_id,
                        type: 'Incoming',
                        message: msg.message_body,
                        date: dateObj.toLocaleDateString(),
                        time: dateObj.toLocaleTimeString()
                    };
                });

                setSmsData(transformedData);
                setPagination({
                    total: response.data.data.pagination.total || 0,
                    totalPages: response.data.data.pagination.totalPages || 1
                });
            }

        } catch (err) {
            console.error(err);
            setError('Failed to load messages');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="module-root">
            {/* <div className="module-header">
                <div className="module-title-row">
                    <span className="module-icon orange"><MdMessage /></span>
                    <div>
                        <h1 className="module-title">SMS Monitoring</h1>
                        <p className="module-sub">All SMS messages sent and received on monitored devices</p>
                    </div>
                </div>
            </div> */}
            {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
            ) : error ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>
            ) : (
                <DataTable
                    title="SMS Monitoring"
                    icon={<MdMessage />}
                    columns={columns}
                    data={smsData}
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

        </div>)
}
