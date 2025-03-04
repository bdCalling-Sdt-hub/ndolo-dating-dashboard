import { Button, DatePicker, Input, Modal, Space, Table } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import styles from './../../style.module.css'
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack, BiArrowFromLeft } from "react-icons/bi";
import { useAllCgReportQuery } from "../../../../redux/features/reporting/allCgReporting";
 
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
const CgRepoting = () => {
 
    
    const navigate = useNavigate()
  const [name , setName] = useState('')


    const {data: cgReport, error, isLoading} = useAllCgReportQuery(name)
    // console.log(cgReport?.data?.attributes);
    
    
    // const onActionClick = (record) => { 
    
    //     // navigate(`cgdetail/${record?.id}`, { state: { details: record } });

    //     navigate(`cgdetail/${record?.id}`, { state: { details: record } });
        
    //   };
 

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
        <p>{(record?.email) ? record?.email : "Apple Or Facebook User"}</p>
      )
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (_, record) => (
        <p>{(record?.phoneNumber) ? record?.phoneNumber : "Apple Or Facebook User"}</p>
      )
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      render: (_, record) => (
        <p>{record?.createdAt?.split("T")[0] ? record?.createdAt?.split("T")[0] : "N/A"}</p>
        // <p>34/04/24</p>
      )
    },
    
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
         
            {/* <BsInfoCircle  onClick={() => handleView(record)}  size={18} className="text-[red] cursor-pointer" /> */}
                  
                <button 
                onClick={() => navigate(`cgdetail/${record?._id}`)}
                 className="bg-[#62D49F] px-2 py-1 rounded-md"> view
                 </button>
            
                {/* <button 
                onClick={() => navigate(`detailscheck/${record.id}`)}
                 className="bg-[#62D49F] px-2 py-1 rounded-md">view</button> */}
              
          
      
        </Space>
      ),
    },
  ];
  
  
const onSearch = (value, _e, info) => {
  setName(value)
};
 
 
  return (
    <div className="">
       
      <div className="rounded-t-lg mt-[24px]">
        <div className="flex py-[22px] justify-between items-center">
        <div className="flex items-center gap-2">
            <p className="cursor-pointer" onClick={() => navigate('/dashboard/reporting')}> 
          <BiArrowBack />
            </p>
          <p className=" text-[24px]">CG-Reporting</p>
          </div>
          <div>
            <button onClick={() => navigate('/dashboard/reporting/seecgreport')} className="bg-[#2FA3B0] px-2 py-1 text-white rounded-lg mr-3">Cg-CgReport</button>
 
          <Search style={{
            width:"200px",
            marginLeft:'4px'
          }} placeholder="input search text" onSearch={onSearch} enterButton />
          </div>
        </div>
       {
        error ? (
          <p>{error?.data?.message}</p>
        ) : (
              <div>
                  <Table
         pagination={{
          total: cgReport?.data?.attributes.length,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          defaultPageSize: 10,
          showSizeChanger: false,
          itemRender: (current, type, originalElement) => {
            if (type === 'prev') {
              return <Button className={styles.paginationButton}>Back</Button>;
            }
            if (type === 'next') {
              return <Button className={styles.paginationButton}>Next</Button>;
            }
            return originalElement;
          },
          className: styles.paginationCenter,
        }}
      
          columns={columns}
          dataSource={cgReport?.data?.attributes}
          // dataSource={dataSource}
        />
              </div>
        )
       }
      

      </div>
     
    </div>
  );
};

export default CgRepoting;
