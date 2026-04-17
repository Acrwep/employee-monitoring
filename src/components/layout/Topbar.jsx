import React from 'react';
import { useLocation } from 'react-router-dom';
import { MdMenu, MdNotifications, MdSearch, MdCircle } from 'react-icons/md';
import './Topbar.css';

const PAGE_TITLES = {
    '/dashboard': 'Dashboard',
    '/call-recording': 'Call Recording',
    '/call-history': 'Call History',
    '/incoming-calls': 'Incoming Calls',
    '/outgoing-calls': 'Outgoing Calls',
    '/sms-monitoring': 'SMS Monitoring',
    '/keylogger': 'Keylogger Tracking',
    '/wa-chats': 'WhatsApp Chats',
    '/wa-incoming': 'WhatsApp Incoming Calls',
    '/wa-outgoing': 'WhatsApp Outgoing Calls',
    '/wa-audio': 'WhatsApp Audio Call Records',
};

export default function Topbar({ collapsed, setCollapsed }) {
    const { pathname } = useLocation();
    const title = PAGE_TITLES[pathname] ?? 'Dashboard';

    return (
        <header className="topbar">
            {/* Left: hamburger + breadcrumb */}
            <div className="topbar-left">
                {/* <button
                    className="hamburger"
                    onClick={() => setCollapsed(c => !c)}
                    id="topbar-menu-toggle"
                    aria-label="Toggle sidebar"
                >
                    <MdMenu />
                </button> */}
                <div className="page-info">
                    <span className="page-title-text">{title}</span>
                    <span className="page-breadcrumb">Emp CallTrack &rsaquo; {title}</span>
                </div>
            </div>

            {/* Right: search + notifications + user */}
            <div className="topbar-right">
                <div className="topbar-search">
                    <MdSearch className="search-icon" />
                    <input
                        id="topbar-search-input"
                        type="text"
                        placeholder="Search..."
                        aria-label="Search"
                    />
                </div>

                <button className="icon-btn notif-btn" id="topbar-notifications" aria-label="Notifications">
                    <MdNotifications />
                    <span className="notif-badge">3</span>
                </button>

                <div className="topbar-user" id="topbar-user-profile">
                    <span className="user-avatar">AD</span>
                    <div className="user-info">
                        <span className="user-name">Admin</span>
                        <span className="user-role">
                            <MdCircle className="status-dot" />
                            Online
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}
