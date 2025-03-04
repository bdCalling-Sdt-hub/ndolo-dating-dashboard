import React, { useState } from 'react';
import { Input, Button } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles
import { useLocation, useNavigate } from 'react-router-dom';
import { useUpdateContactMutation } from '../../../../redux/features/contactus/updateContact';
import toast, { Toaster } from 'react-hot-toast';
import { useGetContactQuery } from '../../../../redux/features/contactus/getContact';
import { MdArrowBackIos } from 'react-icons/md';

const EditContact = () => {
    const navigate = useNavigate()
    const [isEditable, setIsEditable] = useState(false);
   const location = useLocation()
   const queryParams = new URLSearchParams(location.search);
   const id = queryParams.get('id')
//    console.log(id);
   
   const {data: contact} = useGetContactQuery()
//    console.log(contact?.data?.attributes[0].phone);
   
   const [email, setEmail] = useState(contact?.data?.attributes[0].email);
   const [phoneNumber, setPhoneNumber] = useState(contact?.data?.attributes[0].phone);
    const [updateContact, {isLoading}] = useUpdateContactMutation()

    const handleEdit = async() => {
      const data = {
            email,
            phone: phoneNumber,
            id: id
         }
    try{
        const res = await updateContact(data).unwrap();
        // console.log(res);
        if(res?.statusCode == 200){
            toast.success(res?.message)
        }
        setTimeout(() => {
            
            navigate('/dashboard/settings/contactus') 
        }, 1000);
    }catch(error){
        console.log(error);
        toast.error(error?.data?.message)
        
    }
           
    };

    return (
        <div className="flex justify-cente mt-20 items-center">
            <Toaster reverseOrder= {false}  />
            <div className="w-[70%] mx-auto p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl mb-4 flex items-center">
                    <MdArrowBackIos className='cursor-pointer' onClick={() => navigate('/dashboard/settings/contactus')} />
                   Update Contact Us</h2>
                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-2">Support Email</label>
                        <Input
                            type="email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        //   defaultValue={contact?.data?.attributes[0]?.email}
                          
                            style={{ padding: '12px', fontSize: '16px' }}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Support Phone Number</label>
                        <div className="flex items-center">
                            <Input
                                className="ml-2"
                                value={phoneNumber} 
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                style={{ padding: '12px', fontSize: '16px' }} 
                                
                            />
                        </div>
                    </div>
                    <div onClick={handleEdit} className="w-full !bg-[#69C0BE] text-white text-center py-3 cursor-pointer rounded-md">
                       
                        Update
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditContact;
