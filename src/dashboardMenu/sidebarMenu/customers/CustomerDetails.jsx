import React, { useState } from 'react';
import { Button, DatePicker, Space } from 'antd';
import { MdArrowBackIos } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { useSignleCustomerQuery } from '../../../redux/features/manifest/singleCustomer';
import url from '../../../redux/api/baseUrl';
 

const CustomerDetails = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    // console.log(id);

    const [date, setDate] = useState("");  

  const onChange = ( dateString) => {
    setDate(dateString); // Set the selected date in the required format
  };

const {data: singleCustomer,error, isLoading} = useSignleCustomerQuery({id , date})
// console.log(singleCustomer?.data?.attributes); 

    
  return (
    <div>

    <div className="p-6  w-[90%] mx-auto rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">  <span><MdArrowBackIos className='cursor-pointer' onClick={() => navigate('/dashboard/customers')} /></span> Customer Manifest Details</h2>
        <Space direction="vertical">
              <DatePicker onChange={onChange}/>
            </Space>
      </div>

      {/* Manifest Details */}
      {
        error ? (
          <div className='text-red-500 font-semibold'>{error?.data?.message}</div>
        ) : <div>

        {singleCustomer?.data?.attributes?.map((details, index) => {
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
   
   <div key={details._id} className=" rounded-lg p-6  mb-6">
     {/* Report Details */}
     <div className='border border-gray-300 bg-teal-100 p-6 rounded-md mb-4'>
   
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
         <p className="text-sm font-semibold"><strong>Repoter Name:</strong></p>
         <p className="text-sm text-left">{details.reporter?.name}</p>
       </div>
       <div className="grid grid-cols-2">
         <p className="text-sm font-semibold"><strong>Email:</strong></p>
         <p className="text-sm text-left">{details.reporter?.email}</p>
       </div>
       <div className="grid grid-cols-2">
         <p className="text-sm font-semibold"><strong>Equipment Type:</strong></p>
         <p className="text-sm text-left">{details.equipmentType?.manifestName}</p>
       </div>
     </div>
   
     {/* Equipment Item Buttons */}
     <div className="mb-6">
       <strong className="text-sm">Customer Name:</strong>
       <div className="flex flex-wrap gap-2 mt-2">
         {details.customerName?.map((item, idx) => (
           <span key={idx} className="bg-green-500 text-white px-4 py-2 rounded-full text-xs">
             {item}
           </span>
         ))}
       </div>
     </div> 
      
      
   {/*  
     <div className="mb-6">
       <p className="text-sm"><strong>E-Sign:</strong></p>
       <div className="border border-gray-300 p-4 mt-2 rounded-lg w-48 h-20 flex items-center justify-center">
         {details.reporter?.eSign?.publicFileUrl ? (
           <img className="h-16 w-40" src={url + details.reporter?.eSign?.publicFileUrl} alt="E-Sign" />
         ) : (
           <p className="italic text-gray-400">Signature not available</p>
         )}
       </div>
     </div> */}
   
     </div>
   
   
   
   {
       details?.waiverlistId ? <div className="flex justify-center items-center">
       <div className="border border-gray-300 rounded-lg w-full p-8 bg-white shadow-lg grid grid-cols-2 gap-4">
         {/* Left side */}
         <div className="flex flex-col space-y-4 w-[60%]">
           <div className="grid grid-cols-2">
             <span className="font-semibold">Report Date:</span>
             <span >{repoterDate}</span>
           </div>
           <div className="grid grid-cols-2">
             <span className="font-semibold">Time:</span>
             <span >{repoterTime}</span>
           </div>
           <div className="grid grid-cols-2">
             <span className="font-semibold">Reporter Name:</span>
             <span >{details.reporter?.name}</span>
           </div>
           <div className="grid grid-cols-2">
             <span className="font-semibold">Email:</span>
             <span  >{details.reporter?.email}</span>
           </div>
           
         </div>
        
         {/* Right side */}
         <div className="flex  flex-col space-y-4 w-[60%]">
           <div className="grid grid-cols-2">
             <span className="font-semibold">Report Date:</span>
             <span>{repoterDate}</span>
           </div>
           <div className="grid grid-cols-2">
             <span className="font-semibold">User Name:</span>
             <span>{details?.waiverlistId?.name}</span>
           </div>
           <div className="mb-6">
     <p className="text-sm"><strong>E-Sign:</strong></p>
     <div className="border border-gray-300 p-4 mt-2 rounded-lg w-48 h-20 flex items-center justify-center">
       {details?.waiverlistId?.eSign?.publicFileUrl ? (
         <img className="h-16 w-40" src={url + details?.waiverlistId?.eSign?.publicFileUrl} alt="E-Sign" />
       ) : (
         <p className="italic text-gray-400">Signature not availablee</p>
       )}
     </div>
   </div>
         </div>
       </div>
     </div> : ''
   }
       
         
   
   
   </div>
   
    
         );
       })}

   </div>
      }

 


    </div>
    </div>
  );
};

export default CustomerDetails;
