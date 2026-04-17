import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Layout.css';

export default function Layout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={`layout ${collapsed ? 'collapsed' : ''}`}>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className="layout-body">
                <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
                <main className="layout-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
