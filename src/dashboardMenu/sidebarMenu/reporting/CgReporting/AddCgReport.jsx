 

import React, { useState } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useAddCgReportMutation } from '../../../../redux/features/reporting/addCg';
import toast, { Toaster } from 'react-hot-toast';
import { MdArrowBackIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const AddCgReport = () => {
  const [reportName, setReportName] = useState('');
  const [fileList, setFileList] = useState([]); // State to store the uploaded file(s)
  const [addCgreport] = useAddCgReportMutation();
 const navigate = useNavigate()
  // File Upload Props (Ant Design)
  const uploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false; // Prevent automatic upload
    },
    onRemove: (file) => {
      setFileList(fileList.filter((item) => item !== file));
    },
  };

  const handleSave = async () => {
    // console.log('Report Name:', reportName);

    if (fileList.length === 0) {
      console.error('No file uploaded');
      return;
    }

    const formData = new FormData();
    formData.append('name', reportName);
    // Assuming you only need the first file in the list
    formData.append('document', fileList[0]);

    try {
      const res = await addCgreport(formData).unwrap();
      // console.log(res);
      if(res?.statusCode == 200){
        toast.success(res?.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error)
    }
  };

  return (
    <div className="max-w-[70%] mx-auto p-8">
      <Toaster reverseOrder = {false}></Toaster>
      <div className='flex items-center gap-2'>
        
      <h2 className="text-xl font-semibold mb-6 flex items-center">
      <span>
      <MdArrowBackIos className='cursor-pointer' onClick={() => navigate('/dashboard/reporting/cgreporting')} /> 
        </span> 
        Add CG Reporting Form</h2>
      </div>

      <form className="bg-white p-8 shadow-lg rounded-lg">
        {/* Reporting Name Input */}
        <div className="mb-6">
          <label htmlFor="cg-reporting-name" className="block text-gray-700 text-sm font-bold mb-2">
            CG Reporting Form Name
          </label>
          <input
            type="text"
            id="cg-reporting-name"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter the report name"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
          />
        </div>

        {/* File Upload Section */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload File
          </label>
          <div className="border-2 border-dashed border-gray-300 p-4 py-12 rounded-lg">
            <p className="text-center text-gray-500 mb-2">Upload Word/PDF Files</p>
            <div className="flex justify-center">
              {/* Ant Design Upload Button */}
              <Upload {...uploadProps} fileList={fileList}>
                <Button icon={<UploadOutlined />}>Browse File</Button>
              </Upload>
            </div>
          </div>
        </div>

        {/* Buttons (Save and Edit) */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCgReport;
