import { Button, Card, Input, Modal, Pagination, Upload, Form } from "antd";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { BsCardChecklist } from "react-icons/bs";
import { ImUserPlus } from "react-icons/im";
import { HiDocumentReport } from "react-icons/hi";
import { RiShieldCheckLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { useAllServiceQuery } from "../../../redux/features/service/getAllService";
import url from "../../../redux/api/baseUrl";
 
const colors = ['#62D49F', '#FFCB0B', '#2FA3B0', '#75DFEE', '#4CAF50', '#9C27B0'];



const Service = () => {

  const navigate = useNavigate();
  const {data : allServices, isLoading,error} = useAllServiceQuery()
const imageUrl = url;
// console.log(imageUrl);

// console.log(allServices);
// console.log(error);


  
  // const handleDelete = async (id) => {
  //   try {
  //    const res = await deleteService(id).unwrap();

  //    if(res?.code == 200){
  //     toast.success(res?.message)
  //    }
  //   } catch (error) {
  //     console.error('Failed to delete the service:', error);

  //   }
  // };

  return (
    <div className="mt-6">
      {/* <Toaster position="top-center" reverseOrder = {false} /> */}
      <div className="flex items-center justify-between">
        <h1 className="flex items-center text-2xl"> <IoIosArrowBack onClick={() => navigate('/dashboard/service')} className='text-2xl cursor-pointer' />
          My Service </h1>
        
      </div>
      <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-6 sm:grid-cols-1 mt-4">
      {allServices?.data?.attributes.map((service, index) => {
        const cardBgColor = colors[index % colors.length]; // Use predefined colors here

        return (
          <div key={service?.id} className="border p-2 rounded-lg">

          <div className="border p-3 rounded-lg"  style={{ backgroundColor: cardBgColor }}>
            <div className="flex items-center justify-center h-48 rounded-md" style={{ backgroundColor: cardBgColor }}>
              <div className="text-center">
                <p className="flex items-center justify-center">
                  <img src={imageUrl + service?.serviceIcone?.publicFileUrl} alt="" />
                </p>
                <p className="font-medium mt-2">{service?.serviceName}</p>
              </div>
            </div>

          </div>

            <div 
            onClick={() => {
              const query = new URLSearchParams({
                serviceId: service?._id,
                // Add other parameters as needed
                serviceName: service?.serviceName,
                serviceIcone : service?.serviceIcone?.publicFileUrl
              }).toString();
              navigate(`editservice?${query}`);
            }}
            className="rounded-lg text-center cursor-pointer py-1 my-2" 
            style={{ backgroundColor: cardBgColor }}>
              <button
                
                className="text-[18px] text-white rounded"
              >
                Edit
              </button>
            </div>
          </div>
        );
      })}
    </div>

    </div>
  );
};

export default Service;
