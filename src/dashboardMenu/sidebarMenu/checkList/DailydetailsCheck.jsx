 


import React, { useEffect, useState } from "react";
import { BsCalendar3 } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useSingleChecklistQuery } from "../../../redux/features/checklist/singleChecklist";
import url from "../../../redux/api/baseUrl";
import { DatePicker, Space } from "antd";
import { MdArrowBackIos } from "react-icons/md";

const DailydetailsCheck = () => {
  const { id } = useParams();
 const navigate = useNavigate()

  const [date, setDate] = useState("");  

  const onChange = ( dateString) => {
    setDate(dateString); // Set the selected date in the required format
  };


  const { data: singleCheck, error } = useSingleChecklistQuery({id , date});
  // console.log(singleCheck);
   

  return (
    <div className="p-6 bg-gray-50">
    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-semibold flex items-center">
        <MdArrowBackIos className="cursor-pointer" onClick={() => navigate('/dashboard/dailychecklist')} />
        Daily Check list</h1>
      
        <Space direction="vertical">
              <DatePicker onChange={onChange}/>
            </Space>
    
    </div>

    {/* Checklist Cards */}
    {
      error ? (
        <div>{error?.data?.message}</div>
      ) : (
        <div> 
          {singleCheck?.data?.attributes?.map((details, index) => {
            const user = new Date(details.createdAt);
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
      
            return (
      
      <div key={details._id} className="bg-[#E0F7F9] rounded-lg p-6 shadow-md border mb-6">
        {/* Report Details */}
        <div className="mb-6 space-y-2 w-[40%]">
          <div className="grid grid-cols-2">
            <p className="text-sm font-semibold"><strong>Report Date:</strong></p>
            <p className="text-sm text-left">{repoterDate}</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm font-semibold"><strong>Time:</strong></p>
            <p className="text-sm text-left">{repoterTime}</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm font-semibold"><strong>Weather:</strong></p>
            <p className="text-sm text-left">{details.weather}</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm font-semibold"><strong>User Name:</strong></p>
            <p className="text-sm text-left">{details.reporter?.name}</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm font-semibold"><strong>Email:</strong></p>
            <p className="text-sm text-left">{details.reporter?.email}</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm font-semibold"><strong>Equipment Type:</strong></p>
            <p className="text-sm text-left">{details.equipmentType?.equipmentName}</p>
          </div>
        </div>
      
        {/* Equipment Item Buttons */}
        <div className="mb-6">
          <strong className="text-sm">Item List:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            {details.equipmentItmesList?.map((item, idx) => (
              <span key={idx} className="bg-green-500 text-white px-4 py-2 rounded-full text-xs">
                {item}
              </span>
            ))}
          </div>
        </div>
      
        {/* Notes Section */}
        <div className="mb-6">
          <p className="text-sm"><strong>Notes:</strong></p>
          <p className="text-xs text-gray-700 mt-1 leading-relaxed">{details.notes}</p>
        </div>
      
        {/* Images */}
        <div className="mb-6 flex space-x-2">
          {details.chacklistImage?.map((image, idx) => (
            <img
              key={idx}
              src={url + image?.publicFileUrl}
              alt="Checklist Image"
              className="w-32 h-20 rounded-lg object-cover border-2 border-gray-300"
            />
          ))}
        </div>
      
        {/* E-signature Section */}
        <div className="mb-6">
          <p className="text-sm"><strong>E-Sign:</strong></p>
          <div className="border border-gray-300 p-4 mt-2 rounded-lg w-48 h-20 flex items-center justify-center">
            {details.reporter?.eSign?.publicFileUrl ? (
              <img className="h-16 w-40" src={url + details.reporter?.eSign?.publicFileUrl} alt="E-Sign" />
            ) : (
              <p className="italic text-gray-400">Signature not available</p>
            )}
          </div>
        </div>
      </div>
      
      
            
      
            
            
            );
          })}
        </div>
    
      )
    }

  


  </div>
  );
};

export default DailydetailsCheck;
