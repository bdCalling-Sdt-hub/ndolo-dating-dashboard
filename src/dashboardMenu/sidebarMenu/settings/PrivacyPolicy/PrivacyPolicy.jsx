import React, { useEffect, useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useGetPrivacyPolicyQuery } from "../../../../redux/features/settings/privacyPolicy";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { data: privacy } = useGetPrivacyPolicyQuery();
  const [content, setContent] = useState("privacy policy");

  // console.log(privacy?.data?.attributes[0]?.content);
  const privacyData = privacy?.data?.attributes[0]?.content;


  return (
    <div className="">
      <div className="mt-12 sm:mx-6">
        <Link to="/dashboard/settings" className="flex items-center gap-2">
          <FaCircleArrowLeft className="text-[#430750] w-8 h-8" />
          <p className="font-semibold text-[20px]">Privacy & Policy</p>
        </Link>
        <div className="mt-4">
          <p className="leading-7 mt-5">
            {privacyData ? privacyData : "privacy policy"}
          </p>

        </div>
        <div className="text-right mt-16">
          <button
            onClick={() =>
              navigate(`editprivacypolicy`)
            }
            className="h-[44px] w-full sm:w-[260px] !text-white !bg-[#430750] rounded-[8px]"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
