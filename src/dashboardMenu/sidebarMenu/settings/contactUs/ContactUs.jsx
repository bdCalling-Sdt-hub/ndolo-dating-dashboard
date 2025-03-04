import React, { useState } from 'react';
import { Input, Button, Select } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles
import { useNavigate } from 'react-router-dom';
import { useGetContactQuery } from '../../../../redux/features/contactus/getContact';
import { MdArrowBackIos } from 'react-icons/md';

const ContactUs = () => {
 
  
   const navigate = useNavigate()

const {data: contact, isLoading} = useGetContactQuery()
  

 

    return (
        <div className="flex justify-cente mt-20 items-center">
            <div className=" w-[100%] mx-auto p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl mb-4 flex items-center">
                    <MdArrowBackIos className='cursor-pointer' onClick={() => navigate('/dashboard/settings')} />
                    Contact Us</h2>
                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-2">Support Email</label>
                        <Input
                            type="email"
                            value={contact?.data?.attributes[0]?.email}
                            onChange={(e) => setEmail(e.target.value)}
                            readOnly
                            style={{ fontSize: '16px'}}
                            
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Support Phone Number</label>
                        <div className="flex items-center">
                             
                            <Input
                                className="ml-2"
                                value={contact?.data?.attributes[0]?.phone}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                style={{fontSize: '16px'}}
                                readOnly
                                 
                            />
                        </div>
                    </div>
                    {/* <div onClick={() => navigate(`editcontact?id=${contact?.data?.attributes[0]?._id}`)} className="w-full !bg-[#69C0BE] text-white text-center py-3 cursor-pointer rounded-md">
                    Edit
                   </div> */}
                    
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
