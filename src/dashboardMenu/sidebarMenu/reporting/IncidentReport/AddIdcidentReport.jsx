import React, { useState } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AddIncidentReport = () => {
  const [reportName, setReportName] = useState('');

  // File Upload Props (Ant Design)
  const uploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // Example action
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        // console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        console.error(`${info.file.name} file upload failed`);
      }
    },
  };

  const handleSave = () => {
    console.log('Report Name:', reportName);
    // Handle form submission logic here
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-xl font-semibold mb-6">Add Incident Reporting Form</h2>
      
      <form className="bg-white p-8 shadow-lg rounded-lg">
        {/* Reporting Name Input */}
        <div className="mb-6">
          <label htmlFor="cg-reporting-name" className="block text-gray-700 text-sm font-bold mb-2">
            CG Reporting From Name
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
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
            <p className="text-center text-gray-500 mb-2">Upload Word/PDF Files</p>
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

export default AddIncidentReport;
