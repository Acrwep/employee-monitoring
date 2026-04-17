import React from 'react';
import { MdCallMade, MdWhatsapp } from 'react-icons/md';
import DataTable from '../components/common/DataTable';
import { whatsappOutgoingCallsData } from '../data/dummyData';
import './ModulePage.css';

const statusColor = (s) => {
    if (s === 'Connected') return 'badge badge-green';
    if (s === 'Not Answered') return 'badge badge-red';
    return 'badge badge-orange';
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

export default function WhatsappOutgoing() {
    return (
        <div className="module-root">
            <div className="module-header">
                <div className="module-title-row">
                    <span className="module-icon blue"><MdWhatsapp /></span>
                    <div>
                        <h1 className="module-title">WhatsApp Outgoing Calls</h1>
                        <p className="module-sub">All outgoing WhatsApp voice & video calls</p>
                    </div>
                </div>
            </div>
            <DataTable
                title="WhatsApp Outgoing Calls"
                icon={<MdCallMade />}
                columns={columns}
                data={whatsappOutgoingCallsData}
            />
        </div>
    );
}
