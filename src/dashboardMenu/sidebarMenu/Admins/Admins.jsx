import React, { useState } from 'react';
import { DatePicker, Modal, Table, Tooltip, Input, Form, Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { IoSearchOutline } from "react-icons/io5";
import moment from "moment"; // To handle date comparison
import { FiPlus } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';
import { useAddAdminsMutation, useAllAdminsQuery, useBlockAdminMutation } from '../../../redux/features/admin/getAllAdmin';
import { toast, ToastContainer } from 'react-toastify';
import { useDeleteUserMutation } from '../../../redux/features/users/deleteUser';

const Admins = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false); // State for Add Admin Modal
    const [selectedUser, setSelectedUser] = useState(null); // Store selected user details
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const [pageSize, setPageSize] = useState(10); // Rows per page
    const [searchQuery, setSearchQuery] = useState(""); // Search query state
    const [selectedDate, setSelectedDate] = useState(null); // Selected date for filtering


    const { data: adminData, isLoading, error } = useAllAdminsQuery({ });
    console.log(adminData?.data?.attributes?.results);
    const allAdminInfo = adminData?.data?.attributes?.results;



    const showModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null); // Clear selected user when modal closes
    };

    const showAddAdminModal = () => {
        setIsAddAdminModalOpen(true); // Open Add Admin Modal
    };

    const closeAddAdminModal = () => {
        setIsAddAdminModalOpen(false); // Close Add Admin Modal
    };

    const onDateChange = (date, dateString) => {
        setSelectedDate(date ? moment(dateString, "YYYY-MM-DD") : null);
    };

    const columns = [
        {
            title: "#SI",
            dataIndex: "id",
            key: "id",
            render: (text, _, index) => (currentPage - 1) * pageSize + index + 1, // Adjust for pagination
        },
        {
            title: "User Name",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            render: (text, record) => (
                <div>{record?.phoneNumber ? record?.phoneNumber : "N/A"}</div>
            )
        },
        {
            title: "Join Date",
            dataIndex: "joinDate",
            key: "joinDate",
            render: (text, record) => (
                <div>{record?.createdAt ? moment(record?.createdAt).format("YYYY-MM-DD") : "N/A"}</div>
            )
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <div className='flex gap-5 items-center '>
                    <Tooltip title="More Info">
                        <InfoCircleOutlined
                            onClick={() => showModal(record)}
                            style={{ color: "#5c3c92", fontSize: "28px", cursor: "pointer" }}
                        />
                    </Tooltip>
                    <button onClick={() => handleDelete(record?.id)} className="bg-[#8f1b07] text-white p-2 rounded-xl flex justify-center items-center gap-1"><MdDeleteForever className="text-white text-2xl" /></button>
                </div>
            ),
        },
    ];


    // Filtered data based on search query and selected date
    const filteredData = allAdminInfo?.filter((item) => {
        const matchesSearchQuery =
            item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase());

        // const matchesDate =
        //     !selectedDate ||
        //     moment(item.createdAt, "DD MMM YYYY").isSame(selectedDate, "day");
        const matchesDate =
            !selectedDate || moment(item.createdAt).isSame(moment(selectedDate), "day");

        return matchesSearchQuery && matchesDate;
    });


    const [adminBlock] = useBlockAdminMutation()
    const handleBlock = async (id) => {

        try {
            const res = await adminBlock(id).unwrap();
            setIsModalOpen(false);

            if (res?.code == 200) {
                toast.success(res?.message);
            }


        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message);
        }


    }



    const [deleteuser, { isLoading: deleteLoading }] = useDeleteUserMutation();

    const handleDelete = async (userId) => {
        // Place your delete logic here

        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
            async function () {
                const id = userId
                const res = await deleteuser(id).unwrap();
                console.log(res);
                if (res) {
                    toast.success(res?.message);
                }
                else {
                    console.log(res);
                    toast.error(res?.data?.message);
                }
                swal("Deleted!", "Your imaginary file has been deleted.", "success");
            });


    };



    const [adminAdd, { isLoading: isAddLoading }] = useAddAdminsMutation()

    const addAdminModalSubmit = async (values) => {

        try {
            const res = await adminAdd(values).unwrap()
            console.log(res);
            if (res?.code == 201) {
                toast.success(res?.message)
            }


        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message)
        }
        closeAddAdminModal()

        // closeAddAdminModal(); // Close the modal after adding
    }


    if (isLoading) {
        return <div className="flex justify-center items-center min-h-[50vh]">
            <div role="status">
                <svg aria-hidden="true" className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    }




    return (
        <div className="md:p-4 mt-5 sm:mt-0">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="flex items-center justify-end">
                <button
                    className="flex items-center gap-2 bg-[#3d1852] text-xl font-semibold py-3 px-8 text-white rounded-lg"
                    onClick={showAddAdminModal} // Open Add Admin Modal
                >
                    <FiPlus className="text-2xl" />
                    Add Admin
                </button>
            </div>

            <div className="p-5 bg-[#ece6ee] rounded-md mt-5">
                <div className="md:flex justify-between mb-5 items-center">
                    <h3 className="font-semibold text-2xl">Admin List</h3>
                    <div className="flex items-center flex-wrap gap-2">
                        <DatePicker
                            className="p-2 rounded-full border-0"
                            onChange={onDateChange}
                            format="YYYY-MM-DD"
                        />
                        <input
                            className="md:mx-2 my-2 md:my-0 p-2 rounded-full text-sm"
                            placeholder="Search by Name or Email"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="bg-[#430750] w-10 h-10 rounded-full flex justify-center items-center text-white">
                            <IoSearchOutline className="font-bold" />
                        </button>
                    </div>
                </div>
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
                        total: filteredData?.length,
                        showSizeChanger: true,
                        position: ["bottomCenter"], // Center the pagination
                        className: "custom-pagination", // Add a custom class for styling
                    }}
                    rowKey="id"
                    bordered
                    style={{
                        borderRadius: "10px",
                        overflow: "hidden",
                        marginTop: "20px", // Adds top margin
                    }}
                    scroll={{ x: "max-content" }} // Adds horizontal scroll if content overflows
                    responsive
                />

                {/* User Detail Modal */}
                <Modal open={isModalOpen} footer={null} onCancel={closeModal} centered>
                    <h2 className="text-xl font-semibold text-center">User Details</h2>
                    <div className="my-10">
                        {selectedUser && (
                            <>
                                <div className="flex justify-between items-center mt-5 font-semibold">
                                    <span>User Name</span>
                                    <span>{selectedUser.userName}</span>
                                </div>
                                <div className="flex justify-between items-center mt-5 font-semibold">
                                    <span>Email</span>
                                    <span>{selectedUser.email}</span>
                                </div>
                                <div className="flex justify-between items-center mt-5 font-semibold">
                                    <span>Phone number</span>
                                    <span>{selectedUser.phoneNumber}</span>
                                </div>
                                <div className="flex justify-between items-center mt-5 font-semibold">
                                    <span>Address</span>
                                    <span>{selectedUser.address}</span>
                                </div>
                                <div className="flex justify-between items-center mt-5 font-semibold">
                                    <span>Joining date</span>
                                    <span>{selectedUser.joinDate}</span>
                                </div>
                                <div className="mt-10 flex justify-center gap-5 items-center">
                                    {
                                        selectedUser?.isBlocked ? (
                                            <button onClick={() => handleBlock(selectedUser.id)} className="bg-[#430750] text-white py-2 rounded-xl px-8 font-semibold">
                                                Block
                                            </button>
                                        ) : (
                                            <button onClick={() => handleBlock(selectedUser.id)} className="border-[#430750] border-[1px] text-[#430750] py-2 rounded-xl px-8 font-semibold">
                                                Unblock
                                            </button>
                                        )
                                    }
                                </div>
                            </>
                        )}
                    </div>
                </Modal>

                {/* Add Admin Modal */}
                <Modal
                    open={isAddAdminModalOpen}
                    onCancel={closeAddAdminModal}
                    centered
                    footer={null}

                >
                    <h2 className='text-2xl font-semibold mb-10 text-center'>Add New Admin</h2>
                    <Form
                        layout="vertical"
                        onFinish={addAdminModalSubmit}
                    >
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[{ required: true, message: "Please input the first name!" }]}
                        >
                            <Input type='text' placeholder="Enter first name" />
                        </Form.Item>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[{ required: true, message: "Please input the last name!" }]}
                        >
                            <Input type='text' placeholder="Enter last name" />
                        </Form.Item>

                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: "Please input the last name!" }]}
                        >
                            <Input type='text' placeholder="Enter last name" />
                        </Form.Item>

                        <Form.Item
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[{ required: true, message: "Please input the phone number!" }]}
                        >
                            <Input placeholder="Enter phone number" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: "Please input the email!" }]}
                        >
                            <Input type='email' placeholder="Enter email" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Please input the password!" }]}
                        >
                            <Input type='password' placeholder="Enter password" />
                        </Form.Item>

                        {/* <div className='flex gap-5 my-5'>
                            <label htmlFor="superAdmin">
                                <input type="radio" name="superAdmin" id="superAdmin" />
                                <span className='ml-2 text-[#3d1852] font-semibold'>Super Admin</span>
                            </label>
                            <label htmlFor="normalAdmin">
                                <input type="radio" name="superAdmin" id="normalAdmin" />
                                <span className='ml-2 text-[#3d1852] font-semibold'>Normal Admin</span>
                            </label>
                        </div> */}
                        {/* <Form.Item
                            label="Join Date"
                            name="joinDate"
                            rules={[{ required: true, message: "Please select a join date!" }]}
                        >
                            <DatePicker style={{ width: "100%" }} />
                        </Form.Item> */}
                        <Form.Item>
                            <button className='py-3 w-full bg-[#3d1852] text-white rounded-lg' type="submit" block>
                                Add Admin
                            </button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Admins;
