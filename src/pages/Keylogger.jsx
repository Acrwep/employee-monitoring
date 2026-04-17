import React from 'react';
import { MdKeyboard } from 'react-icons/md';
import DataTable from '../components/common/DataTable';
import { keyloggerData } from '../data/dummyData';
import './ModulePage.css';

const columns = [
    { key: 'id', label: '#' },
    { key: 'device', label: 'Device' },
    {
        key: 'app', label: 'Application', render: (v) => (
            <span className="badge badge-purple">{v}</span>
        )
    },
    {
        key: 'keystrokes', label: 'Captured Text', render: (v) => (
            <span className="msg-preview" title={v}>
                {v.length > 45 ? v.slice(0, 45) + '…' : v}
            </span>
        )
    },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
];

export default function Keylogger() {
    return (
        <div className="module-root">
            <div className="module-header">
                <div className="module-title-row">
                    <span className="module-icon red"><MdKeyboard /></span>
                    <div>
                        <h1 className="module-title">Keylogger Tracking</h1>
                        <p className="module-sub">Keystrokes captured from all monitored applications</p>
                    </div>
                </div>
            </div>
            <DataTable
                title="Keylogger Tracking"
                icon={<MdKeyboard />}
                columns={columns}
                data={keyloggerData}
            />
        </div>
    );
}
