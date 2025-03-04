// import { Button, Col, Form, Input, InputNumber, Row, Upload } from 'antd';
// import TextArea from 'antd/es/input/TextArea';
// import React, { useState } from 'react'; 
 
// import { useLocation, useNavigate } from 'react-router-dom';
// import { MdArrowBack, MdArrowForward } from 'react-icons/md';
// import { IoIosArrowBack } from 'react-icons/io';
// import { useEditServiceMutation } from '../../../redux/features/service/editService';

// const EditService = () => {
//     const navigate = useNavigate()
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);

//     const serviceId = queryParams.get('serviceId');
//     const serviceName = queryParams.get('serviceName');
//     const serviceIcone = queryParams.get('serviceIcone');
//     const [form] = Form.useForm();
//      const initialData = {
//       serviceIcone,
//       serviceName,
     
//     }
//     console.log(initialData);
    

//     const [error, setError] = useState('')
//     const [image, setImage] = useState(null);
    
//     const [serviceEdit, {isLoading}] = useEditServiceMutation() 

//     // const handleEdit = (values) => {
//     // //  console.log(values);
//     //  const data = {
//     //   serviceId : serviceId,
//     //   serviceIcone : image,
//     //   serviceName : values.serviceName
//     //  }
//     //  console.log(data);
     
     
//     // }
      
//       const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setImage(file);
//       };
     
//     return (
//         <div className='mt-6 '>
//               {/* <Toaster position="top-center" reverseOrder={false} /> */}
//               <div className='flex gap-2 items-center my-12'>
//             <p> 
//               <IoIosArrowBack onClick={() => navigate('/dashboard/service')} className='text-2xl cursor-pointer' />
                
//               </p>
//             <p className='font-medium text-3xl'>Add new Services</p>
//               </div>
//          <Form form={form}  
//         //  onFinish={handleEdit}
//           className='border-[#2FA3B0] border p-8 rounded-md w-[60%] mx-auto'
//           layout="vertical"
//          >
     
//           <Form.Item
//             name="serviceName"
//             label={
//                 <span className=" text-[16px] font-medium">Service Name</span>
//               }
//             rules={[{ required: true, message: 'Please enter the service name' }]}
//           >
//             <Input style={{
//                     height: "40px", 
//                     outline: "none", 
//                     border: '1px solid green'
//                   }} placeholder="Enter service name" />
//           </Form.Item>
       
//       <Form.Item
//               name="serviceIcone"
//               label={
//                 <span className=" text-[16px] font-medium">Uploard Image</span>
//               }
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your Uploard Image!",
//                 },
//               ]}
//             >
//               <input
//                 size="large"
//                 onChange={handleImageChange}
//                 placeholder="Uploard Image"
//                 name="serviceIcone"
//                 type="file"
//                 className="w-full pl-4 h-14 border pt-3 mt-4 border-[green] rounded-md"
//               />
//             </Form.Item> 
       
     
//       <Form.Item className='text-right'>
//         <Button   type="primary"  className=" mt-4 h-[36px] !bg-[#69C0BE] !text-black" htmlType="submit">
//           Add Service
//         </Button>
//       </Form.Item>
//     </Form>
//         </div>
//     );
// };

// export default EditService;
import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { useEditServiceMutation } from '../../../redux/features/service/editService';
import toast, { Toaster } from 'react-hot-toast';

const EditService = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const serviceId = queryParams.get('serviceId');
    const serviceName = queryParams.get('serviceName');
    const serviceIcone = queryParams.get('serviceIcone');
    const [form] = Form.useForm();
    const [error, setError] = useState('');
    const [image, setImage] = useState(serviceIcone);
  //  console.log(serviceIcone);
   
    const [serviceEdit, { isLoading }] = useEditServiceMutation();
   
    // Set initial form values
    useEffect(() => {
        form.setFieldsValue({
            serviceName: serviceName || '',
            serviceIcone: image || " ",
            // Do not set `serviceIcone` here; it's managed by file input
        });
    }, [form, serviceName]);

    const handleEdit = async (values) => {
        const data = {
            serviceId: serviceId,
            serviceIcone: image, // Only if image is updated
            serviceName: values.serviceName,
        };
        // console.log(data);
        
      const formData = new FormData()
      formData.append('serviceId', data.serviceId),
      formData.append('serviceName', data.serviceName),
      formData.append('serviceIcone', data.serviceIcone)
      // console.log(formData);

      try{
        const res = await serviceEdit(formData).unwrap();
        // console.log(res);
        if(res?.statusCode == 200){
          toast.success(res?.message)
        }
        setTimeout(() => {
          
          navigate('/dashboard/service')
        }, 1000);
        
      }catch(error){
        console.log(error);
        
      }     
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <div className='mt-6 '>
          <Toaster reverseOrder = {false} />
            <div className='flex gap-2 items-center my-12'>
                <p> 
                    <IoIosArrowBack onClick={() => navigate('/dashboard/service')} className='text-2xl cursor-pointer' />
                </p>
                <p className='font-medium text-3xl'>Edit Service</p>
            </div>
            <Form 
                form={form}  
                onFinish={handleEdit}
                className='border-[#2FA3B0] border p-8 rounded-md w-[60%] mx-auto'
                layout="vertical"
            >
                <Form.Item
                    name="serviceName"
                    label={<span className=" text-[16px] font-medium">Service Name</span>}
                    rules={[{ required: true, message: 'Please enter the service name' }]}
                >
                    <Input 
                        style={{ height: "40px", outline: "none", border: '1px solid green' }} 
                        placeholder="Enter service name" 
                    />
                </Form.Item>

                <Form.Item
                    label={<span className=" text-[16px] font-medium">Upload Image</span>}
                >
                    <input
                        size="large"
                        onChange={handleImageChange}
                        placeholder="Upload Image"
                        type="file"
                        className="w-full pl-4 h-14 border pt-3 mt-4 border-[green] rounded-md"
                    />
                </Form.Item> 

                <Form.Item className='text-right'>
                    <Button 
                        type="primary"  
                        className="mt-4 h-[36px] !bg-[#69C0BE] !text-black" 
                        htmlType="submit"
                        loading={isLoading}
                    >
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditService;
