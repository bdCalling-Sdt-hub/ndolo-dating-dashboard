import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "antd"; // Keeping Ant Design Checkbox for styling consistency
import toast, { Toaster } from "react-hot-toast";
import logo from "./../../public/image/logo.png";
import { useAdminLoginMutation } from "../redux/features/auth/Login";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  // Handle Form Submission
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form refresh
    console.log("Form Data:", { email, password }); // ✅ Console log form data

    try {
      const res = await adminLogin({ email, password }).unwrap();
      console.log(res);
      if (res?.code === 200) {
        console.log(res?.data?.tokens);
        toast.success(res?.message);
        localStorage.setItem("token", res?.data?.attributes?.tokens?.access?.token);
        localStorage.setItem("user", JSON.stringify(res?.data));
        setTimeout(() => navigate("/dashboard/home"), 500);
      } else {
        setError("Invalid login credentials");
      }
    } catch (err) {
      setError(err?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="md:mt-20 mt-10 md:w-[80%] w-[90%] mx-auto bg-white rounded-[8px]">
      <Toaster reverseOrder={false} />

      <div className="md:grid grid-cols-2 min-h-[80vh]">
        <div className="h-full bg-[#fff3e6] hidden md:flex justify-center items-center">
          <div className="w-1/3 mx-auto">
            <img src={logo} alt="Signin" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="md:p-10 p-5 bg-[#430750] flex justify-center items-center">
          <form onSubmit={onSubmit} className="login-form md:w-3/4 mx-auto bg-[#fff3e6] p-5 rounded-xl">
            <h3 className="text-center mb-4 text-2xl font-semibold">Sign In</h3>

            {/* Email Field */}
            <div className="mb-4">
              <p className="mb-3 font-semibold">Email *</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 mt-3 border rounded"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <p className="mb-3 font-semibold">Password *</p>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 mt-3 border rounded"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2">
                <Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
                Remember me
              </label>
              <Link to="/forgotpassword">
                <p className="cursor-pointer text-[14px] font-medium text-[#00BF63]">Forgot password?</p>
              </Link>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 font-medium mt-3">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="block w-full h-[52px] px-2 py-4 mt-4 text-white bg-[#00A7D1] rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
