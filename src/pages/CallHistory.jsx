import React, { useState, useEffect } from 'react';
import { MdHistory } from 'react-icons/md';
import axios from 'axios';
import DataTable from '../components/common/DataTable';
import './ModulePage.css';

const statusColor = (s) => {
    if (s === 'Connected') return 'badge badge-green';
    if (s === 'Missed') return 'badge badge-red';
    if (s === 'Rejected') return 'badge badge-orange';
    return 'badge badge-blue';
};

const columns = [
    { key: 'id', label: '#' },
    { key: 'name', label: 'Contact Name' },
    { key: 'number', label: 'Phone Number' },
    {
        key: 'type', label: 'Direction', render: (v) => (
            <span className={v === 'Incoming' ? 'dir-incoming' : 'dir-outgoing'}>{v}</span>
        )
    },
    { key: 'date', label: 'Date' },
    { key: 'duration', label: 'Duration' },
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

    useEffect(() => {
        const fetchCallLogs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/call-logs/101');
                if (response.data && response.data.success) {
                    const transformedData = response.data.data.map(log => ({
                        id: log.call_id,
                        name: log.contact_name,
                        number: log.phone_number,
                        type: log.call_type,
                        date: log.call_time,
                        duration: log.duration,
                        status: log.duration > 0 ? 'Connected' : 'Missed'
                    }));
                    setCallLogs(transformedData);
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

        fetchCallLogs();
    }, []);

    return (
        <div className="module-root">
            <div className="module-header">
                <div className="module-title-row">
                    <span className="module-icon purple"><MdHistory /></span>
                    <div>
                        <h1 className="module-title">Call History</h1>
                        <p className="module-sub">Complete log of all incoming and outgoing calls</p>
                    </div>
                </div>
            </div>

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
                />
            )}
        </div>
    );
}
