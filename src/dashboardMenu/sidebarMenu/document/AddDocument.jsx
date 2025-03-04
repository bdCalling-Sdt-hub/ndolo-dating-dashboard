 
import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import { useAddDocumentMutation } from '../../../redux/features/settings/addDocument';
import toast, { Toaster } from 'react-hot-toast';
// import 'antd/dist/antd.css';

const { Option } = Select;

const AddDocument = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const [addDocument, isLoading] = useAddDocumentMutation()

  const handleFileChange = ({ fileList }) => setFileList(fileList);

const onFinish = async (values) => { 
    console.log(fileList[0].originFileObj);

    const formData = new FormData()
    if(fileList){ 
      formData.append('document', fileList[0]?.originFileObj)
    }
    try{
      const res = await addDocument(formData).unwrap();
      if(res?.statusCode == 200){
        toast.success(res?.message)
      }
   navigate('/dashboard/settings/document')
    }catch(error){
      console.log(error);
      
    }
    
} 
  return (
    <div className=" mt-8 container mx-auto px-8">
      <Toaster />
      <div className="flex justify-between mb-6">
      <Link to ='/dashboard/settings/document'className="flex items-center gap-2">
      <IoIosArrowBack className="  w-8 h-8"/>
        <p className="font-semibold text-[30px]">Upload Document</p>
      </Link>
      </div>
      <Form
        layout="vertical"
        form={form}
        className="bg-white shadow-lg p-6 rounded-lg"
        onFinish={onFinish}
      >
        {/* Document Type */}
        

        {/* File Upload */}
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={handleFileChange}
        >
          <Upload.Dragger name="files" fileList={fileList} onChange={handleFileChange} multiple={false}>
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">Drag & Drop Image/Word/PDF Files</p>
            <Button type="primary" className="mt-2 bg-[#2FA3B0]">Browse File</Button>
          </Upload.Dragger>
        </Form.Item>
 
     
       
        <Form.Item className="text-right">
          <Button type="primary" htmlType="submit" className="!bg-[#2FA3B0]">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddDocument;
