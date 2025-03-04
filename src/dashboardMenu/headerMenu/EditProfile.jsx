import { Button, Upload } from "antd";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import User_Profile from "../../../public/Dashboard/User_Profile.png";
import { useGetProfileQuery, useUpdatePrifileMutation } from "../../redux/features/profile/profile";
import url from "../../redux/api/baseUrl";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

const EditProfile = () => {
  const { data: profile, isLoading } = useGetProfileQuery();
  const [updateProfile] = useUpdatePrifileMutation();
  const userProfileData = profile?.data?.attributes || {}; // Ensure it's always an object

  const baseUrl = url;

  const [imageUrl, setImageUrl] = useState(
    userProfileData?.profileImage ? `${baseUrl}${userProfileData.profileImage}` : User_Profile
  );

  // Handle image upload and preview
  const [imagerawfile, setImagerawfile] = useState([]);


  const handleUploadChange = ({ file }) => {

    setImagerawfile(file);

    const selectedFile = file.originFileObj || file; // Use file directly if originFileObj is not available

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setImageUrl(reader.result); // Set uploaded image preview
      };
    }
  };


  const handleSave = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData();
    if (imagerawfile.name) {
      formData.append("profileImage", imagerawfile);
    }

    formData.append("fullName", form.fullName.value);
    formData.append("phoneNumber", form.phoneNumber.value);

    try {

      const res = await updateProfile(formData).unwrap();
      console.log(res);
      if (res?.code == 200) {
        toast.success(res?.message);
      }

    } catch (error) {

    }


  };

  return (
    <div className="font-[Aldrich]">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Link to={`/dashboard/profile`} className="flex items-center cursor-pointer ml-6 mb-8 mt-10">
        <MdOutlineKeyboardArrowLeft size={30} />
        <h1 className="text-xl font-medium ml-2">Edit Profile</h1>
      </Link>

      <form onSubmit={handleSave} className="sm:p-9 rounded-xl bg-white">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center w-full lg:w-1/3 border-dotted border">
            <div className="relative sm:w-56 w-48 sm:h-56 h-48 rounded-full flex justify-center items-center mt-5 bg-gray-50 border">
              <Upload
                name="profileImage"
                showUploadList={false}
                beforeUpload={() => false} // Prevents auto-upload
                onChange={handleUploadChange}
              >
                <img
                  className="w-44 h-44 rounded-full object-cover"
                  src={imageUrl}
                  alt="Profile"
                />
                <Button className="border-none text-md text-blue-500 absolute bottom-6 flex items-center">
                  <LuImagePlus size={20} className="mr-2" />
                  Change Picture
                </Button>
              </Upload>
            </div>
            <div className="text-center mt-6">
              <h1 className="text-2xl font-medium">{userProfileData?.fullName || "Your Name"}</h1>
              <p className="text-lg">{userProfileData?.role || "User"}</p>
            </div>
          </div>

          {/* Form Inputs Section */}
          <div className="flex-1 w-full lg:w-2/3">
            <div className="flex flex-col gap-6">
              {/* Name Field */}
              <div>
                <label className="text-lg font-medium">Name</label>
                <input
                  type="text"
                  name="fullName"
                  defaultValue={userProfileData?.fullName || ""}
                  className="p-4 rounded-lg border-gray-300 bg-gray-100 w-full mt-3"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="text-lg font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userProfileData?.email || ""}
                  className="p-4 rounded-lg border-gray-300 bg-gray-100 w-full mt-3"
                  readOnly
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label className="text-lg font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  defaultValue={userProfileData?.phoneNumber || ""}
                  className="p-4 rounded-lg border-gray-300 bg-gray-100 w-full mt-3"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex sm:justify-end justify-center items-center mt-8">
          <button type="submit" className="py-3 md:px-20 !bg-[#430750] !text-white rounded-lg text-lg font-medium">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
