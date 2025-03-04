import React, { useState, useEffect } from 'react';
import { Button, Form, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import toast, { Toaster } from 'react-hot-toast';
import { useUpdateCgReportMutation } from '../../../../redux/features/reporting/updateCg';

const EditCgReport = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const location = useLocation();
  const { document } = location.state || {};
  // console.log(document);

  const [fileList, setFileList] = useState([]);
  const [updateCgReport, { isLoading }] = useUpdateCgReportMutation();

  useEffect(() => {
    if (document) {
      setFileList([
        {
          uid: '-1',
          url: document?.document?.publicFileUrl,
          name: 'Existing File',
          status: 'done',
        },
      ]);
    }
  }, [document]);

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  const onFinish = async () => {
    const documentId = document?._id;

    const formData = new FormData();
    formData.append('id', documentId);

    // Append the new file if it exists
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append('document', fileList[0].originFileObj);
    }

    try {
      const res = await updateCgReport(formData).unwrap();
      toast.success('Document updated successfully');
      // console.log(res);
      navigate('/dashboard/reporting/seecgreport');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating the document');
    }
  };

  return (
    <div className="mt-8 container mx-auto px-8">
      <Toaster />
      <div className="flex justify-between mb-6">
        <Link to="/dashboard/reporting/seecgreport" className="flex items-center gap-2">
          <IoIosArrowBack className="w-8 h-8" />
          <p className="font-semibold text-[30px]">Edit Document</p>
        </Link>
      </div>
      <Form
        layout="vertical"
        form={form}
        className="bg-white shadow-lg p-6 rounded-lg"
        onFinish={onFinish}
      >
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload.Dragger
            name="files"
            fileList={fileList}
            onChange={handleFileChange}
            multiple={false}
            defaultFileList={fileList}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">PDF Files</p>
            <Button type="primary" className="mt-2 bg-[#2FA3B0]">Browse File</Button>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item className="text-right">
          <Button type="primary" htmlType="submit" className="!bg-[#2FA3B0]">
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditCgReport;
