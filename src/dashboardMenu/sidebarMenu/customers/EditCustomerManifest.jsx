import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import { MdArrowBackIos } from 'react-icons/md';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useEditmanifestMutation } from '../../../redux/features/manifest/editmanifest';

const { Option } = Select;

const EditCustomerManifest = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const location = useLocation();
  const {manifest} = location.state || {}
  // console.log(manifest?._id);
  
const [updateManifest, {isLoading}] = useEditmanifestMutation()
  // Set initial form values when manifest data is loaded
  useEffect(() => {
    if (manifest) {
      form.setFieldsValue({
        manifestName: manifest?.manifestName,
        totalmanifest: manifest?.totalmanifest
      });
    }
  }, [manifest, form]);

  // Function to handle form submission
  const onFinish = async (values) => {
    // console.log('Form Values:', values);
    const data = {
      id: manifest?._id,
      manifestName:values?.manifestName,
      totalmanifest:values?.totalmanifest
    }
    
    
    try {
      const res = await updateManifest(data).unwrap();
      if (res?.statusCode === 200) {
        toast.success(res?.message);
        setTimeout(() => {
          
          navigate('/dashboard/customers/customermanifest');  
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to update the manifest');
    }
  };

  return (
    <div className="p-4">
      <Toaster />
     
        <Form
          form={form}
          name="edit-manifest-form"
          onFinish={onFinish} // Handle form submission
          layout="vertical"
        >
          {/* Header Section */}
          <div className="mb-6 flex items-center">
            <MdArrowBackIos className="cursor-pointer h-6 w-6" onClick={() => navigate('/dashboard/customers/customermanifest')} />
            <h1 className="text-gray-700 font-medium text-2xl">Edit Customer Manifest</h1>
          </div>

          {/* Manifest Name Input Section */}
          <Form.Item
            label="Manifest Name"
            name="manifestName"
            rules={[{ required: true, message: 'Please enter the manifest name!' }]}
          >
            <Input placeholder="Enter manifest name" />
          </Form.Item>

          {/* Total Number Input Section */}
          <Form.Item
            label="Total Number"
            name="totalmanifest"
            rules={[{ required: true, message: 'Please input a number!' }]}
            style={{ width: '100%' }}
          >
            <InputNumber min={1} max={40} placeholder="Enter a number" style={{ width: '100%' }} />
          </Form.Item>

          {/* Save Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full py-2 !bg-black text-white rounded-md" 
            loading={isLoading}
            
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      
    </div>
  );
};

export default EditCustomerManifest;
