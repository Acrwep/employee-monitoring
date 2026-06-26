import React, { useState, useEffect } from 'react';
import { MdHistory } from 'react-icons/md';
import { getCallLogs, getUsers } from '../services/api';
import DataTable from '../components/common/DataTable';
import './ModulePage.css';

const statusColor = (s) => {
    if (s === 'Connected') return 'badge badge-green';
    if (s === 'Missed') return 'badge badge-red';
    if (s === 'Rejected') return 'badge badge-orange';
    return 'badge badge-blue';
};

const columns = [
    { key: 'name', label: 'Contact Name' },
    { key: 'number', label: 'Phone Number' },
    {
        key: 'type', label: 'Direction', render: (v) => (
            <span className={v === 'Incoming' ? 'dir-incoming' : 'dir-outgoing'}>{v}</span>
        )
    },
    { key: 'date', label: 'Timestamp' },
    {
        key: 'duration',
        label: 'Duration',
        render: (value) => {
            const hours = Math.floor(value / 3600);
            const minutes = Math.floor((value % 3600) / 60);
            const seconds = value % 60;

            return `${String(hours).padStart(2, '0')}:${String(
                minutes
            ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        },
    },
    {
        key: 'status', label: 'Status', render: (v) => (
            <span className={statusColor(v)}>{v}</span>
        )
    },
];

export default function CallHistory() {
    const [callLogs, setCallLogs] = useState([]);
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


    const fetchCallLogs = async () => {
        const payload = {
            page,
            limit
        }
        if (userId) {
            payload.user_id = userId;
        }
        try {
            const response = await getCallLogs(payload);
            console.log(response?.data)
            if (response?.data.success) {
                const logs = response?.data?.data?.data || [];
                const transformedData = logs.map(log => ({
                    id: log?.call_id,
                    name: log?.contact_name,
                    number: log?.phone_number,
                    type: log?.call_type,
                    date: log.call_time,
                    duration: log.duration,
                    status: log.duration > 0 ? 'Connected' : 'Missed'
                }));
                setCallLogs(transformedData);
                setPagination({
                    total: response.data.data.pagination.total || 0,
                    totalPages: response.data.data.pagination.totalPages || 1
                });
            } else {
                setError('Failed to fetch call logs.');
            }
        } catch (err) {
            console.error('Error fetching call logs:', err);
            setError('Failed to load call history.');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchCallLogs();
    }, [page, limit, userId]);

    return (
        <div className="module-root">
            {/* <div className="module-header">
                <div className="module-title-row">
                    <span className="module-icon purple"><MdHistory /></span>
                    <div>
                        <h1 className="module-title">Call History</h1>
                        <p className="module-sub">Complete log of all incoming and outgoing calls</p>
                    </div>
                </div>
            </div> */}

            {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
            ) : error ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>
            ) : (
                <DataTable
                    title="Call History"
                    icon={<MdHistory />}
                    columns={columns}
                    data={callLogs}
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
