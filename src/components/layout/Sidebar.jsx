import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    MdDashboard, MdPhoneCallback, MdHistory, MdCallReceived,
    MdCallMade, MdMessage, MdKeyboard, MdSecurity, MdChevronLeft,
    MdChevronRight, MdExpandMore, MdExpandLess, MdLogout,
    MdWhatsapp, MdPhoneInTalk, MdVoicemail,
} from 'react-icons/md';
import './Sidebar.css';

const NAV = [
    {
        id: 'main',
        label: null,
        items: [
            { id: 'dashboard', to: '/dashboard', icon: <MdDashboard />, label: 'Dashboard' },
        ],
    },
    {
        id: 'general',
        label: 'General Features',
        items: [
            { id: 'call-recording', to: '/call-recording', icon: <MdPhoneCallback />, label: 'Call Recording' },
            { id: 'call-history', to: '/call-history', icon: <MdHistory />, label: 'Call History' },
            { id: 'incoming-calls', to: '/incoming-calls', icon: <MdCallReceived />, label: 'Incoming Calls' },
            { id: 'outgoing-calls', to: '/outgoing-calls', icon: <MdCallMade />, label: 'Outgoing Calls' },
            { id: 'sms-monitoring', to: '/sms-monitoring', icon: <MdMessage />, label: 'SMS Monitoring' },
            { id: 'keylogger', to: '/keylogger', icon: <MdKeyboard />, label: 'Keylogger Tracking' },
        ],
    },
    {
        id: 'social',
        label: 'Social Media',
        items: [
            { id: 'wa-chats', to: '/wa-chats', icon: <MdWhatsapp />, label: 'WhatsApp Chats' },
            { id: 'wa-incoming', to: '/wa-incoming', icon: <MdCallReceived />, label: 'WA Incoming Calls' },
            { id: 'wa-outgoing', to: '/wa-outgoing', icon: <MdCallMade />, label: 'WA Outgoing Calls' },
            { id: 'wa-audio', to: '/wa-audio', icon: <MdVoicemail />, label: 'WA Audio Records' },
        ],
    },
];

export default function Sidebar({ collapsed, setCollapsed }) {
    const navigate = useNavigate();
    const [openGroups, setOpenGroups] = useState({ general: true, social: true });

    const toggleGroup = (id) =>
        setOpenGroups(g => ({ ...g, [id]: !g[id] }));

    const handleLogout = () => navigate('/');

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            {/* Brand */}
            <div className="sidebar-brand">
                <span className="brand-icon"><MdSecurity /></span>
                {!collapsed && (
                    <div className="brand-text">
                        <span className="brand-name">Emp CallTrack</span>
                        <span className="brand-sub">Admin Dashboard</span>
                    </div>
                )}
                <button
                    className="collapse-btn"
                    onClick={() => setCollapsed(c => !c)}
                    title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {collapsed ? <MdChevronRight /> : <MdChevronLeft />}
                </button>
            </div>

            {/* Nav */}
            <nav className="sidebar-nav">
                {NAV.map(group => (
                    <div key={group.id} className="nav-group">
                        {/* Group header (only groups with label) */}
                        {group.label && !collapsed && (
                            <button
                                className="group-header"
                                onClick={() => toggleGroup(group.id)}
                            >
                                <span className="group-label">{group.label}</span>
                                {openGroups[group.id] ? <MdExpandLess /> : <MdExpandMore />}
                            </button>
                        )}

                        {/* Items */}
                        <div
                            className={`group-items ${group.label && !openGroups[group.id] && !collapsed ? 'hidden' : ''
                                }`}
                        >
                            {group.items.map(item => (
                                <NavLink
                                    key={item.id}
                                    to={item.to}
                                    id={`nav-${item.id}`}
                                    className={({ isActive }) =>
                                        `nav-item ${isActive ? 'active' : ''}`
                                    }
                                    title={collapsed ? item.label : undefined}
                                >
                                    <span className="nav-icon">{item.icon}</span>
                                    {!collapsed && <span className="nav-label">{item.label}</span>}
                                    {!collapsed && (
                                        <span className="nav-indicator" />
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Logout */}
            <div className="sidebar-footer">
                <button className="logout-btn" onClick={handleLogout} title="Logout">
                    <MdLogout />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
}
