import React, { useEffect, useState } from 'react';
import { MdWhatsapp } from 'react-icons/md';
import DataTable from '../components/common/DataTable';
import { getWhatsappChatLogs, getUsers } from '../services/api';
import './ModulePage.css';

const formatTimestamp = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strHours = hours.toString().padStart(2, '0');
    return `${day}/${month}/${year} ${strHours}:${minutes} ${ampm}`;
};

const columns = [
    {
        key: 'direction', label: 'Direction', render: (v) => {
            const isIncoming = v === 'Incoming';
            return (
                <span style={{
                    color: isIncoming ? '#16a34a' : '#dc2626',
                    background: isIncoming ? '#dcfce7' : '#fee2e2',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 600
                }}>
                    {v}
                </span>
            );
        }
    },
    { key: 'number', label: 'Name/Whatsapp Number' },
    {
        key: 'text', label: 'Message Text', render: (v) => (
            <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', display: 'block', maxWidth: '500px', lineHeight: '1.5' }}>
                {v}
            </span>
        )
    },
    { key: 'timestamp', label: 'Timestamp' },
];

export default function WhatsappChats() {
    const [chatData, setChatData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [userId, setUserId] = useState(null);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({
        total: 0,
        totalPages: 1
    });

    useEffect(() => {
        getUsers().then(res => {
            if (res.data && res.data.success) {
                setUsers(res.data.data);
            }
        }).catch(err => console.error("Failed to fetch users:", err));
    }, []);

    const fetchWhatsappChats = async () => {
        try {
            setLoading(true);
            setError(null);

            const payload = {
                user_id: userId,
                page,
                limit
            };

            const response = await getWhatsappChatLogs(payload);

            if (response.data.success) {

                const logs = response.data.data.data || [];

                const transformedData = logs.map((item) => ({
                    id: item.id,
                    direction:
                        ((item.diraction || item.direction || '').toLowerCase() === 'incoming')
                            ? 'Incoming'
                            : 'Outgoing',
                    number: item.contact_name,
                    text: item.message,
                    timestamp: formatTimestamp(item.created_at)
                }));

                setChatData(transformedData);

                setPagination({
                    total: response.data.data.pagination.total,
                    totalPages: response.data.data.pagination.totalPages
                });
            }
        } catch (err) {
            console.error(err);
            setError("Failed to fetch WhatsApp chats.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWhatsappChats();
    }, [page, limit, userId]);
    return (
        <div className="module-root">
            {/* <div className="module-header">
                <div className="module-title-row">
                    <span className="module-icon green"><MdWhatsapp /></span>
                    <div>
                        <h1 className="module-title">WhatsApp Chats</h1>
                        <p className="module-sub">All WhatsApp messages monitored from target devices</p>
                    </div>
                </div>
            </div> */}
            {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
            ) : error ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>
            ) : (
                <DataTable
                    title="WhatsApp Chats"
                    icon={<MdWhatsapp />}
                    columns={columns}
                    data={chatData}
                    currentPage={page}
                    totalPages={pagination.totalPages}
                    totalRecords={pagination.total}
                    onPageChange={setPage}
                    rowsPerPage={limit}
                    onRowsPerPageChange={(newLimit) => {
                        setLimit(newLimit);
                        setPage(1);
                    }}
                    userId={userId}
                    users={users}
                    onUserChange={(newUserId) => {
                        setUserId(newUserId);
                        setPage(1);
                    }}
                />)}
        </div>
    );
}
