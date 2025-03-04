
import { Button, DatePicker, Input, Modal, Space, Table } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import styles from './style.module.css'
import { useNavigate } from "react-router-dom";
import { useAllCustomerQuery } from "../../redux/features/manifest/allCustomer";
 
const { Search } = Input;
 
const dataSource = [
    {
      key: '1',
      id: '1',
      customerName: 'Bashar Islam',
      email: 'abc@email.com',
      address: 'Dhaka Bangladesh',
      date: '16 Apr 2024',
      phone:'4536656'
    },
    {
      id: '2',
      key: '2',
      applicationId: '12345678',
      customerName: 'Bashar Islam',
      email: 'abc@email.com',
      address: 'Dhaka Bangladesh',
      date: '16 Apr 2024',
      phone:'4536656'
    },
    {
      key: '3',
      id: '3',
      applicationId: '12345678',
      customerName: 'Bashar Islam',
      email: 'abc@email.com',
      address: 'Dhaka Bangladesh',
      date: '16 Apr 2024',
      phone:'4536656'
    },
    {
      key: '4',
      id: '4',
      applicationId: '12345678',
      customerName: 'Bashar Islam',
      email: 'abc@email.com',
      address: 'Dhaka Bangladesh',
      date: '16 Apr 2024',
      phone:'4536656'
    },
    {
      key: '5',
      id: '5',
      applicationId: '12345678',
      customerName: 'Bashar Islam',
      email: 'abc@email.com',
      address: 'Dhaka Bangladesh',
      date: '16 Apr 2024',
      phone:'4536656'
    },
    {
      key: '3',
      id: '6',
      applicationId: '12345678',
      customerName: 'Bashar Islam',
      email: 'abc@email.com',
      address: 'Dhaka Bangladesh',
      date: '16 Apr 2024',
      phone:'4536656'
    },
]
const Customers = () => {
  const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [name, setName] = useState('')

    const onSearch = (value ) => {
      setName(value)
   }
    const {data: allCustomer, error, isLoading} = useAllCustomerQuery(name)
    // console.log(allCustomer?.data?.attributes);
    
 
// const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
 
  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
      render: (text,_,index) => index + 1,
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
        <p>{(record?.email) ? record?.email : "n/a"}</p>
      )
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (_, record) => (
        <p>{(record?.phoneNumber) ? record?.phoneNumber : "n/a"}</p>
      )
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      render: (_, record) => (
        <p>{record?.createdAt?.split("T")[0] ? record?.createdAt?.split("T")[0] : "N/A"}</p>
         
      )
    },
    
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
         
            {/* <BsInfoCircle  onClick={() => handleView(record)}  size={18} className="text-[red] cursor-pointer" /> */}
            <div>
                <button onClick={() => navigate(`details/${record._id}`)} className="bg-green-500 px-2 py-1 rounded-md">View</button>
               
            </div>
          
          {/* <a><RxCross2 size={18} className='text-[red]'/></a> */}
        </Space>
      ),
    },
  ];
  
  const handleView = () => {
    // setUser(value);
    // console.log(value)
    setIsModalOpen(true);
  };
//   const onChange = (date, dateString) => {
//     console.log(date, dateString);
//   };
//   console.log(user);
//   const handleChangePage = (page) => {
//     setCurrentPage(page);
//     console.log(page);
//   };

 
  return (
    <div className="">
       
      <div className="rounded-t-lg mt-[24px]">
        <div className="flex py-[22px] justify-between items-center">
          <div>

          <p className=" text-[24px]">Users List</p>
          </div>
          <div>
          <button
          onClick={() => navigate("customermanifest")}
          className="text-[18px] font-normal mr-2 px-4 py-2 rounded !text-black !bg-[#69C0BE]"
        >
        Customer Manifest
        </button>
           
          <Search style={{
            width:"200px",
            marginLeft:'4px'
          }} placeholder="input search text" onSearch={onSearch} enterButton />
          </div>
        </div>

        {error ? (
          <div className="error-message" style={{ color: 'red', textAlign: 'center' }}>
            Error  {error?.data?.message || "Something went wrong"}
          </div>
        ) : (
          // Display the table if no error
          <Table
            pagination={{
              total: allCustomer?.data?.attributes?.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              defaultPageSize: 12,
              showSizeChanger: false,
              itemRender: (current, type, originalElement) => {
                if (type === "prev") {
                  return <Button className={styles.paginationButton}>Back</Button>;
                }
                if (type === "next") {
                  return <Button className={styles.paginationButton}>Next</Button>;
                }
                return originalElement;
              },
              className: styles.paginationCenter,
            }}
            columns={columns}
            dataSource={allCustomer?.data?.attributes}
            loading={isLoading} // Show loading spinner when data is being fetched
          />
        )}

      </div>
       
    </div>
  );
};

export default Customers;
