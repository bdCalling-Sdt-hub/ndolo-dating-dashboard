
import React, { useState, useEffect } from 'react';
import { Button, Form, Input, DatePicker, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';
import { useEditLiceneCartificateMutation } from '../../../redux/features/settings/editLIcenceCartificate';

const { Option } = Select;

const EditLicensCartificate = () => {
  const navigate = useNavigate();
//   const { id } = useParams(); // Assuming you're using React Router to get the document ID from URL
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const location = useLocation();
  const { document } = location.state || {}; 

  // console.log(document);
  
//   const [editLicenceCartificate, { isLoading }] = useEditLiceneCartificateMutation();
const [editLicenceCartificate, { isLoading }] = useEditLiceneCartificateMutation()
//   const { data, isFetching } = useFetchLicenceCartificateQuery(id);

  useEffect(() => {
    if (document) {
      // Prepopulate the form with fetched document
      form.setFieldsValue({
        documentType: document.documentType,
        about: document.aboutMe,
        startDate: document.startDate ? moment(document.startDate) : null,
        expireDate: document.expireDate ? moment(document.expireDate) : null,
      });
      if (document.document) {
        setFileList([{ url: document.document, name: 'Existing File' }]);
      }
    }
  }, [document, form]);


  const handleFileChange = ({ fileList }) => setFileList(fileList);

  const onFinish = async (values) => {
    // console.log(fileList);
    
    const date = new Date(values.startDate);
    const startDate = date.toISOString().split('T')[0];

    const dateEnd = new Date(values.expireDate);
    const expireDate = dateEnd.toISOString().split('T')[0];

    const formData = new FormData();
    formData.append('aboutMe', values.about);
    formData.append('documentType', values.documentType);
    formData.append('startDate', startDate);
    formData.append('expireDate', expireDate);
    formData.append('id', document?._id);

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append('document', fileList[0].originFileObj);
    }

    try {
      const res = await editLicenceCartificate(formData).unwrap();
      if (res?.statusCode === 200) {
        toast.success(res?.message);
        setTimeout(() => {
          navigate('/dashboard/settings/licenscartificate');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

//   if (isFetching) {
//     return <div>Loading...</div>;
//   }

  return (
    <div className="mt-8 container mx-auto px-8">
      <Toaster reverseOrder={false} />
      <div className="flex justify-between mb-6">
        <Link to='/dashboard/settings/licenscartificate' className="flex items-center gap-2">
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
        {/* Document Type */}
        <Form.Item
          name="documentType"
          label="Document Type"
          rules={[{ required: true, message: 'Please select document type' }]}
        >
          <Select placeholder="Select Document Type" className="w-full h-10">
            <Option className="h-12" value="licence">licence</Option>
            <Option className="h-12" value="certicfacte">certificate</Option>
          </Select>
        </Form.Item>

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
            <p className="ant-upload-text">Drag & Drop Image</p>
            <Button type="primary" className="mt-2">Browse File</Button>
          </Upload.Dragger>
        </Form.Item>

        {/* About me */}
        <Form.Item
          name="about"
          label="About me"
          rules={[{ required: true, message: 'Please enter some details' }]}
        >
          <Input.TextArea rows={4} placeholder="Tell us about this document" />
        </Form.Item>

        {/* Start and Expire Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select start date' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            name="expireDate"
            label="Expire Date"
            rules={[{ required: true, message: 'Please select expire date' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        </div>

        {/* Update Button */}
        <Form.Item className="text-right">
          <Button type="primary" htmlType="submit" className="bg-teal-500">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditLicensCartificate;
