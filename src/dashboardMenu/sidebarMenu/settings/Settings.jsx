import { Button, Form, Input, Modal, Typography } from "antd";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { FaArrowLeftLong } from "react-icons/fa6";
import OTPInput from "react-otp-input";
import { toast, ToastContainer } from "react-toastify";
import { useChangePasswordMutation } from "../../../redux/features/settings/changePassword";
import { useForgotPasswordMutation } from "../../../redux/features/auth/forgotPassword";
import { useVerifyOtp2Mutation } from "../../../redux/features/auth/verifyOtp";
import { useUpdatePasswordAdminMutation } from "../../../redux/features/auth/updatePassword";
// import ChangePassword from "./demo";

const { Text } = Typography;

const Settings = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [form] = Form.useForm();
  const [tempEmail, setTempEmail] = useState('')


  console.log(otp, tempEmail)
  // console.log(form)

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);





  const [changePassword] = useChangePasswordMutation();
  const [forgotpassword] = useForgotPasswordMutation();
  const [verifyOtp] = useVerifyOtp2Mutation();
  const [updatePassword] = useUpdatePasswordAdminMutation();



  const onFinish = async (values) => {


    if (!isForgotPassword) {
      console.log(values);

      if (values.newPassword !== values.confirmYourPassword) {
        return toast.error('New Password & confirm Password do not match');
      }

      const allFormData = {
        newPassword: values.newPassword,
        oldPassword: values.currentPassword,
      }

      try {
        const res = await changePassword(allFormData).unwrap();
        toast.success(res?.message);
        values.newPassword = '';
        values.currentPassword = '';
        values.confirmYourPassword = '';

        setIsModalOpen(false);
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message);
      }
    }
    if (!isOtpSent) {
      const email = { email: values?.email };
      setTempEmail(values?.email)
      try {
        const res = await forgotpassword(email).unwrap();
        toast.success(res?.message);
        setIsOtpSent(true);
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message);
      }
    }

    if (!isOtpVerified) {

      if (otp.length === 6) {
        const data = {
          email: tempEmail,
          oneTimeCode: otp,
        };
        try {
          const res = await verifyOtp(data).unwrap();
          toast.success(res?.message);
          // setIsModalOpen(false);
          setIsOtpVerified(true);
        } catch (error) {
          console.log(error);
          toast.error(error?.data?.message);
        }
      }


    }
    if (isOtpVerified) {

      if (values.newPassword !== values.confirmPassword) {
        return toast.error('New Password & confirm Password do not match');
      }

      const data = {
        email: tempEmail,
        password: values.newPassword,
      };
      try {
        const res = await updatePassword(data).unwrap();
        toast.success(res?.message);
        setIsOtpVerified(false);
        setIsModalOpen(false);
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message);
      }
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
      <h1 className="font-semibold text-[30px]">Settings</h1>
      <div>
        <div>
          {/* Trigger Button */}
          <div
            onClick={showModal}
            className="mt-8 pl-4 cursor-pointer flex justify-between bg-[#F7F7F7] hover:bg-[#430750] hover:text-white rounded items-center w-full h-[75px]"
          >
            <p className="text-[18px] ml-8 font-medium text-center">
              Change Password
            </p>
            <IoIosArrowForward className="mr-8" />
          </div>

          {/* Modal */}
          <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            width={500}
          >
            <div className="my-10">
              <h2 className="text-center text-xl flex justify-center items-center gap-5">
                <FaArrowLeftLong />
                {isForgotPassword ? "Forgot Password" : "Change Password"}
              </h2>
              <Text className="block mb-4 text-gray-700 text-center">
                {isForgotPassword
                  ? isOtpSent
                    ? "Enter the OTP sent to your email."
                    : "Enter your email to reset your password."
                  : "Your password must be 8-10 characters long."}
              </Text>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="space-y-4"
              >
                {/* Forgot Password Step */}
                {isForgotPassword && !isOtpSent && (
                  <>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: "Please enter your email" },
                        { type: "email", message: "Please enter a valid email" },
                      ]}
                    >
                      <Input
                        placeholder="Email address"
                        className="rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-500 h-12"
                      />
                    </Form.Item>
                    <div className="flex justify-between">
                      <button
                        onClick={() => setIsForgotPassword(false)}
                        className="text-[#430750] font-semibold"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="text-white font-semibold bg-[#430750] hover:bg-[#430750dc] rounded-lg p-2 h-12"
                      >
                        Send OTP
                      </button>
                    </div>
                  </>
                )}

                {/* OTP Verification Step */}
                {isForgotPassword && isOtpSent && !isOtpVerified && (
                  <>
                    <Form.Item
                      name="otp"
                      label="OTP"
                    >
                      {/* <Input
                        placeholder="Enter OTP"
                        className="rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-500 h-12"
                      /> */}
                      <div className="flex justify-center sm:justify-start items-center gap-2 outline-none focus:border-blue-400 w-full">
                        <OTPInput
                          value={otp}
                          onChange={setOtp}
                          required
                          numInputs={6}
                          inputStyle={{
                            height: "52px",
                            width: "100%", // Default full width
                            background: "transparent",
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            marginRight: "8px",
                            outline: "none",
                            padding: "0 12px", // Padding for better input appearance
                          }}
                          renderSeparator={<span className="md:w-6"> </span>}
                          renderInput={(props) => (
                            <input {...props} className="w-full sm:w-[55px] md:w-[60px] text-center" />
                          )}
                        />
                      </div>
                    </Form.Item>
                    <div className="flex justify-between">
                      <button
                        onClick={() => setIsOtpSent(false)}
                        className="text-[#430750] font-semibold"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="text-white font-semibold bg-[#430750] hover:bg-[#430750dc] rounded-lg p-2 h-12"
                      >
                        Verify OTP
                      </button>
                    </div>
                  </>
                )}

                {/* Reset Password Step */}
                {isOtpVerified && (
                  <>
                    <Form.Item
                      name="newPassword"
                      label="New Password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your new password",
                        },
                        {
                          min: 8,
                          message: "Password must be at least 8 characters",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="New password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        className="rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-500 h-12"
                      />
                    </Form.Item>
                    <Form.Item
                      name="confirmPassword"
                      label="Confirm Password"
                      dependencies={["newPassword"]}
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your new password",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Passwords do not match")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        placeholder="Confirm password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        className="rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-500 h-12"
                      />
                    </Form.Item>
                    <div className="flex justify-between">
                      <button
                        onClick={() => {
                          setIsOtpVerified(false);
                          setIsOtpSent(true);
                        }}
                        className="text-[#430750] font-semibold"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="text-white font-semibold bg-[#430750] hover:bg-[#430750dc] rounded-lg p-2 h-12"
                      >
                        Reset Password
                      </button>
                    </div>
                  </>
                )}

                {/* Change Password Step */}
                {!isForgotPassword && (
                  <>
                    <Form.Item
                      name="currentPassword"
                      label="Current Password"
                      rules={[
                        { required: true, message: "Please enter your current password" },
                      ]}
                    >
                      <Input.Password
                        placeholder="Current password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        className="rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-500 h-12"
                      />
                    </Form.Item>
                    <Form.Item
                      name="newPassword"
                      label="New Password"
                      rules={[
                        { required: true, message: "Please enter your new password" },
                        { min: 8, message: "Password must be at least 8 characters" },
                      ]}
                    >
                      <Input.Password
                        placeholder="New password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        className="rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-500 h-12"
                      />
                    </Form.Item>
                    <Form.Item
                      name="confirmYourPassword"
                      label="Re-enter Your Password"
                      rules={[
                        { required: true, message: "Please enter your New Password" },
                        { min: 8, message: "Password must be at least 8 characters" },
                      ]}
                    >
                      <Input.Password
                        placeholder="Re-enter Your Password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        className="rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-500 h-12"
                      />
                    </Form.Item>
                    <Form.Item className="text-center">
                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(true)}
                        className="text-[#430750] font-semibold"
                      >
                        Forgot Password?
                      </button>
                    </Form.Item>
                    <Form.Item>
                      <button
                        type="submit"
                        className="w-full text-white font-semibold bg-[#430750] hover:bg-[#430750dc] rounded-lg p-2 h-12"
                      >
                        Change Password
                      </button>
                    </Form.Item>
                  </>
                )}
              </Form>
            </div>
          </Modal>
        </div>


        <div
          onClick={() => navigate("/dashboard/settings/termcondition")}
          className="mt-8 pl-4 cursor-pointer flex justify-between bg-[#F7F7F7] hover:bg-[#430750] hover:text-white rounded items-center w-full h-[75px]"
        >
          <p className="text-[18px] ml-8 font-medium text-center">
            Terms & Condition
          </p>
          <Link
            to="/dashboard/settings/termcondition"
            className="mr-8 px-2 py-1 rounded cursor-pointer"
          >
            <IoIosArrowForward />
          </Link>
        </div>

        <div
          onClick={() => navigate("/dashboard/settings/privacypolicy")}
          className="mt-8 pl-4 cursor-pointer flex justify-between bg-[#F7F7F7] hover:bg-[#430750] hover:text-white rounded items-center w-full h-[75px]"
        >
          <p className="text-[18px] ml-8 font-medium text-center">
            Privacy & Policy
          </p>
          <Link
            to="/dashboard/settings/privacypolicy"
            className="mr-8 px-2 py-1 rounded cursor-pointer"
          >
            <IoIosArrowForward />
          </Link>
        </div>

        <div
          onClick={() => navigate("/dashboard/settings/child-safety-policy")}
          className="mt-8 pl-4 cursor-pointer flex justify-between bg-[#F7F7F7] hover:bg-[#430750] hover:text-white rounded items-center w-full h-[75px]"
        >
          <p className="text-[18px] ml-8 font-medium text-center">
            Child Safety Policy
          </p>
          <Link
            to="/dashboard/settings/child-safety-policy"
            className="mr-8 px-2 py-1 rounded cursor-pointer"
          >
            <IoIosArrowForward />
          </Link>
        </div>

        <div
          onClick={() => navigate("/dashboard/settings/aboutus")}
          className="mt-8 pl-4 cursor-pointer flex justify-between bg-[#F7F7F7] hover:bg-[#430750] hover:text-white rounded items-center w-full h-[75px]"
        >
          <p className="text-[18px] ml-8 font-medium text-center">About Us</p>
          <Link
            to="/dashboard/settings/aboutus"
            className="mr-8 px-2 py-1 rounded cursor-pointer"
          >
            <IoIosArrowForward />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
