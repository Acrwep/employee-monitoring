import React from 'react';
import { MdWhatsapp } from 'react-icons/md';
import DataTable from '../components/common/DataTable';
import { whatsappChatsData } from '../data/dummyData';
import './ModulePage.css';

const columns = [
    { key: 'id', label: '#' },
    { key: 'contact', label: 'Contact' },
    {
        key: 'type', label: 'Direction', render: (v) => (
            <span className={v === 'Received' ? 'dir-received' : 'dir-sent'}>{v}</span>
        )
    },
    {
        key: 'message', label: 'Message', render: (v) => (
            <span className="msg-preview" title={v}>
                {v.length > 50 ? v.slice(0, 50) + '…' : v}
            </span>
        )
    },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
];

export default function WhatsappChats() {
    return (
        <div className="module-root">
            <div className="module-header">
                <div className="module-title-row">
                    <span className="module-icon green"><MdWhatsapp /></span>
                    <div>
                        <h1 className="module-title">WhatsApp Chats</h1>
                        <p className="module-sub">All WhatsApp messages monitored from target devices</p>
                    </div>
                </div>
            </div>
            <DataTable
                title="WhatsApp Chats"
                icon={<MdWhatsapp />}
                columns={columns}
                data={whatsappChatsData}
            />
        </div>
    );
}
