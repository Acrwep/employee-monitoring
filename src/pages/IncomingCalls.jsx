import React from 'react';
import { MdCallReceived } from 'react-icons/md';
import DataTable from '../components/common/DataTable';
import { incomingCallsData } from '../data/dummyData';
import './ModulePage.css';

const statusColor = (s) => {
    if (s === 'Answered') return 'badge badge-green';
    if (s === 'Missed') return 'badge badge-red';
    return 'badge badge-orange';
};

const columns = [
    { key: 'id', label: '#' },
    { key: 'name', label: 'Contact Name' },
    { key: 'number', label: 'Phone Number' },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'duration', label: 'Duration' },
    {
        key: 'status', label: 'Status', render: (v) => (
            <span className={statusColor(v)}>{v}</span>
        )
    },
];

export default function IncomingCalls() {
    return (
        <div className="module-root">
            <div className="module-header">
                <div className="module-title-row">
                    <span className="module-icon green"><MdCallReceived /></span>
                    <div>
                        <h1 className="module-title">Incoming Calls</h1>
                        <p className="module-sub">All incoming calls received on monitored devices</p>
                    </div>
                </div>
            </div>
            <DataTable
                title="Incoming Calls"
                icon={<MdCallReceived />}
                columns={columns}
                data={incomingCallsData}
            />
        </div>
    );
}
