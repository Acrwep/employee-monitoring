import React from 'react';
import { MdVoicemail, MdWhatsapp } from 'react-icons/md';
import DataTable from '../components/common/DataTable';
import { whatsappAudioCallsData } from '../data/dummyData';
import './ModulePage.css';

const columns = [
    { key: 'id', label: '#' },
    { key: 'contact', label: 'Contact' },
    {
        key: 'direction', label: 'Direction', render: (v) => (
            <span className={v === 'Incoming' ? 'dir-incoming' : 'dir-outgoing'}>{v}</span>
        )
    },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'duration', label: 'Duration' },
    { key: 'size', label: 'File Size' },
    {
        key: 'play', label: 'Play', render: (_, row) => (
            <button className="play-btn" title={`Play audio from ${row.contact}`}>▶ Play</button>
        )
    },
];

export default function WhatsappAudio() {
    return (
        <div className="module-root">
            <div className="module-header">
                <div className="module-title-row">
                    <span className="module-icon purple"><MdWhatsapp /></span>
                    <div>
                        <h1 className="module-title">WhatsApp Audio Call Records</h1>
                        <p className="module-sub">Recorded WhatsApp audio calls from monitored devices</p>
                    </div>
                </div>
            </div>
            <DataTable
                title="WhatsApp Audio Call Records"
                icon={<MdVoicemail />}
                columns={columns}
                data={whatsappAudioCallsData}
            />
        </div>
    );
}
