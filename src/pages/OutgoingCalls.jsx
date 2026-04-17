import React from 'react';
import { MdCallMade } from 'react-icons/md';
import DataTable from '../components/common/DataTable';
import { outgoingCallsData } from '../data/dummyData';
import './ModulePage.css';

const statusColor = (s) => {
    if (s === 'Connected') return 'badge badge-green';
    if (s === 'Not Answered') return 'badge badge-red';
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

export default function OutgoingCalls() {
    return (
        <div className="module-root">
            <div className="module-header">
                <div className="module-title-row">
                    <span className="module-icon blue"><MdCallMade /></span>
                    <div>
                        <h1 className="module-title">Outgoing Calls</h1>
                        <p className="module-sub">All outgoing calls made from monitored devices</p>
                    </div>
                </div>
            </div>
            <DataTable
                title="Outgoing Calls"
                icon={<MdCallMade />}
                columns={columns}
                data={outgoingCallsData}
            />
        </div>
    );
}
