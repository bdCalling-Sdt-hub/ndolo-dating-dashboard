import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetAboutQuery } from "../../../../redux/features/settings/getAbout";
import { useUpdateAboutMutation } from "../../../../redux/features/settings/updateAbout";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Button, Form } from "antd";
import JoditEditor from "jodit-react";

export default function EditAboutUs() {
  const navigate = useNavigate();
  const editor = useRef(null);
  const { data: aboutData } = useGetAboutQuery();
  const [updateAbout, { isLoading }] = useUpdateAboutMutation();

  const [content, setContent] = useState("");

  useEffect(() => {
    if (aboutData) {
      setContent(aboutData?.data?.attributes[0]?.content || "");
    }
  }, [aboutData]);

  const handleEditAbout = async () => {
    try {
      const res = await updateAbout({ content }).unwrap();
      toast.success(res?.message || "Updated successfully!");
      setTimeout(() => {
        navigate("/dashboard/settings/aboutus");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update About Us.");
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
      <Link to="/dashboard/settings/aboutus" className="flex items-center gap-2">
        <FaCircleArrowLeft className="!text-[#430750] w-8 h-8" />
        <p className="font-semibold sm:text-[30px] text-xl">Edit About Us</p>
      </Link>

      <Form
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 40 }}
        layout="vertical"
        onFinish={handleEditAbout}
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
              className="h-[44px] w-full sm:w-[260px] !text-white !bg-[#430750] rounded-[8px]"
              disabled={content.trim() === ""}
            >
              Save Change
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
