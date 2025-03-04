import { Button, DatePicker, Input, Modal, Space, Table } from "antd";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./style.module.css";
import { useAllUsersQuery } from "../../redux/features/users/users";
import { useNavigate } from "react-router-dom";
import { useCancelUsersMutation } from "../../redux/features/users/cancelUsers";
import { useApprovedUsersMutation } from "../../redux/features/users/approveUser";
import toast, { Toaster } from "react-hot-toast";

const { Search } = Input;

const dataSource = [
  {
    key: "1",

    customerName: "Bashar Islam",
    email: "abc@email.com",
    address: "Dhaka Bangladesh",
    date: "16 Apr 2024",
    phone: "4536656",
  },
  {
    key: "2",
    applicationId: "12345678",
    customerName: "Bashar Islam",
    email: "abc@email.com",
    address: "Dhaka Bangladesh",
    date: "16 Apr 2024",
    phone: "4536656",
  },
  {
    key: "3",
    applicationId: "12345678",
    customerName: "Bashar Islam",
    email: "abc@email.com",
    address: "Dhaka Bangladesh",
    date: "16 Apr 2024",
    phone: "4536656",
  },
];
const UserList = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const onSearch = (value, _e, info) => {
    setName(value);
  };
  const onChange = (date, dateString) => {
    setDate(dateString);
  };
  const { data: users, error, isLoading } = useAllUsersQuery({ date, name });
  //  console.log(users?.data?.attributes);
  // console.log(error);
  const dataSource = users?.data?.attributes.map((user, index) => ({
    key: user.id || index, // Ensure unique key, using id or index as fallback
    ...user,
  }));

  // const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
      render: (text, _, index) => index + 1,
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <p className="font-medium">{record?.name}</p>
        </div>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => (
        <p>{record?.email ? record?.email : "Apple Or Facebook User"}</p>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (_, record) => (
        <p>
          {record?.phoneNumber ? record?.phoneNumber : "Apple Or Facebook User"}
        </p>
      ),
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      render: (_, record) => (
        <p>
          {record?.createdAt?.split("T")[0]
            ? record?.createdAt?.split("T")[0]
            : "N/A"}
        </p>
        // <p>34/04/24</p>
      ),
    },

    // {
    //   title: 'Details',
    //   dataIndex: 'Details',
    //   key: 'Details',
    //   render: (_, record) => (
    //      <button onClick={() => handleView(record)} className="bg-green-400 font-medium px-2 py-1 rounded-md">details</button>
    //   )
    // },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        // {/* <BsInfoCircle  onClick={() => handleView(record)}  size={18} className="text-[red] cursor-pointer" /> */}

        <div>
          <button
            onClick={() => approvedUser(record?._id)}
            className="bg-[#62D49F] px-2 py-1 rounded-md"
          >
            Approve
          </button>
          <button
            onClick={() => showModal(record?._id)}
            className="ml-2 border p-1 bg-red-500 px-2 text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      ),
    },
  ];
  const [id, setId] = useState();
  const [approveduser] = useApprovedUsersMutation();
  const [canceluser] = useCancelUsersMutation();
  // console.log(id);
  const approvedUser = async (id) => {
    try {
      const res = await approveduser(id).unwrap();
      // console.log(res);

      if (res?.statusCode == 200) {
        toast.success(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const showModal = (id) => {
    setIsModalOpen(true);
    setId(id);
    // console.log(id);
  };

  const handleDelete = async () => {
    // Place your delete logic here
    const res = await canceluser(id).unwrap();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const handleView = (value) => {
  //   setUser(value);
  //   // console.log(value)
  //   setIsModalOpen(true);
  // };

  return (
    <div className="">
      <Toaster reverseOrder={false} />

      {/* <Modal
                title="Confirm Cencel"
                visible={isModalOpen}
                onOk={handleDelete}
                onCancel={handleCancel}
                okText="Cencel"
                cancelText="No cancel"
            >
                <p>Are you sure you want to cencel this user?</p>
            </Modal> */}

      <div className="rounded-t-lg mt-[24px]">
        <div className="flex py-[22px] justify-between items-center">
          <div>
            <p className=" text-[24px]">Users List</p>
          </div>
          <div>
            <button
              onClick={() => navigate("/dashboard/userslist/apprevusers")}
              className="text-[18px] font-normal px-4 py-1 mr-3 rounded !text-black !bg-[#69C0BE]"
            >
              Approved UserList
            </button>
            <Space direction="vertical">
              <DatePicker onChange={onChange} />
            </Space>
            <Search
              style={{
                width: "200px",
                marginLeft: "4px",
              }}
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
          </div>
        </div>

        {error ? (
          <div
            className="error-message"
            style={{ color: "red", textAlign: "center" }}
          >
            {error?.data?.message || "Something went wrong"}
          </div>
        ) : (
          // Display the table if no error
          <Table
            pagination={{
              total: users?.data?.attributes?.length,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              defaultPageSize: 12,
              showSizeChanger: false,
              itemRender: (current, type, originalElement) => {
                if (type === "prev") {
                  return (
                    <Button className={styles.paginationButton}>Back</Button>
                  );
                }
                if (type === "next") {
                  return (
                    <Button className={styles.paginationButton}>Next</Button>
                  );
                }
                return originalElement;
              },
              className: styles.paginationCenter,
            }}
            columns={columns}
            dataSource={dataSource}
            loading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;
