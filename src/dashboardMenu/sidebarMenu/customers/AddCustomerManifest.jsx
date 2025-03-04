import React from 'react';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import { MdArrowBackIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAddMenifestMutation } from '../../../redux/features/manifest/addMenifest';
import toast, { Toaster } from 'react-hot-toast';

const { Option } = Select;

const AddCustomerManifest = () => {
    const navigate = useNavigate()
  // Function to handle form submission
  const [addmanifest, {isLoading}] = useAddMenifestMutation()
  const onFinish = async(values) => {
    // console.log('Form Values:', values);
    try{
      const res = await addmanifest(values).unwrap();
      if(res?.statusCode == 200){
        toast.success(res?.message)
      }
      navigate('/dashboard/customers/customermanifest')
    }catch(error){
      console.log(error);
      
    }
    

  };

  return (
    <div className="p-4">
      <Toaster />
      <Form
        name="add-equipment-form"
        onFinish={onFinish} // Handle form submission
        layout="vertical"
      >
        {/* Header Section */}
        <div className="mb-6 flex items-center ">
            <MdArrowBackIos className='cursor-pointer h-6 w-6' onClick={() => navigate('/dashboard/customers/customermanifest')} /> 
          <h1  className="text-gray-700 font-medium text-2xl">
                Add Customer Manifest
          </h1>
        </div>

        {/* Equipment Name Input Section */}
        <Form.Item
          label="Manifest Name"
          name="manifestName"
          rules={[{ required: true, message: 'Please enter the equipment name!' }]}
        >
          <Input placeholder="Enter equipment name" />
        </Form.Item>

        {/* Total Number Input Section */}
        <Form.Item
  label="Total Number Input"
  name="totalmanifest"
  rules={[{ required: true, message: 'Please input a number!' }]}
  style={{ width: '100%' }}  // Apply w-full equivalent here
>
  <InputNumber min={1} max={40} placeholder="Enter a number" style={{ width: '100%' }} />
</Form.Item>

        {/* Save Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full py-2 !bg-black text-white rounded-md">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddCustomerManifest;
