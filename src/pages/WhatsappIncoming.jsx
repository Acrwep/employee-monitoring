import React from 'react';
import { MdCallReceived, MdWhatsapp, MdDownload } from 'react-icons/md';
import DataTable from '../components/common/DataTable';
import { whatsappIncomingCallsData } from '../data/dummyData';
import './ModulePage.css';

const statusColor = (s) => {
    if (s === 'Outgoing') return 'badge badge-orange';
    if (s === 'Incomming') return 'badge badge-green';
    if (s === 'Declined') return 'badge badge-red';
    return 'badge badge-blue';
};

const columns = [
    {
        key: 'status', label: 'Direction', render: (v) => (
            <span className={statusColor(v)}>{v}</span>
        )
    },
    { key: 'name', label: 'Name' },
    { key: 'number', label: 'Number' },
    { key: 'duration', label: 'Duration' },
    { key: 'size', label: 'Size' },
    {
        key: 'play', label: 'Download Link', render: (v) => (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className="badge badge-blue" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MdDownload size={14} />
                </span>
                <span className={v === 'Play' ? 'badge badge-purple' : 'badge badge-cyan'} style={{ cursor: 'pointer' }}>{v}</span>
            </div>
        )
    },
    { key: 'timestamp', label: 'Timestamp' },
];

export default function WhatsappIncoming() {
    return (
        <div className="module-root">
            <div className="module-header">
                <div className="module-title-row">
                    <span className="module-icon green"><MdWhatsapp /></span>
                    <div>
                        <h1 className="module-title">WhatsApp Call Recording</h1>
                        <p className="module-sub">All Call Record WhatsApp voice calls</p>
                    </div>
                </div>
            </div>
            <DataTable
                title="WhatsApp Call Recording"
                icon={<MdCallReceived />}
                columns={columns}
                data={whatsappIncomingCallsData}
            />
        </div>
    );
}
