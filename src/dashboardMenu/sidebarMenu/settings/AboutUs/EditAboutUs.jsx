import { useEffect, useRef, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetTermConditionQuery } from "../../../../redux/features/settings/getTermCondition";
import { useUpdateTermconditionMutation } from "../../../../redux/features/settings/updateTermcondition";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Button, Form } from "antd";
import JoditEditor from "jodit-react";
import { useUpdateAboutMutation } from "../../../../redux/features/settings/updateAbout";
import { useGetAboutQuery } from "../../../../redux/features/settings/getAbout";

export default function EditAboutUs() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  // console.log(id);

  const { data: termsConditon } = useGetAboutQuery();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [updateTermcondition, { isLoading }] = useUpdateAboutMutation();
  // console.log(content);

  useEffect(() => {
    if (termsConditon) {
      setContent(termsConditon?.data?.attributes[0]?.content);
    }
  }, [termsConditon]);

  const dataContent = {
    content: content,
  };

  const handleEditTermCondition = async () => {
    // console.log(dataContent);
    // navigate("/dashboard/settings/termcondition")

    try {
      const res = await updateTermcondition(dataContent).unwrap();
      // console.log(res);


      toast.success(res?.message);
      setTimeout(() => {
        navigate("/dashboard/settings/aboutus");
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
        to="/dashboard/settings/aboutus"
        className="flex items-center gap-2"
      >
        <FaCircleArrowLeft className=" !text-[#430750] w-8 h-8" />
        <p className=" font-semibold sm:text-[30px] text-xl">Edit About Us</p>
      </Link>

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
            ref={editor}
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
              className=" h-[44px] w-full sm:w-[260px] !text-white !bg-[#430750] rounded-[8px]"
            >
              Save Change
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
