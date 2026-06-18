import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdBarChart } from 'react-icons/md';
import DataTable from '../components/common/DataTable';
import './ModulePage.css';

const columns = [
    { key: 'usage_id', label: '#' },
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

    const getUsageData = async () => {
        try {
            setLoading(true);

            const response = await axios.post(
                'http://localhost:3000/api/app-usage',
                {
                    user_id: 101
                }
            );

            if (response.data.success) {
                const sortedData = [...response.data.data].sort(
                    (a, b) => a.usage_id - b.usage_id
                );
                setUsageData(sortedData);
            }
        } catch (error) {
            console.error('Usage Tracking Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsageData();
    }, []);

    return (
        <div className="module-root">
            <div className="module-header">
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
            </div>

            <DataTable
                title="Application Usage"
                icon={<MdBarChart />}
                columns={columns}
                data={usageData}
                loading={loading}
            />
        </div>
    );
}