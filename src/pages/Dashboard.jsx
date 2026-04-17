import React from 'react';
import {
    MdPeople, MdPhoneCallback, MdMessage, MdDevices,
    MdCircle, MdAccessTime, MdEmail, MdPhone, MdSmartphone,
} from 'react-icons/md';
import { dashboardUsers } from '../data/dummyData';
import './Dashboard.css';

const stats = [
    { label: 'Total Employees', value: 5, icon: <MdPeople />, color: 'blue', change: '+2 this week' },
    { label: 'Active Devices', value: 3, icon: <MdDevices />, color: 'green', change: '60% online' },
    { label: 'Call Recordings', value: 6, icon: <MdPhoneCallback />, color: 'purple', change: 'Today' },
    { label: 'SMS Monitored', value: 6, icon: <MdMessage />, color: 'orange', change: 'Last 7 days' },
];

const colorMap = {
    blue: { bg: 'rgba(88,166,255,0.12)', border: 'rgba(88,166,255,0.2)', text: '#58a6ff' },
    green: { bg: 'rgba(63,185,80,0.12)', border: 'rgba(63,185,80,0.2)', text: '#3fb950' },
    purple: { bg: 'rgba(188,140,255,0.12)', border: 'rgba(188,140,255,0.2)', text: '#bc8cff' },
    orange: { bg: 'rgba(240,136,62,0.12)', border: 'rgba(240,136,62,0.2)', text: '#f0883e' },
};

export default function Dashboard() {
    return (
        <div className="dash-root">
            {/* Welcome banner */}
            <div className="dash-welcome">
                <div className="welcome-text">
                    <h1 className="welcome-heading">Welcome back, <span>Admin</span> 👋</h1>
                    <p className="welcome-sub">Here's your monitoring overview for today — Feb 25, 2026</p>
                </div>
                <div className="welcome-badge">
                    <MdCircle className="live-dot" />
                    <span>Live Monitoring</span>
                </div>
            </div>

            {/* Stat cards */}
            <div className="stats-grid">
                {stats.map((s, i) => {
                    const c = colorMap[s.color];
                    return (
                        <div
                            className="stat-card"
                            key={i}
                            style={{ '--card-bg': c.bg, '--card-border': c.border, '--card-text': c.text }}
                        >
                            <div className="stat-icon">{s.icon}</div>
                            <div className="stat-body">
                                <span className="stat-value">{s.value}</span>
                                <span className="stat-label">{s.label}</span>
                                <span className="stat-change">{s.change}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Section heading */}
            <div className="section-head">
                <h2 className="section-title">Monitored Employees</h2>
                <span className="section-badge">{dashboardUsers.length} total</span>
            </div>

            {/* Employee cards */}
            <div className="emp-grid">
                {dashboardUsers.map(user => (
                    <div className="emp-card" key={user.id}>
                        {/* Card top */}
                        <div className="emp-card-top">
                            <div className="emp-avatar">{user.avatar}</div>
                            <div className="emp-head">
                                <span className="emp-name">{user.name}</span>
                                <span
                                    className={`status-pill ${user.status === 'Active' ? 'pill-green' : 'pill-red'}`}
                                >
                                    <MdCircle className="pill-dot" />
                                    {user.status}
                                </span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="emp-divider" />

                        {/* Details */}
                        <div className="emp-details">
                            <div className="emp-row">
                                <MdPhone className="emp-row-icon" />
                                <span className="emp-row-val">{user.mobile}</span>
                            </div>
                            <div className="emp-row">
                                <MdEmail className="emp-row-icon" />
                                <span className="emp-row-val">{user.email}</span>
                            </div>
                            <div className="emp-row">
                                <MdSmartphone className="emp-row-icon" />
                                <span className="emp-row-val">{user.device}</span>
                            </div>
                            <div className="emp-row">
                                <MdAccessTime className="emp-row-icon" />
                                <span className="emp-row-val">{user.lastActive}</span>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="emp-card-footer">
                            <button className="emp-view-btn">View Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
