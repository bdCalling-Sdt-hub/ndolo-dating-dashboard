import React, { useState } from 'react';
import { message, Modal, Table } from 'antd';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import moment from 'moment';
import { useGetMatchesQuery, useAddMatchesMutation, useUpdateMatchesMutation, useDeleteMatchesMutation } from '../../redux/features/Matches/Matches';
import url from '../../redux/api/baseUrl';

const Matches = () => {
    const { data: matches, refetch } = useGetMatchesQuery();
    const mainMatches = matches?.data?.attributes?.results;

    const [showAddModal, setShowAddModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // To track if it's an edit or add
    const [selectedMatch, setSelectedMatch] = useState(null); // To store the selected match for editing

    const [addImage, setAddImage] = useState(null);
    const [addMatches] = useAddMatchesMutation(); // Add mutation
    const [updateMatches] = useUpdateMatchesMutation(); // Update mutation
    const [deleteMatches] = useDeleteMatchesMutation(); // Delete mutation

    const columns = [
        {
            title: '#SI',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
            render: (src) => <div className='w-10 bg-black p-1'>
                <img src={url + src} alt="icon" className="w-10 h-10 object-contain" />
            </div>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Subtitle',
            dataIndex: 'subTitle',
            key: 'subTitle',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => moment(date).format('YYYY-MM-DD'),
        },
        {
            title: 'Status',
            dataIndex: 'isDeleted',
            key: 'isDeleted',
            render: (isDeleted) =>
                isDeleted ? (
                    <span className="text-red-600 font-semibold">Deleted</span>
                ) : (
                    <span className="text-green-600 font-semibold">Active</span>
                ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div className='flex items-center gap-3'>
                    <FaRegEdit style={{ fontSize: 20, color: 'blue', cursor: 'pointer' }} onClick={() => handleEdit(record)} />
                    <MdDeleteForever onClick={() => handleDelete(record?.id)} style={{ fontSize: 25, color: 'red', cursor: 'pointer' }} />
                </div>
            ),
        },
    ];

    const handleShowAddModal = () => {
        setIsEditMode(false); // Ensure it's in "Add" mode
        setSelectedMatch(null); // Reset selected match
        setShowAddModal(true); // Show the modal
    };

    const handleEdit = (match) => {
        setIsEditMode(true); // Set mode to "Edit"
        setSelectedMatch(match); // Set selected match to edit
        setShowAddModal(true); // Show the modal
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false); // Close the modal
        setAddImage(null); // Reset the image state
        setSelectedMatch(null); // Reset selected match
    };

    const handleAddOrUpdateMatches = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const subTitle = form.subTitle.value;

        const formData = new FormData();
        formData.append('icon', addImage);
        formData.append('title', title);
        formData.append('subTitle', subTitle);

        try {
            if (isEditMode && selectedMatch) {
                // Updating existing match 
                const res = await updateMatches({ formData, id: selectedMatch.id }).unwrap();
                if (res?.code === 200) {
                    message.success(res?.message);
                    refetch(); // Refetch the matches after update
                }
            } else {
                // Adding a new match
                const res = await addMatches(formData).unwrap();
                if (res?.code === 201) {
                    message.success(res?.message);
                    refetch(); // Refetch the matches after adding
                }
            }
            handleCloseAddModal(); // Close the modal after add or update
        } catch (error) {
            console.log(error);
            message.error('Failed to save match.');
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await deleteMatches(id).unwrap();
            if (res?.code === 200) {
                message.success(res?.message);
                refetch(); // Refetch the matches after deletion
            }
        } catch (error) {
            console.log(error);
            message.error('Failed to delete match.');
        }
    };

    return (
        <div className="p-5">
            <div className='flex items-center justify-between'>
                <h2 className="text-2xl font-semibold mb-5 text-primary">Matches Table</h2>
                <button onClick={handleShowAddModal} className='bg-[#3d1852] text-white px-4 py-2 rounded'>
                    Add New
                </button>
            </div>
            <Table
                columns={columns}
                dataSource={mainMatches}
                rowKey="id"
                bordered
                pagination={false}
                scroll={{ x: 'max-content' }}
                style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    backgroundColor: '#fff',
                    marginTop: '10px',
                }}
            />

            {/* Add/Edit Modal */}
            <Modal
                title={isEditMode ? 'Edit Match' : 'Add New Match'}
                visible={showAddModal}
                onCancel={handleCloseAddModal}
                footer={null}
                width={800}
            >
                <form onSubmit={handleAddOrUpdateMatches} className="bg-white rounded-lg py-8 space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            defaultValue={isEditMode ? selectedMatch?.title : ''}
                            placeholder="Enter title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Subtitle</label>
                        <input
                            type="text"
                            name="subTitle"
                            required
                            defaultValue={isEditMode ? selectedMatch?.subTitle : ''}
                            placeholder="Enter subtitle"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Icon</label>
                        <input
                            type="file"
                            name="icon"
                            onChange={(e) => setAddImage(e.target.files[0])}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-black hover:file:bg-primary-dark"
                        />
                    </div>

                    <div className="text-center pt-6">
                        <button
                            type="submit"
                            className="bg-[#3d1852] hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                        >
                            {isEditMode ? 'Update' : 'Submit'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Matches;
