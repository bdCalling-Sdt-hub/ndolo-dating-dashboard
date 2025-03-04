import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Button, Form, notification } from "antd";
import { useGetTermConditionQuery } from "../../../../redux/features/settings/getTermCondition";

// console.log(termsConditon?.data?.attributes?.termsText);
// import { useTearmConditonQuery, useUpdatetermConditionMutation } from "../../../redux/api/apiSlice";
// import toast, { Toaster } from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";
import { useUpdateTermconditionMutation } from "../../../../redux/features/settings/updateTermcondition";

const EditTermsCondition = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  // console.log(id);

  const { data: termsConditon } = useGetTermConditionQuery();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [updateTermcondition, { isLoading }] = useUpdateTermconditionMutation();
  // console.log(content);

  useEffect(() => {
    if (termsConditon) {
      setContent(termsConditon?.data?.attributes[0]?.content);
    }
  }, [termsConditon]);

  console.log(termsConditon?.data?.attributes[0]?.content);

  const dataContent = {
    content: content,
  };

  const handleEditTermCondition = async () => {
    // console.log(dataContent);
    // navigate("/dashboard/settings/termcondition")

    try {
      const res = await updateTermcondition(dataContent).unwrap();
      // console.log(res);

      // if (res?.code == 200) {
      //   console.log(res);
      // }
      toast.success(res?.message);
      setTimeout(() => {
        navigate("/dashboard/settings/termcondition");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]*>?/gm, ""); // Removes all HTML tags
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
      <Link
        to="/dashboard/settings/termcondition"
        className="flex items-center gap-2"
      >
        <FaCircleArrowLeft className=" !text-[#430750] w-8 h-8" />
        <p className=" font-semibold sm:text-[30px] text-xl">
          Edit Term&Condition
        </p>
      </Link>
      {/* <Form
     labelCol={{ span: 22 }}
     wrapperCol={{ span: 40 }}
     layout="vertical"
     initialValues={{
       remember: true,
       
     }}
     onFinish = {handleEditTermCondition}
      > 
      <div className="mt-6">
        <JoditEditor 
          ref={editor}
          value={content} 
          onChange={(newContent) => {
            const plainText = stripHtmlTags(newContent); // Strips HTML tags
              setContent(plainText);
          }}
        />
      </div>
      <div className="text-right mt-6">
          <Form.Item>
            <Button 
            // loading = {isLoading}
              htmlType="submit"
             className=" h-[44px] w-[260px] !text-white !bg-[#69C0BE] rounded-[8px]"
            >
              Update termCondition
            </Button>
          </Form.Item>
        </div>
      </Form> */}

      <Form
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 40 }}
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={handleEditTermCondition}
      >
        <div className="mt-6">
          <JoditEditor
            className="bg-black"
            ref={editor}
            // value={content}
            value={termsConditon?.data?.attributes[0]?.content}
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
              className=" h-[44px] w-[260px] !text-white !bg-[#430750] rounded-[8px]"
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
