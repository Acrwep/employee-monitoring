import React, { useState, useEffect, useRef } from 'react';
import {
    MdPeople, MdPhoneCallback, MdMessage, MdDevices,
    MdCircle, MdAccessTime, MdEmail, MdPhone, MdSmartphone,
} from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { dashboardUsers } from '../data/dummyData';
import { getUsers } from '../services/api';
import './Dashboard.css';

const stats = [
    { label: 'Total Employees', value: 5, icon: <MdPeople />, color: 'blue', change: '+2 this week' },
    { label: 'Active Devices', value: 3, icon: <MdDevices />, color: 'green', change: '60% online' },
    { label: 'Call Recordings', value: 6, icon: <MdPhoneCallback />, color: 'purple', change: 'Today' },
    { label: 'SMS Monitored', value: 6, icon: <MdMessage />, color: 'orange', change: 'Last 7 days' },
];

const callSummaryData = [
    { id: 1, name: "Balaji R", total: 48, incoming: 25, outgoing: 20, missed: 3, duration: "05:42:18", lastSync: "2 mins ago" }
]

const whatsappSummaryData = [
    { id: 1, name: "Balaji R", chats: 286, total: 31, incoming: 17, outgoing: 12, missed: 2, duration: "02:14:20", lastSync: "Just now" }
];

const colorMap = {
    blue: { bg: 'rgba(88,166,255,0.12)', border: 'rgba(88,166,255,0.2)', text: '#58a6ff' },
    green: { bg: 'rgba(63,185,80,0.12)', border: 'rgba(63,185,80,0.2)', text: '#3fb950' },
    purple: { bg: 'rgba(188,140,255,0.12)', border: 'rgba(188,140,255,0.2)', text: '#bc8cff' },
    orange: { bg: 'rgba(240,136,62,0.12)', border: 'rgba(240,136,62,0.2)', text: '#f0883e' },
};

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [selectedUser, setSelectedUser] = useState('');
    const [dateRange, setDateRange] = useState('Today');

    const getTodayDateString = () => {
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const d = String(today.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const [customStartDate, setCustomStartDate] = useState(getTodayDateString());
    const [customEndDate, setCustomEndDate] = useState(getTodayDateString());
    const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
    const dateDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) {
                setDateDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        getUsers().then(res => {
            if (res.data && res.data.success) {
                setUsers(res.data.data || []);
            }
        }).catch(err => console.error("Failed to fetch users:", err))
            .finally(() => setLoadingUsers(false));
    }, []);

    const getDisplayDateRange = () => {
        if (dateRange === 'Custom Range') {
            return customStartDate && customEndDate ? `${customStartDate} → ${customEndDate}` : 'Custom Range';
        }

        const today = new Date();
        let start = new Date();
        let end = new Date();

        switch (dateRange) {
            case 'Today':
                break;
            case 'Yesterday':
                start.setDate(today.getDate() - 1);
                end.setDate(today.getDate() - 1);
                break;
            case 'This Month':
                start.setDate(today.getDate() - 30);
                break;
            case 'Last 7 Days':
                start.setDate(today.getDate() - 7);
                break;
            case 'Last 15 Days':
                start.setDate(today.getDate() - 15);
                break;
            case 'Last 30 Days':
                start.setDate(today.getDate() - 30);
                break;
            case 'Last 60 Days':
                start.setDate(today.getDate() - 60);
                break;
            case 'Last 90 Days':
                start.setDate(today.getDate() - 90);
                break;
            default:
                break;
        }

        const formatDate = (date) => {
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const d = String(date.getDate()).padStart(2, '0');
            return `${y}-${m}-${d}`;
        };

        return `${formatDate(start)} → ${formatDate(end)}`;
    };

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
            {/* <div className="stats-grid">
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
            </div> */}

            {/* Filter Section */}
            <div className="dash-filters">
                <div className="filter-group">
                    <div className="filter-input-wrap">
                        {loadingUsers ? (
                            <select className="filter-select" disabled>
                                <option>Loading users...</option>
                            </select>
                        ) : (
                            <select
                                className="filter-select"
                                value={selectedUser}
                                onChange={(e) => setSelectedUser(e.target.value)}
                            >
                                <option value="">Select User</option>
                                {users.length > 0 ? users.map(u => (
                                    <option key={u.user_id || u.id} value={u.user_id || u.id}>
                                        {u.full_name || u.name}
                                    </option>
                                )) : <option disabled>No Users Found</option>}
                            </select>
                        )}
                    </div>
                </div>

                <div className="filter-group date-filter-group">
                    <div className="custom-date-dropdown" ref={dateDropdownRef}>
                        <div
                            className="cdd-button"
                            onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                        >
                            <span className="cdd-button-text">
                                {getDisplayDateRange()}
                            </span>
                            <span className="cdd-arrow">▼</span>
                        </div>

                        {dateDropdownOpen && (
                            <div className="cdd-menu">
                                <select
                                    className="cdd-select"
                                    value={dateRange}
                                    onChange={(e) => setDateRange(e.target.value)}
                                >
                                    <option value="Today">Today</option>
                                    <option value="Yesterday">Yesterday</option>
                                    <option value="This Month">This Month</option>
                                    <option value="Last 7 Days">Last 7 Days</option>
                                    <option value="Last 15 Days">Last 15 Days</option>
                                    <option value="Last 30 Days">Last 30 Days</option>
                                    <option value="Last 60 Days">Last 60 Days</option>
                                    <option value="Last 90 Days">Last 90 Days</option>
                                    <option value="Custom Range">Custom Range</option>
                                </select>

                                {dateRange === 'Custom Range' && (
                                    <div className="cdd-custom-inputs">
                                        <div className="cdd-input-group">
                                            <label>Start date</label>
                                            <input
                                                type="date"
                                                value={customStartDate}
                                                onChange={(e) => setCustomStartDate(e.target.value)}
                                            />
                                        </div>
                                        <div className="cdd-input-group">
                                            <label>End date</label>
                                            <input
                                                type="date"
                                                value={customEndDate}
                                                onChange={(e) => setCustomEndDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Call Summary Table */}
            <div className="summary-card call-summary">
                <div className="summary-header">
                    <MdPhone className="summary-icon" />
                    <h3 className="summary-title">Call Summary</h3>
                </div>
                <div className="summary-table-wrap">
                    <table className="summary-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Total Calls</th>
                                <th>Incoming</th>
                                <th>Outgoing</th>
                                <th>Missed</th>
                                <th>Total Duration</th>
                                <th>Last Sync</th>
                            </tr>
                        </thead>
                        <tbody>
                            {callSummaryData.map((row) => (
                                <tr key={row.id}>
                                    <td className="row-name">{row.name}</td>
                                    <td>{row.total}</td>
                                    <td>{row.incoming}</td>
                                    <td>{row.outgoing}</td>
                                    <td>{row.missed}</td>
                                    <td>{row.duration}</td>
                                    <td>{row.lastSync}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* WhatsApp Summary Table */}
            <div className="summary-card whatsapp-summary">
                <div className="summary-header">
                    <FaWhatsapp className="summary-icon" />
                    <h3 className="summary-title">WhatsApp Summary</h3>
                </div>
                <div className="summary-table-wrap">
                    <table className="summary-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Chat Counts</th>
                                <th>Total Calls</th>
                                <th>Incoming</th>
                                <th>Outgoing</th>
                                <th>Missed</th>
                                <th>Total Duration</th>
                                <th>Last Sync</th>
                            </tr>
                        </thead>
                        <tbody>
                            {whatsappSummaryData.map((row) => (
                                <tr key={row.id}>
                                    <td className="row-name">{row.name}</td>
                                    <td>{row.chats}</td>
                                    <td>{row.total}</td>
                                    <td>{row.incoming}</td>
                                    <td>{row.outgoing}</td>
                                    <td>{row.missed}</td>
                                    <td>{row.duration}</td>
                                    <td>{row.lastSync}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Section heading */}
            {/* <div className="section-head">
                <h2 className="section-title">Monitored Employees</h2>
                <span className="section-badge">{dashboardUsers.length} total</span>
            </div> */}

            {/* Employee cards */}
            {/* <div className="emp-grid">
                {dashboardUsers.map(user => (
                    <div className="emp-card" key={user.id}>
                        
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

                        
                        <div className="emp-divider" />

                        
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

                        
                        <div className="emp-card-footer">
                            <button className="emp-view-btn">View Details</button>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
}
