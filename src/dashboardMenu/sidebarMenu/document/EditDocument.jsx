import React, { useState, useEffect } from 'react';
import { Button, Form, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import toast, { Toaster } from 'react-hot-toast';
import { useEditDocumentMutation } from '../../../redux/features/settings/editDocument';

const EditDocument = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const location = useLocation();
  const { document } = location.state || {}; 

  const [fileList, setFileList] = useState([]);
  const [editDocument] = useEditDocumentMutation();
  const [errorr, setErrorr ] = useState('')
  useEffect(() => {
    if (document) {
      form.setFieldsValue({ /* populate with document data */ });
      // Set file list if there is an existing file
      if (document.document) {
        setFileList([{ url: document.document.publicFileUrl, name: 'Existing File' }]);
      }
    }
  }, [document]);

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  const onFinish = async (values) => {
    const documentId = document?._id;
    const formData = new FormData();

    // Append the new file if it exists
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append('document', fileList[0].originFileObj);
    }

    // Only send the request if a new file was added
   
      try {
        const res = await editDocument({ documentId: documentId, data: formData }).unwrap();
        if (res?.statusCode === 200) {
          toast.success(res?.message);
          navigate('/dashboard/settings/document');
        }
      } catch (error) {
        console.log(error);
        setErrorr(error?.data?.message)
      }
 
  };

  return (
    <div className="mt-8 container mx-auto px-8">
      <Toaster />
      <div className="flex justify-between mb-6">
        <Link to='/dashboard/settings/document' className="flex items-center gap-2">
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
       <p className='text-red-500 text-sm font-semibold'>{errorr}</p>
        <Form.Item className="text-right">
          <Button type="primary" htmlType="submit" className="!bg-[#2FA3B0]">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditDocument;
