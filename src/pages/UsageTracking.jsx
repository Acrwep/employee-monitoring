import React, { useEffect, useState } from 'react';
import { getAppUsage, getUsers } from '../services/api';
import { MdBarChart } from 'react-icons/md';
import DataTable from '../components/common/DataTable';
import './ModulePage.css';

const columns = [

    { key: 'full_name', label: 'User Name' },
    { key: 'app_name', label: 'Application Name' },
    { key: 'package_name', label: 'Package Name' },
    {
        key: 'usage_duration',
        label: 'Usage Duration',
        render: (value) => {
            const hours = Math.floor(value / 3600);
            const minutes = Math.floor((value % 3600) / 60);
            const seconds = value % 60;

            return `${String(hours).padStart(2, '0')}:${String(
                minutes
            ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        },
    },
    { key: 'date_periode', label: 'Date' },
];

export default function UsageTracking() {
    const [usageData, setUsageData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [userId, setUserId] = useState(null);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

    useEffect(() => {
        getUsers().then(res => {
            if (res.data && res.data.success) {
                setUsers(res.data.data);
            }
        }).catch(err => console.error("Failed to fetch users:", err));
    }, []);

    const getUsageData = async () => {
        try {
            setLoading(true);

            const payload = {
                page,
                limit
            };
            if (userId) {
                payload.user_id = userId;
            }

            const response = await getAppUsage(payload);

            if (response.data && response.data.success) {
                const logs = response.data.data.data || [];
                const sortedData = [...logs].sort(
                    (a, b) => a.usage_id - b.usage_id
                );
                setUsageData(sortedData);
                setPagination({
                    total: response.data.data.pagination.total || 0,
                    totalPages: response.data.data.pagination.totalPages || 1
                });
            }
        } catch (error) {
            console.error('Usage Tracking Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsageData();
    }, [page, limit, userId]);

    return (
        <div className="module-root">
            {/* <div className="module-header">
                <div className="module-title-row">
                    <span className="module-icon blue">
                        <MdBarChart />
                    </span>
                    <div>
                        <h1 className="module-title">
                            Usage Tracking
                        </h1>
                        <p className="module-sub">
                            Monitor application usage and activity statistics
                        </p>
                    </div>
                </div>
            </div> */}

            <DataTable
                title="Application Usage"
                icon={<MdBarChart />}
                columns={columns}
                data={usageData}
                loading={loading}
                currentPage={page}
                totalPages={pagination.totalPages}
                totalRecords={pagination.total}
                onPageChange={(newPage) => setPage(newPage)}
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
            />
        </div>
    );
}