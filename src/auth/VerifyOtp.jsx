import logo from "../../public/image/logo.png";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { Button } from "antd";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useVerifyOtp2Mutation } from "../redux/features/auth/verifyOtp";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeftLong } from "react-icons/fa6";

const VerifyOtp = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [error, setError] = useState("");
  const email = queryParams.get("email");

  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [verifyOtp] = useVerifyOtp2Mutation();

  const verifyData = {
    oneTimeCode: otp,
    email: email,
  };

  const sendOtp = async () => {

    console.log(verifyData);

    try {
      // const res = await verifyOtp(verifyData).unwrap();
      const res = await verifyOtp(verifyData).unwrap();
      console.log(res);

      if (res?.code == 200) {
        toast.success(res?.message);
        setTimeout(() => {
          navigate(`/updatepassword?email=${email}`);
        }, 1000);
      }
    } catch (error) {
      setError(error?.data?.message);
    }
  };

  return (
    <div className="md:mt-20 mt-10 md:w-[80%] w-[90%] mx-auto bg-white rounded-[8px]">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="md:grid grid-cols-2 min-h-[80vh]">
        <div className=" h-full bg-[#fff3e6] hidden md:flex justify-center items-center">
          <div className=" hidden md:block w-1/3 mx-auto">
            <img
              src={logo}
              alt="Signin"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="md:p-10 p-5 bg-[#430750] flex justify-center items-center">
          <div className="bg-[#fff3e6] px-5 py-10 rounded-xl w-full max-w-[400px]">
            <div >
              <div className="flex flex-col justify-center items-center mb-5">
                <h2 className="flex items-center gap-2 text-2xl font-semibold">
                  <FaArrowLeftLong /> Verify Email
                </h2>
                <p>Please enter your email address to reset your password.</p>
              </div>

              <div className="flex justify-center sm:justify-start items-center gap-2 outline-none focus:border-blue-400 w-full">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
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
              <div className="flex justify-between items-center mt-4 sm:mt-6">
                <small className="text-[14px] sm:text-[16px] font-normal">
                  Didn’t receive the code?
                </small>
                <small className="text-[14px] sm:text-[16px] font-medium text-[#00BF63] cursor-pointer">
                  Resend
                </small>
              </div>
            </div>
            <p className="text-red-500 font-medium">{error}</p>

            <Button
              onClick={sendOtp}
              className="block w-full h-[52px] px-2 py-4 mt-2 !text-white !bg-[#00A7D1] rounded-xl"
            >
              Verify
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
