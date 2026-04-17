import React from 'react';
import { MdHistory } from 'react-icons/md';
import DataTable from '../components/common/DataTable';
import { callHistoryData } from '../data/dummyData';
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
            <DataTable
                title="Call History"
                icon={<MdHistory />}
                columns={columns}
                data={callHistoryData}
            />
        </div>
    );
}
