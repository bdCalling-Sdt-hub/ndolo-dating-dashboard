import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Dropdown,
  Avatar,
  Badge,
  Button,
  Modal,
  Form,
  Input,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";

import { IoIosNotificationsOutline } from "react-icons/io";
// import { FaRegUser } from "react-icons/fa6";
import "./header.css";
import Swal from "sweetalert2";
import dashboard_welcome_Image from "../../public/Dashboard/Dashboard_welcome.png";
import User_profile_image from "../../public/Dashboard/User_profile_image.png";

import { useEffect, useState } from "react";
import { useCahngePasswordMutation } from "../redux/features/auth/changePassword";
import toast, { Toaster } from "react-hot-toast";
import { useGetProfileQuery } from "../redux/features/profile/profile";
import url from "../redux/api/baseUrl";

// import SearchBox from "../SearchBox/SearchBox";

const Header = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { data: profile, refetch, isLoading: profileLoading } = useGetProfileQuery();
  // console.log(profile?.data?.attributes);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to log out from here!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        Swal.fire({
          title: "Logged Out!",
          text: "User has been logged out successfully.",
          icon: "success",
          timer: 2000,
        });
        navigate("/");
      }
    });
  };

  const [passwordChange, { isLoading }] = useCahngePasswordMutation();

  const changePassword = async (values) => {
    const { confirmPassword, ...ChangePassword } = values;
    // console.log("Form valuessssss: ", ChangePassword);
    try {
      const res = await passwordChange(ChangePassword).unwrap();
      // console.log("essssssssseeee",res);
      if (res?.statusCode == 200) {
        toast.success(res?.message);
        closeModal(true);
      }
      // setTimeout(() => {
      //   navigate('/dashboard/home')
      // }, 1000);
    } catch (error) {
      console.log(error?.data?.message);
      setError(error?.data?.message);
    }
  };

  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuVisibility = (visible) => {
    setMenuVisible(visible);
  };

  useEffect(() => {
    refetch();
  }, []);

  const menu = (
    <Menu
      className={`transition ease-in-out duration-300 transform ${menuVisible ? "custom-dropdown-menu-visible" : "custom-dropdown-menu"
        }`}
    >
      <Menu.Item className=" hover:!bg-[#101625]" key="1">
        <Link to="/dashboard/profile" className=" hover:!text-white">
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item className=" hover:!bg-[#101625]" key="2">
        <p onClick={openModal} className=" hover:!text-white">
          Change Password
        </p>
      </Menu.Item>
      <Menu.Item className=" hover:!bg-[#101625]" key="3">
        <p onClick={handleLogOut} className=" hover:!text-white">
          Logout
        </p>
      </Menu.Item>
    </Menu>
  );

  const baseUrl = url;

  return (
    <div className="sm:w-auto w-full rounded-md bg-white">
      <Toaster reverseOrder={false} />
      <div className="flex bg-[#ece6ee] rounded-lg">
        <div className="w-full hidden md:flex justify-between items-center  sm:p-5 p-5 ">
          <div>
            <div className="flex items-center justify-start gap-1 mb-2">
              <p className="text-3xl font-semibold text-[#430750]">Welcome,</p>
              {/* <h1>{profile?.data?.attributes?.fullName}</h1> */}
            </div>
            <p className="sm:text-left text-center text-xl text-gray-500">Have a nice day at work</p>
          </div>
          {/* <div className="sm:block hidden">
            <img className="max-w-48 mx-auto" src={dashboard_welcome_Image} alt="" />
          </div> */} 
        </div>
        {
          profileLoading ? <div className="flex items-center mr-5 text-blue-500">loading...</div> :
            <Link to={"/dashboard/profile"} className=" lg:col-span-1 flex items-center  md:justify-end sm:flex-row flex-col gap-5  p-5 min-w-96 cursor-pointer">

              <div className="text-right ">
                <h3 className="text-2xl font-semibold text-[#430750]">{profile?.data?.attributes?.fullName}</h3>
                <p className="font-semibold">{profile?.data?.attributes?.role}</p>
              </div>
              <img className="w-14 h-14 rounded-full object-cover" src={profile?.data?.attributes?.profileImage ? `${baseUrl}${profile?.data?.attributes?.profileImage}` : '/Dashboard/User_Profile.png'} alt="Profile" />
            </Link>
        }

      </div>

    </div>
  );
};

export default Header;
