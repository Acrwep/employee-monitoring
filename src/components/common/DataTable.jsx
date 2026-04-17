import React, { useState } from 'react';
import { MdSearch, MdFileDownload } from 'react-icons/md';
import './DataTable.css';

export default function DataTable({ title, columns, data, icon }) {
    const [query, setQuery] = useState('');

    const filtered = data.filter(row =>
        Object.values(row).some(val =>
            String(val).toLowerCase().includes(query.toLowerCase())
        )
    );

    return (
        <div className="dt-wrapper">
            <div className="dt-header">
                <div className="dt-title-area">
                    {icon && <span className="dt-icon">{icon}</span>}
                    <div>
                        <h2 className="dt-title">{title}</h2>
                        <p className="dt-count">{filtered.length} records found</p>
                    </div>
                </div>
                <div className="dt-actions">
                    <div className="dt-search">
                        <MdSearch />
                        <input
                            type="text"
                            placeholder="Search records..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            aria-label={`Search ${title}`}
                        />
                    </div>
                    <button className="dt-export-btn" title="Export CSV">
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
                Showing <strong>{filtered.length}</strong> of <strong>{data.length}</strong> entries
            </div>
        </div>
    );
}
