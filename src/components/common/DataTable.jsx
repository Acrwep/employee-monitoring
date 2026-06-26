import React, { useState, useEffect, useRef } from 'react';
import { MdSearch, MdFileDownload, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import './DataTable.css';

export default function DataTable({ title, columns, data, icon, currentPage = 1, totalPages = 1, totalRecords = 0, onPageChange, rowsPerPage = 10, onRowsPerPageChange, userId, onUserChange, users = [] }) {
    const [query, setQuery] = useState('');

    const filtered = data.filter(row =>
        Object.values(row).some(val =>
            String(val).toLowerCase().includes(query.toLowerCase())
        )
    );

    const handleExport = () => {
        if (!filtered || filtered.length === 0) return;

        const headers = columns.map(col => col.label);

        const csvRows = [
            headers.join(','),
            ...filtered.map(row => {
                return columns.map(col => {
                    let cellData = row[col.key];
                    if (cellData === null || cellData === undefined) {
                        cellData = '';
                    }
                    const stringData = String(cellData).replace(/"/g, '""');
                    return `"${stringData}"`;
                }).join(',');
            })
        ].join('\n');

        const blob = new Blob(['\uFEFF' + csvRows], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        const date = new Date().toISOString().split('T')[0];
        link.setAttribute('download', `${title.replace(/\s+/g, '_')}_${date}.csv`);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const startIndex = (currentPage - 1) * rowsPerPage;

    const handlePrev = () => {
        if (onPageChange && currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };
    const handleNext = () => {
        if (onPageChange && currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="dt-wrapper">
            <div className="dt-header">
                <div className="dt-title-area">
                    {icon && <span className="dt-icon">{icon}</span>}
                    <div>
                        <h2 className="dt-title">{title}</h2>
                        <p className="dt-count">{totalRecords} records found</p>
                    </div>
                </div>
                {onUserChange && (
                    <div className="dt-user-select" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0 auto' }}>
                        <span style={{ color: '#64748b', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>User:</span>

                        <div className='table-top-search'>
                            <select
                                value={userId || ''}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    onUserChange(val ? val : null);
                                }} className={`search-box-user ${userId ? 'has-value' : ''}`}
                                style={{ color: userId ? 'transparent' : undefined }}
                            >
                                <option value="" style={{ color: '#3730a3' }}>Select User...</option>
                                {users.map(u => (
                                    <option key={u.user_id || u.id} value={u.user_id || u.id} style={{ color: '#3730a3' }}>
                                        {u.full_name || u.name}
                                    </option>
                                ))}
                            </select>

                            {/* Overlay Chip when user is selected */}
                            {userId && (
                                <div className='search-box-user-selected'>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#3730a3', marginRight: '8px', whiteSpace: 'nowrap' }}>
                                        {users.find(u => String(u.user_id || u.id) === String(userId))?.full_name || users.find(u => String(u.user_id || u.id) === String(userId))?.name || 'User'}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            onUserChange(null);
                                        }}
                                        style={{
                                            pointerEvents: 'auto',
                                            background: '#fee2e2',
                                            border: 'none',
                                            color: '#dc2626',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '18px',
                                            height: '18px',
                                            borderRadius: '50%',
                                            padding: '0px 0px 4px 0px',
                                            fontSize: '1rem',
                                            lineHeight: 1,
                                            transition: 'background 0.2s ease'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#fca5a5'}
                                        onMouseLeave={e => e.currentTarget.style.background = '#fee2e2'}
                                        title="Clear user"
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}

                            <div style={{
                                position: 'absolute',
                                right: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                pointerEvents: 'none',
                                color: userId ? '#3730a3' : '#64748b',
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'right 0.2s ease'
                            }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
                <div className="dt-actions">
                    {/* <div className="dt-search">
                        <MdSearch />
                        <input
                            type="text"
                            placeholder="Search records..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            aria-label={`Search ${title}`}
                        />
                    </div> */}
                    <button className="dt-export-btn" title="Export as Excel/CSV" onClick={handleExport}>
                        <MdFileDownload />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            <div className="dt-scroll">
                <table className="dt-table">
                    <thead>
                        <tr>
                            {columns.map(col => (
                                <th key={col.key}>{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="dt-empty">
                                    No records match your search.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((row, i) => (
                                <tr key={row.id ?? i}>
                                    {columns.map(col => (
                                        <td key={col.key}>
                                            {col.render ? col.render(row[col.key], row) : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="dt-footer">
                <div className="dt-info">
                    Showing <strong>{filtered.length === 0 ? 0 : startIndex + 1}</strong> to <strong>{Math.min(startIndex + filtered.length, totalRecords)}</strong> of <strong>{totalRecords}</strong> entries

                </div>
                <div className="dt-pagination">
                    <button
                        className="dt-page-btn"
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        title="Previous Page"
                    >
                        <MdChevronLeft size={20} />
                    </button>

                    <span className="dt-page-info">
                        Page <strong>{currentPage}</strong> of <strong>{Math.max(1, totalPages)}</strong>
                    </span>

                    <button
                        className="dt-page-btn"
                        onClick={handleNext}
                        disabled={currentPage === Math.max(1, totalPages) || totalPages === 0}
                        title="Next Page"
                    >
                        <MdChevronRight size={20} />
                    </button>

                    <span style={{ marginLeft: '1rem', marginRight: '0.5rem', color: '#666' }}>Rows per page:</span>
                    <select
                        value={rowsPerPage}
                        onChange={(e) => {
                            if (onRowsPerPageChange) {
                                onRowsPerPageChange(Number(e.target.value));
                            }
                        }}
                        className="dt-limit-select"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
