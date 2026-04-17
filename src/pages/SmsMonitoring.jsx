import React from 'react';
import { MdMessage } from 'react-icons/md';
import DataTable from '../components/common/DataTable';
import { smsMonitoringData } from '../data/dummyData';
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
            <DataTable
                title="SMS Monitoring"
                icon={<MdMessage />}
                columns={columns}
                data={smsMonitoringData}
            />
        </div>
    );
}
