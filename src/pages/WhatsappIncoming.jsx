import React from 'react';
import { MdCallReceived, MdWhatsapp } from 'react-icons/md';
import DataTable from '../components/common/DataTable';
import { whatsappIncomingCallsData } from '../data/dummyData';
import './ModulePage.css';

const statusColor = (s) => {
    if (s === 'Answered') return 'badge badge-green';
    if (s === 'Missed') return 'badge badge-red';
    if (s === 'Declined') return 'badge badge-orange';
    return 'badge badge-blue';
};

const columns = [
    { key: 'id', label: '#' },
    { key: 'contact', label: 'Contact' },
    {
        key: 'type', label: 'Call Type', render: (v) => (
            <span className={v === 'Video' ? 'badge badge-purple' : 'badge badge-cyan'}>{v}</span>
        )
    },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'duration', label: 'Duration' },
    {
        key: 'status', label: 'Status', render: (v) => (
            <span className={statusColor(v)}>{v}</span>
        )
    },
];

export default function WhatsappIncoming() {
    return (
        <div className="module-root">
            <div className="module-header">
                <div className="module-title-row">
                    <span className="module-icon green"><MdWhatsapp /></span>
                    <div>
                        <h1 className="module-title">WhatsApp Incoming Calls</h1>
                        <p className="module-sub">All incoming WhatsApp voice & video calls</p>
                    </div>
                </div>
            </div>
            <DataTable
                title="WhatsApp Incoming Calls"
                icon={<MdCallReceived />}
                columns={columns}
                data={whatsappIncomingCallsData}
            />
        </div>
    );
}
