import React, { useState } from 'react';
import { Table, Tag, Button, Dropdown, Menu } from 'antd';

const Adminchangepassword = () => {
    const [data, setData] = useState([
        {
            id: 1,
            username: 'admin1',
            email: 'admin1@example.com',
            requestDate: '2025-01-14',
            status: 'pending',
        },
        {
            id: 2,
            username: 'admin2',
            email: 'admin2@example.com',
            requestDate: '2025-01-13',
            status: 'failed',
        },
        {
            id: 3,
            username: 'admin3',
            email: 'admin3@example.com',
            requestDate: '2025-01-12',
            status: 'completed',
        },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const handleChangeStatus = (id, newStatus) => {
        const updatedData = data.map((record) =>
            record.id === id ? { ...record, status: newStatus } : record
        );
        setData(updatedData);
    };

    // Columns for the table
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Request Date',
            dataIndex: 'requestDate',
            key: 'requestDate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color;
                switch (status) {
                    case 'pending':
                        color = 'orange';
                        break;
                    case 'failed':
                        color = 'red';
                        break;
                    case 'completed':
                        color = 'green';
                        break;
                    default:
                        color = 'gray';
                }
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                const menu = (
                    <Menu
                        onClick={({ key }) => handleChangeStatus(record.id, key)}
                        items={[
                            { key: 'pending', label: 'Pending' },
                            { key: 'failed', label: 'Failed' },
                            { key: 'completed', label: 'Completed' },
                        ]}
                    />
                );

                return (
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button type="primary">Change Status</Button>
                    </Dropdown>
                );
            },
        },
    ];

    const filteredData = data;

    return (
        <div className="md:p-4 mt-5 ml-5 rounded-lg bg-[#ece6ee] ">
            <h2 className="text-lg font-bold mb-4">Admin Password Change Request</h2>
            <Table
                columns={columns}
                dataSource={filteredData}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    onChange: (page, pageSize) => {
                        setCurrentPage(page);
                        setPageSize(pageSize);
                    },
                    total: filteredData.length,
                    showSizeChanger: true,
                    position: ['bottomCenter'], // Center the pagination
                    className: 'custom-pagination', // Add a custom class for styling
                }}
                rowKey="id"
                bordered
                style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginTop: '20px', // Adds top margin
                }}
                scroll={{ x: 'max-content' }} // Adds horizontal scroll if content overflows
                responsive
            />
        </div>
    );
};

export default Adminchangepassword;
