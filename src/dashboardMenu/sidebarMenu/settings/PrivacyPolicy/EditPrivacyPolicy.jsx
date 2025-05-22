import React, { useEffect, useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Button, Form } from "antd";
import { useGetPrivacyPolicyQuery } from "../../../../redux/features/settings/privacyPolicy";
import { useUpdatePrivacyMutation } from "../../../../redux/features/settings/updateprivacy";
import { ToastContainer, toast } from "react-toastify";

const EditPrivacyPolicy = () => {
  const navigate = useNavigate();
  const editor = useRef(null);

  const { data: privacy, isLoading } = useGetPrivacyPolicyQuery();
  const [editPrivacy, { isLoading: isUpdating }] = useUpdatePrivacyMutation();

  const [content, setContent] = useState("");

  console.log(content);

  useEffect(() => {
    if (privacy) {
      setContent(privacy?.data?.attributes[0]?.content || "");
    }
  }, [privacy]);

  const handlePostPrivacy = async () => {
    if (!content.trim()) {
      toast.error("Content cannot be empty");
      return;
    }

    try {
      const res = await editPrivacy({ content }).unwrap();
      console.log(res);
      if (res?.code == 201) {
        toast.success("Privacy policy updated successfully");
        setTimeout(() => {
          navigate("/dashboard/settings/privacypolicy");
        }, 1000);
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to update privacy policy.");
    }
  };

  return (
    <div className="mt-8 sm:mx-6">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Link to="/dashboard/settings/privacypolicy" className="flex items-center gap-2">
        <FaCircleArrowLeft className="text-[#430750] w-8 h-8" />
        <p className="font-semibold sm:text-[30px] text-xl">Edit Privacy Policy</p>
      </Link>

      <Form
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 40 }}
        layout="vertical"
        onFinish={handlePostPrivacy}
      >
        <div className="mt-6">
          <JoditEditor
            ref={editor}
            value={content}
            onBlur={newContent => setContent(newContent)}
            // Optionally, add config to disable warnings:
            config={{ readonly: false, toolbarSticky: false }}
          />
        </div>

        <div className="text-right mt-6">
          <Form.Item>
            <Button
              loading={isUpdating}
              htmlType="submit"
              className="h-[44px] w-full sm:w-[260px] !text-white !bg-[#430750] rounded-[8px]"
              disabled={content.trim() === ""}
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
