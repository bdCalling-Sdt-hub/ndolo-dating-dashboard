import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import user from "./../../../public/image/users.jpg";
import { useGetProfileQuery } from "../../redux/features/profile/profile";
import url from "../../redux/api/baseUrl";

const Profile = () => {
  const navigate = useNavigate();

  const { data: profile, isLoading } = useGetProfileQuery();
  console.log(profile?.data?.attributes);

  const imageUrl = url;

  return (
    <div className="md:p-4 mt-5 sm:mt-0">
      <div className="lg:flex md:flex gap-4 bg-white md:p-4 rounded-xl">
        <div className="lg:w-1/3 flex flex-col border border-dotted p-4 justify-center items-center gap-8">
          <img
            className="w-40 h-40 border p-2 rounded-full"
            src={
              profile?.data?.attributes?.profileImage
                ? `${imageUrl}${profile?.data?.attributes?.profileImage}`
                : '/Dashboard/User_Profile.png'
            }
            alt="User Profile"
          />
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-2xl font-medium">
              {profile?.data?.attributes?.fullName
                ? profile?.data?.attributes?.fullName
                : "test"}
            </h1>
            <p className="text-lg md:text-xl">
              {profile?.data?.attributes?.role
                ? profile?.data?.attributes?.role
                : "admin"}
            </p>
          </div>
        </div>

        <div className="lg:w-2/3 mt-8 lg:mt-0 md:px-5">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="text-lg md:text-xl font-medium"
                >
                  Name
                </label>
                <Input
                  placeholder="First name"
                  value={profile?.data?.attributes?.fullName}
                  className="p-4 cursor-pointer text-lg md:text-xl bg-[#ebf5f5] text-black rounded w-full mt-3 outline-none "
                  type="text"
                  readOnly
                />
              </div>
            </div>

            <div className="flex-1">
              <label htmlFor="email" className="text-lg md:text-xl font-medium">
                Email
              </label>
              <Input
                placeholder="Email"
                value={profile?.data?.attributes?.email}
                className="p-4 text-lg md:text-xl bg-[#ebf5f5] rounded w-full mt-3 outline-none  "
                type="text"
                readOnly
              />
            </div>

            <div className="flex-1">
              <label htmlFor="phone" className="text-lg md:text-xl font-medium">
                Phone Number
              </label>
              <Input
                placeholder="Phone"
                value={profile?.data?.attributes?.phoneNumber}
                className="p-4 text-lg md:text-xl bg-[#ebf5f5] rounded w-full mt-3 outline-none"
                type="text"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      <div

        className="flex gap-2 items-center md:justify-end justify-center mt-8"
      >
        <div onClick={() => navigate(`/dashboard/editprofile`)} className="w-48 !bg-[#430750] !text-white py-3 px-6 rounded-lg cursor-pointer flex justify-center items-center gap-2 ">
          <FaEdit size={17} />
          <p>Edit Profile</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
