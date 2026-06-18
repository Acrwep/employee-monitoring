import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdMessage } from 'react-icons/md';
import DataTable from '../components/common/DataTable';
import './ModulePage.css';

const columns = [
    { key: 'id', label: '#' },
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

    useEffect(() => {
        fetchMessage();
    }, []);

    const fetchMessage = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/messages',
                {
                    "user_id": 101
                });

            if (response.data.success) {

                const transformedData = response.data.data.map((msg, index) => {

                    const dateObj = new Date(msg.time_periode);

                    return {
                        id: index + 1,
                        contact: msg.full_name,
                        number: msg.sender_id,
                        type: 'Incoming',
                        message: msg.message_body,
                        date: dateObj.toLocaleDateString(),
                        time: dateObj.toLocaleTimeString()
                    };
                });

                setSmsData(transformedData);
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
            <div className="module-header">
                <div className="module-title-row">
                    <span className="module-icon orange"><MdMessage /></span>
                    <div>
                        <h1 className="module-title">SMS Monitoring</h1>
                        <p className="module-sub">All SMS messages sent and received on monitored devices</p>
                    </div>
                </div>
            </div>
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
                />
            )}

        </div>)
}
