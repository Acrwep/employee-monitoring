import React from 'react';
import { MdPhoneCallback } from 'react-icons/md';
import DataTable from '../components/common/DataTable';
import { callRecordingData } from '../data/dummyData';
import './ModulePage.css';

const columns = [
    { key: 'id', label: '#' },
    { key: 'caller', label: 'Caller Name' },
    { key: 'number', label: 'Phone Number' },
    {
        key: 'type', label: 'Type', render: (v) => (
            <span className={v === 'Incoming' ? 'dir-incoming' : 'dir-outgoing'}>{v}</span>
        )
    },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'duration', label: 'Duration' },
    { key: 'size', label: 'File Size' },
    {
        key: 'action', label: 'Action', render: (_, row) => (
            <button className="play-btn" title={`Play recording of ${row.caller}`}>▶ Play</button>
        )
    },
];

export default function CallRecording() {
    return (
        <div className="module-root">
            <div className="module-header">
                <div className="module-title-row">
                    <span className="module-icon blue"><MdPhoneCallback /></span>
                    <div>
                        <h1 className="module-title">Call Recording</h1>
                        <p className="module-sub">All recorded calls captured from monitored devices</p>
                    </div>
                </div>
            </div>
            <DataTable
                title="Call Recordings"
                icon={<MdPhoneCallback />}
                columns={columns}
                data={callRecordingData}
            />
        </div>
    );
}
