import React, { useState, useEffect } from 'react';
import { message, Modal, Table } from 'antd';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import moment from 'moment';
import { useGetInterestQuery, useAddInterestMutation, useUpdateInterestMutation, useDeleteInterestMutation } from '../../redux/features/Interest/interest';
import url from '../../redux/api/baseUrl';

const Interest = () => {
    const { data: interests } = useGetInterestQuery(); // Fetch interests
    const mainInterests = interests?.data?.attributes?.results;

    const [showAddModal, setShowAddModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // To track if it's an edit
    const [selectedInterest, setSelectedInterest] = useState(null); // Store the interest being edited

    const [addImage, setAddImage] = useState(null);
    const [addInterest] = useAddInterestMutation(); // Add mutation
    const [updateInterest] = useUpdateInterestMutation(); // Update mutation
    const [deleteInterest] = useDeleteInterestMutation(); // Delete mutation

    // Table columns configuration
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
            render: (src) => <img src={url + src} alt="icon" className="w-10 h-10 object-contain" />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => moment(createdAt).format('YYYY-MM-DD'),
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

    // Show Add/Edit Modal
    const handleShowAddModal = () => {
        setIsEditMode(false);
        setShowAddModal(true);
    };

    const handleEdit = (interest) => {
        setIsEditMode(true);
        setSelectedInterest(interest); // Set the selected interest to edit
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
        setAddImage(null); // Reset the image
        setSelectedInterest(null); // Clear selected interest for edit
    };


    const handleAddOrUpdateInterest = async (e) => {

        e.preventDefault();
        const form = e.target;
        const title = form.name.value;

        const formData = new FormData();
        if (!isEditMode) {
            formData.append('icon', addImage);
            formData.append('name', title);
        }
        if (isEditMode) {
            if (addImage) {
                formData.append('icon', addImage);
            }
            if (title) {
                formData.append('name', title);
            }
        }

        try {
            if (isEditMode) {
                // Update interest
                // console.log(selectedInterest?.id);
                // formData.append('id', selectedInterest.id); // Pass the ID for updating
                const res = await updateInterest({ formData, id: selectedInterest.id }).unwrap();
                console.log(res);
                if (res?.code === 200) {
                    message.success(res?.message);
                }
            } else {
                // Add new interest
                const res = await addInterest(formData).unwrap();
                if (res?.code === 201) {
                    message.success(res?.message);
                }
            }
            handleCloseAddModal(); // Close the modal after add or update
        } catch (error) {
            console.log(error);
            message.error('Failed to save interest.');
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await deleteInterest(id).unwrap();
            if (res?.code === 200) {
                message.success(res?.message);
            }
        } catch (error) {
            console.log(error);
            message.error('Failed to delete interest.');
        }
    };

    return (
        <div className="p-5">
            <div className='flex items-center justify-between'>
                <h2 className="text-2xl font-semibold mb-5 text-primary">Interest Table</h2>
                <button onClick={handleShowAddModal} className='bg-[#3d1852] text-white px-4 py-2 rounded'>
                    Add New Interest
                </button>
            </div>
            <Table
                columns={columns}
                dataSource={mainInterests}
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

            {/* Add/Edit Interest Modal */}
            <Modal
                title={isEditMode ? 'Edit Interest' : 'Add New Interest'}
                visible={showAddModal}
                onCancel={handleCloseAddModal}
                footer={null}
                width={800}
            >
                <form onSubmit={handleAddOrUpdateInterest} className="bg-white rounded-lg py-8 space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            defaultValue={isEditMode ? selectedInterest?.name : ''}
                            placeholder="Enter name"
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

export default Interest;
