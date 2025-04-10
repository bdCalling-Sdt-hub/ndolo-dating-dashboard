import { DatePicker, message, Modal, Table, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import moment from "moment"; // To handle date comparison
import { MdDeleteForever } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { TbAlertTriangle } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";
import { useAllUsersDisQuery, useAllUsersQuery, useBlockUserMutation } from "../redux/features/users/users";
import { useDeleteUserMutation } from "../redux/features/users/deleteUser";


const RecentUser = ({ state }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Store selected user details
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [pageSize, setPageSize] = useState(5); // Rows per page
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [selectedDate, setSelectedDate] = useState(null); // Selected date for filtering

  const [blockUser] = useBlockUserMutation();
  const [deleteuser, { isLoading: deleteLoading }] = useDeleteUserMutation();


  const { data: userData, isLoading, error } = useAllUsersDisQuery({})
  const user = userData?.data?.attributes?.results;
  // const last7Days = moment().subtract(7, "days").format("YYYY-MM-DD");

  // const last7DaysUsers = user?.filter((u) =>
  //   moment(u?.createdAt).isSameOrAfter(last7Days, "day")
  // );

  // console.log(last7DaysUsers?.length);



  const handleDelete = async (user) => {
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
        const id = user?.id
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



  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null); // Clear selected user when modal closes
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
      render: (text, record) => (
        <Tooltip title={record?.fullName}>
          <span>{text}</span>
        </Tooltip>
      ),
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
        <span>{text ? text : "N/A"}</span>
      )
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => (
        <Tooltip title={moment(record?.createdAt).format('DD MMMM YYYY')}>
          <span>
            {moment(record?.createdAt).format('DD MMMM YYYY')}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-5 items-center  ">
          <Tooltip title="More Info">
            <InfoCircleOutlined
              onClick={() => showModal(record)}
              style={{ color: "#5c3c92", fontSize: "28px", cursor: "pointer" }}
            />
          </Tooltip>
          <button onClick={() => handleDelete(record)} className="bg-[#8f1b07] text-white p-2 rounded-xl flex justify-center items-center gap-1"><MdDeleteForever className="text-white text-2xl" /></button>

          <Link target="_blank" to={`https://mail.google.com/mail/u/0/?fs=1&to=${record?.email}&tf=cm`} className="bg-[#8f1b07] text-white hover:text-white p-2 rounded-xl  font-semibold flex items-center justify-center gap-1"><FiAlertTriangle className="text-white text-2xl" /></Link>
        </div>
      ),
    },
  ];


  const handleBlock = async (id) => {
    try {
      const res = await blockUser(id).unwrap();
      console.log(res);
      if (res?.code == 200) {
        setIsModalOpen(false);
        console.log(res);
        toast.success(res?.message)
      }
    } catch (error) {
      console.log(error);
    }
  }


  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[50vh]">
      <div role="status">
        <svg aria-hidden="true" class="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  }
  // Filtered data based on search query and selected date
  const filteredData = user?.filter((item) => {
    const matchesSearchQuery =
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate =
      !selectedDate || moment(item.createdAt).isSame(moment(selectedDate), "day");


    return matchesSearchQuery && matchesDate;
  });







  return (
    <div className="">
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

      <div className="p-5 bg-[#ece6ee] rounded-md mt-5">
        <div className="md:flex justify-between mb-5 items-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#1a1a1a]">
            Recent User <sup className="text-sm">( Last 7 days )</sup>
          </h2>
          <div className="flex items-center flex-wrap gap-">
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

        <Modal open={isModalOpen} footer={null} onCancel={closeModal} centered>
          <h2 className="text-xl font-semibold text-center">User Details</h2>
          <div className="my-10">
            {selectedUser && (
              <>
                <div className="flex justify-between items-center mt-5 font-semibold">
                  <span>User Name</span>
                  <span>{selectedUser.fullName}</span>
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
                  <span>
                    {moment(selectedUser.joinDate).format('DD MMMM YYYY')}
                  </span>
                </div>
                <div className="mt-10 flex justify-center gap-5 items-center">
                  {
                    selectedUser?.isBlocked ?
                      <button onClick={() => handleBlock(selectedUser.id)} className="bg-[#430750] text-white py-2 rounded-xl px-8 font-semibold">
                        Block
                      </button> :
                      <button onClick={() => handleBlock(selectedUser.id)} className="border-[#430750] border-[1px] text-[#430750] py-2 rounded-xl px-8 font-semibold">
                        Unblock
                      </button>
                  }

                </div>
              </>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default RecentUser;
