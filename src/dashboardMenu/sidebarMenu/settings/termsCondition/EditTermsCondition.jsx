import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Button, Form } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { useGetTermConditionQuery } from "../../../../redux/features/settings/getTermCondition";
import { useUpdateTermconditionMutation } from "../../../../redux/features/settings/updateTermcondition";

const EditTermsCondition = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: termsConditon } = useGetTermConditionQuery();
  const editor = useRef(null);

  const [content, setContent] = useState("");
  const [updateTermcondition, { isLoading }] = useUpdateTermconditionMutation();

  useEffect(() => {
    if (termsConditon) {
      setContent(termsConditon?.data?.attributes[0]?.content || "");
    }
  }, [termsConditon]);

  const dataContent = {
    content: content,
  };

  const handleEditTermCondition = async () => {
    try {
      const res = await updateTermcondition(dataContent).unwrap();
      toast.success(res?.message);
      setTimeout(() => {
        navigate("/dashboard/settings/termcondition");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update terms and conditions.");
    }
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
      <Link to="/dashboard/settings/termcondition" className="flex items-center gap-2">
        <FaCircleArrowLeft className="!text-[#430750] w-8 h-8" />
        <p className="font-semibold sm:text-[30px] text-xl">Edit Term&Condition</p>
      </Link>

      <Form
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 40 }}
        layout="vertical"
        onFinish={handleEditTermCondition}
      >
        <div className="mt-6">
          <JoditEditor
            ref={editor}
            value={content}
            onChange={newContent => setContent(newContent)}
          />
        </div>
        <div className="text-right mt-6">
          <Form.Item>
            <Button
              loading={isLoading}
              htmlType="submit"
              className="h-[44px] w-[260px] !text-white !bg-[#430750] rounded-[8px]"
            >
              Save Change
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default EditTermsCondition;
