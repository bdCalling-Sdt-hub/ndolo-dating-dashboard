

import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Button, Form } from "antd";
// import toast, { Toaster } from "react-hot-toast";
import { useGetPrivacyPolicyQuery } from "../../../../redux/features/settings/privacyPolicy";
import { useUpdatePrivacyMutation } from "../../../../redux/features/settings/updateprivacy";
import { ToastContainer, toast } from "react-toastify";

const EditPrivacyPolicy = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');



  // console.log(privacy?.data?.attributes[0]?.content);

  const editor = useRef(null);
  const navigate = useNavigate();

  const { data: privacy } = useGetPrivacyPolicyQuery();
  const [editprivacy, { isLoading }] = useUpdatePrivacyMutation();

  const [content, setContent] = useState('');

  useEffect(() => {
    if (privacy) {
      setContent(privacy?.data?.attributes?.privacyText);
    }
  }, [privacy]);

  const privacyData = privacy?.data?.attributes[0]?.content;


  const handlePostPrivacy = async () => {


    try {
      const res = await editprivacy({ content: content }).unwrap();
      // console.log(res);

      if (res?.statusCode === 200) {
        toast.success(res?.message);
      }
      setTimeout(() => {
        navigate("/dashboard/settings/privacypolicy");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  // Helper function to strip HTML tags
  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]*>?/gm, ''); // Removes all HTML tags
  };

  return (
    <div className="mt-8 sm:mx-6">

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Link to='/dashboard/settings/privacypolicy' className="flex items-center gap-2">
        <FaCircleArrowLeft className=" text-[#430750] w-8 h-8" />
        <p className=" font-semibold sm:text-[30px] text-xl">Edit Privacy Policy</p>
      </Link>
      <Form
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 40 }}
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={handlePostPrivacy}
      >
        <div className="mt-6">
          <JoditEditor
            ref={editor}
            // defaultValue={privacyData ? privacyData : ""}
            value={privacyData ? privacyData : ""}
            onBlur={(newContent) => {
              const plainText = stripHtmlTags(newContent); // Strips HTML tags
              setContent(plainText); // Sets only the plain text to content
            }}
            onChange={() => { }}
          />
        </div>
        <div className="text-right mt-6">
          <Form.Item>
            <Button
              loading={isLoading}
              htmlType="submit"
              className=" h-[44px] w-full sm:w-[260px] !text-white !bg-[#430750] rounded-[8px]"
            >
              Update Privacy
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default EditPrivacyPolicy;
