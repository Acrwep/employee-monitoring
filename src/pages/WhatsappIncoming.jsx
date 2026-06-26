import React, { useEffect, useState } from 'react';
import { MdWhatsapp } from 'react-icons/md';
import DataTable from '../components/common/DataTable';
import { getWhatsappCallLogs, getUsers } from '../services/api';

const formatDuration = (seconds) => {
    if (isNaN(seconds) || seconds === null) return "00:00:00";
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
};

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
        key: 'status', label: 'Direction', render: (v) => {
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
    { key: 'name', label: 'Name' },
    { key: 'call_type', label: 'Call Type' },
    { key: 'duration', label: 'Duration' },
    { key: 'timestamp', label: 'Timestamp' },
];

export default function WhatsappIncoming() {

    const [callLogs, setCallLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [userId, setUserId] = useState(null);

    const [users, setUsers] = useState([]);

    const [pagination, setPagination] = useState({
        total: 0,
        totalPages: 1
    });

    useEffect(() => {
        getUsers()
            .then((res) => {
                if (res.data && res.data.success) {
                    setUsers(res.data.data);
                }
            })
            .catch(console.error);
    }, []);

    const fetchWhatsappCallLogs = async () => {
        try {
            setLoading(true);

            const payload = {
                user_id: userId,
                search: "",
                page,
                limit
            };

            const response = await getWhatsappCallLogs(payload);

            if (response.data && response.data.success) {
                let logs = [];
                let totalRecords = 0;

                if (Array.isArray(response.data.data)) {
                    logs = response.data.data;
                    totalRecords = logs.length;
                } else if (response.data.data && Array.isArray(response.data.data.rows)) {
                    logs = response.data.data.rows;
                    totalRecords = response.data.data.total || logs.length;
                } else if (response.data.data && Array.isArray(response.data.data.data)) {
                    logs = response.data.data.data;
                    totalRecords = response.data.data.pagination?.total || logs.length;
                }

                const transformedData = logs.map(
                    (item) => ({
                        id: item.id,
                        status: item.diraction,
                        name: item.contact_name || item.full_name,
                        call_type: item.call_type,
                        duration: formatDuration(item.duration),
                        timestamp: formatTimestamp(item.created_at)
                    })
                );

                setCallLogs(transformedData);

                setPagination({
                    total: totalRecords,
                    totalPages: Math.ceil(totalRecords / limit) || 1
                });
            } else {
                setCallLogs([]);
                setPagination({ total: 0, totalPages: 1 });
            }
        } catch (error) {
            console.error('Whatsapp Call Logs Error:', error);
            setCallLogs([]);
            setPagination({ total: 0, totalPages: 1 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWhatsappCallLogs();
    }, [page, limit, userId]);


    return (
        <div className="module-root">
            {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
            ) : (
                <DataTable
                    title="WhatsApp Call Logs"
                    icon={<MdWhatsapp />}
                    columns={columns}
                    data={callLogs}
                    currentPage={page}
                    totalPages={pagination.totalPages}
                    totalRecords={pagination.total}
                    onPageChange={setPage}
                    rowsPerPage={limit}
                    users={users}
                    userId={userId}
                    onRowsPerPageChange={(newLimit) => {
                        setLimit(newLimit);
                        setPage(1);
                    }}
                    onUserChange={(newUserId) => {
                        setUserId(newUserId);
                        setPage(1);
                    }}
                />
            )}
        </div>
    );
}

