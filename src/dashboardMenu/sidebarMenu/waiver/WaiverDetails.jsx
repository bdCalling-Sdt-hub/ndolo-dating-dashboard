import React, { useState } from "react";
import { CalendarOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, DatePicker, Space } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import url from "../../../redux/api/baseUrl";
import { useDetailsWaiverQuery } from "../../../redux/features/waiver/detailsWaiver";

const WaiverDetails = () => {

  const navigate = useNavigate()

 const {id} = useParams()
//  console.log(id);
const [date, setDate] = useState("");  

const onChange = ( dateString) => {
  setDate(dateString); // Set the selected date in the required format
};

 
const {data: details , error} = useDetailsWaiverQuery({id, date})
// console.log(details?.data?.attributes);

 
  const user = new Date(details?.createdAt);
  const repoter = new Date(details?.referUserId?.createdAt);
  
  // Format both dates
  const userDate = user.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const userTime = user.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  const repoterDate = repoter.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const repoterTime = repoter.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  console.log(repoterTime, repoterTime);
  
  return (
    <div className="  bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full ">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-xl font-semibold text-gray-700">
            <LeftOutlined onClick={() => navigate('/dashboard/waiver')} className="mr-2" />
            Waiver Report
          </div>
          
          <Space direction="vertical">
              <DatePicker onChange={onChange}/>
            </Space>
        </div>

        {/* Content */}

 {
  error ? (
    <div>{error?.data?.message}</div>
  ) : (
    <div>
{
  details?.data?.attributes?.map(detail => {
    const user = new Date(detail.createdAt);
    const repoterDate = user.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const repoterTime = user.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  return(
    <div key={detail._id} className="grid grid-cols-2 gap-4 border mt-6 border-gray-300 p-4 rounded-lg">
    {/* Reporter Section */}
    <div className="border-r border-gray-300 pr-4">
      <div className="mb-2 flex  items-center ml-36">
        <span className="font-bold w-[30%]">Report Date:</span> 
        <p> 
         {repoterDate}
        </p>
      </div>

      <div className="mb-2 flex  items-center ml-36">
        <span className="font-bold w-[30%]">Time:</span> 
        <p> 
       {repoterTime}
        </p>
      </div>

      <div className="mb-2 flex items-center ml-36">
        <span className="font-bold w-[30%]">Reporter Name:</span> 
        <p> 
        {detail?.referUserId?.name}
        </p>
      </div>

      <div className="mb-2 flex items-center ml-36">
        <span className="font-bold w-[30%]">Email:</span> 
        <p> 
        {detail?.referUserId?.email}
        </p>
      </div>

      <div className="mb-2 flex items-center ml-36 "> 
        <div className="w-[30%]">  
        <span className="font-bold w-[30%]">E-Sign:</span> 
        </div>
        <div className="border border-gray-200 p-2 mt-2 inline-block w-40">
          {/* Placeholder for the signature */}
          <img
            src= {url + detail?.referUserId?.eSign?.publicFileUrl}
            alt="E-Sign"
           className="w-36 h-16"
          />
        </div>
      </div>
      

    </div>

    {/* User Section */}
    <div className="  border-gray-300 pr-4">
      <div className="mb-2 flex  items-center ml-36">
        <span className="font-bold w-[30%]">Report Date:</span> 
        <p> 
        {repoterDate}
        </p>
      </div>

      <div className="mb-2 flex  items-center ml-36">
        <span className="font-bold w-[30%]">User name:</span> 
        <p> 
        {detail?.name}
        </p>
      </div> 
      
      <div className="mb-2 flex items-center ml-36 "> 
        <div className="w-[30%]">  
        <span className="font-bold w-[30%]">E-Sign:</span> 
        </div>
        <div className="border border-gray-200 p-2 mt-2 inline-block w-40">
          {/* Placeholder for the signature */}
          <img
            src={url + detail?.eSign?.publicFileUrl}
            alt="E-Sign"
            className="w-24 h-16"
          />
        </div>
    
      </div>
      
   
    </div>
  </div>
  );


  })
}
    </div>
  )
 }



       

      </div>
 
    </div>
  );
};

export default WaiverDetails;
