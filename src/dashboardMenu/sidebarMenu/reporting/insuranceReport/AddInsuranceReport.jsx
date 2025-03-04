import React, { useState } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useAddInsurencMutation } from '../../../../redux/features/reporting/AddInsurence';
import toast, { Toaster } from 'react-hot-toast';

const AddInsuranceReport = () => {
  const [reportName, setReportName] = useState('');
  const [fileList, setFileList] = useState([]);

  const [addinsurance, {isLoading, error, isError, isSuccess}] = useAddInsurencMutation()
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
   

    if (fileList.length === 0) {
      console.error('No file uploaded');
      return;
    }

    const formData = new FormData();
    formData.append('name', reportName);
    // Assuming you only need the first file in the list
    formData.append('document', fileList[0]);

    try {
      const res = await addinsurance(formData).unwrap();
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
      <Toaster reverseOrder = {false} />
      <h2 className="text-xl font-semibold mb-6">Add Insurance Reporting Form</h2>
      
      <form className="bg-white p-8 shadow-lg rounded-lg">
        {/* Reporting Name Input */}
        <div className="mb-6">
          <label htmlFor="cg-reporting-name" className="block text-gray-700 text-sm font-bold mb-2">
            Insurence-Reporting From Name
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
            <p className="text-center text-gray-500 mb-2">Drag & Drop Word/PDF Files</p>
            <div className="flex justify-center">
              {/* Ant Design Upload Button */}
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Browse File</Button>
              </Upload>
            </div>
          </div>
        </div>

        {/* Buttons (Save and Edit) */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="bg-gray-100 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none"
          >
            Edit
          </button>
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

export default AddInsuranceReport;
