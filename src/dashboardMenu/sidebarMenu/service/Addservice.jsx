import { Button, Col, Form, Input, InputNumber, Row, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
 
 
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';

const Addservice = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    // const [error, setError] = useState('')
    // const [image, setImage] = useState(null);
    // const [addService, {isLoading}] = useAddServivceMutation()

    // const handleSubmit = async(values) => {
    //     // console.log('Form values:', values, image);
    //     // console.log('Form values:', image);
    //     const formData = new FormData();

    //     formData.append("name", values?.name);
    //     formData.append("price", values?.price);
    //     formData.append("image", image);
    //     formData.append("description", values?.description);
     
 
    //   try{
    //     const res = await addService(formData).unwrap();
    //     // console.log(res);
    //     if(res?.code ==201){
    //         toast.success(res?.message)
    //         setTimeout(() => { 
    //             navigate("/dashboard/service")
    //         }, 1000);
    //     }
        
    //   }catch(error){
    //     console.log(error);
    //     setError(`${error?.data?.message}`)

        
    //   }


    //   };
      
      // const handleImageChange = (e) => {
      //   const file = e.target.files[0];
      //   setImage(file);
      // };
     
    return (
        <div className='mt-6 '>
              {/* <Toaster position="top-center" reverseOrder={false} /> */}
              <div className='flex gap-2 items-center my-12'>
            <p> <IoIosArrowBack onClick={() => navigate('/dashboard/service')} className='text-2xl cursor-pointer' /></p>
            <p className='font-medium text-3xl'>Add new Services</p>
              </div>
         <Form form={form}  
          className='border-[#2FA3B0] border p-8 rounded-md w-[60%] mx-auto'
          layout="vertical"
         >
     
          <Form.Item
            name="name"
            label={
                <span className=" text-[16px] font-medium">Service Name</span>
              }
            rules={[{ required: true, message: 'Please enter the service name' }]}
          >
            <Input style={{
                    height: "40px", 
                    outline: "none", 
                    border: '1px solid green'
                  }} placeholder="Enter service name" />
          </Form.Item>
       
      <Form.Item
              name="image"
              label={
                <span className=" text-[16px] font-medium">Uploard Image</span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your Uploard Image!",
                },
              ]}
            >
              <input
                // size="large"
                // onChange={handleImageChange}
                placeholder="Uploard Image"
                name="image"
                type="file"
                className="w-full pl-4 h-14 border pt-3 mt-4 border-[green] rounded-md"
              />
            </Form.Item> 
       
     
      <Form.Item className='text-right'>
        <Button   type="primary"  className=" mt-4 h-[36px] !bg-[#69C0BE] !text-black" htmlType="submit">
          Add Service
        </Button>
      </Form.Item>
    </Form>
        </div>
    );
};

export default Addservice;