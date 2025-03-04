import { Button, DatePicker, Input, Modal, Space, Table } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import styles from './../style.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useAllcheckListQuery } from "../../../redux/features/checklist/allChecklist";
 
const { Search } = Input;
 
const dataSource = [
    {
      id: '1',
      
      customerName: 'Bashar Islam',
      email: 'abc@email.com',
      address: 'Dhaka Bangladesh',
      date: '16 Apr 2024',
      phone:'4536656'
    },
    {
      id: '2',
      applicationId: '12345678',
      customerName: 'Bashar Islam',
      email: 'abc@email.com',
      address: 'Dhaka Bangladesh',
      date: '16 Apr 2024',
      phone:'4536656'
    },
    {
      id: '3',
      applicationId: '12345678',
      customerName: 'Bashar Islam',
      email: 'abc@email.com',
      address: 'Dhaka Bangladesh',
      date: '16 Apr 2024',
      phone:'4536656'
    },
]
const Dailychecklist = () => {
 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()
   const [name, setName] = useState('')


    const {data: allchecklist,error, isLoading} = useAllcheckListQuery(name)
    // console.log( "checklist>>>>>>>>>",allchecklist);
    
 
    const onActionClick = (record) => { 
    
        navigate(`detailscheck/${record?._id}`);
        
      };
 

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
        // <p>{(record?.id) ?  record?.id : "Apple Or Facebook User"}</p>
        <p>{(record?.email) ?  record?.email : "Apple Or Facebook User"}</p>
      )
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (_, record) => (
        // <p>{(record?.id) ?  record?.id : "Apple Or Facebook User"}</p>
        <p>{(record?.phoneNumber) ?  record?.phoneNumber : "Apple Or Facebook User"}</p>
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
                  
                <button 
                onClick={() => onActionClick(record)}
                 className="bg-[#62D49F] px-2 py-1 rounded-md">view
                 </button>
            
                {/* <button 
                onClick={() => navigate(`detailscheck/${record.id}`)}
                 className="bg-[#62D49F] px-2 py-1 rounded-md">view</button> */}
              
          
          
          {/* <a><RxCross2 size={18} className='text-[red]'/></a> */}
        </Space>
      ),
    },
  ];
  
  
  
//   const onChange = (date, dateString) => {
//     console.log(date, dateString);
//   };
//   console.log(user);
//   const handleChangePage = (page) => {
//     setCurrentPage(page);
//     console.log(page);
//   };
const onSearch = (value, _e, info) => {
   setName(value)
}
 
  return (
    <div className="">
       
      <div className="rounded-t-lg mt-[24px]">
        <div className="flex py-[22px] justify-between items-center">
          <div>

          <p className=" text-[24px]">Daily CheckList</p>
          </div>
          <div>
          <button
          onClick={() => navigate("/dashboard/dailychecklist/equipment")}
          className="text-[18px] font-normal px-4 py-1 mr-3 rounded !text-black !bg-[#69C0BE]"
        >
          See equipment
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
              total: allchecklist?.data?.attributes?.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              defaultPageSize: 10,
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
            dataSource={allchecklist?.data?.attributes}
            loading={isLoading} // Show loading spinner when data is being fetched
          />
        )}

      </div>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        closeIcon={
          <CloseOutlined
            style={{
              color: "white", // Icon color
              backgroundColor: "#de0a26", // Background color of the close icon
              borderRadius: "10%", // Rounded background
              padding: "10px", // Padding inside the background
            }}
          />
        }
      >
      <div>
        <div className="flex justify-center items-center gap-2 flex-col py-[16px] border-b border-b-gray-300">
           <h1 className="text-xl font-medium">Users Details</h1>
        </div>
        <div  className="p-[20px]">
        <div className="flex justify-between border-b mt-4 py-[16px]">
            <p>Full Name:</p>
            <p>
              {/* {user?.name ? user?.name : "N/A"} */}
              absayed
            </p>
          </div>
        
         
          <div className="flex justify-between border-b py-[16px] ">
            <p>Email:</p>
            <p>
              {/* {user?.email ? user?.email : "N/A"} */}
              ab@gmail.com
            </p>
          </div>
          <div className="flex justify-between border-b py-[16px]">
            <p>Phone:</p>
            <p>
              {/* {user?.phone ? user?.phone : "N/A"} */}
              +45269875
            </p>
          </div>
          <div className="flex justify-between border-b py-[16px]">
            <p>Date:</p>
            <p>
              {/* {user?.createdAt  ? user?.createdAt?.split("T")[0] : "N/A"} */}
              23-11-24
            </p>
          </div>
          <div className="flex justify-between items-center pt-[16px]">
            <p>address:</p>
            <p className="px-[15px] py-[10px] rounded-lg">
              {/* Regular P550 */}
              UK
            </p>
          </div>

        </div>
      </div>
      </Modal>
    </div>
  );
};

export default Dailychecklist;
