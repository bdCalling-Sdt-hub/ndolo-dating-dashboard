import React, { useEffect, useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useGetTermConditionQuery } from "../../../../redux/features/settings/getTermCondition";

const TermsCondition = () => {
  const [content, setContent] = useState("Terms and condition");
  const navigate = useNavigate();

  const { data: termsConditon, isLoading } = useGetTermConditionQuery()


  console.log(termsConditon);

  return (

    <div className=" mt-8 sm:mx-6">
      <Link to="/dashboard/settings" className="flex items-center gap-2">
        <FaCircleArrowLeft className=" text-[#430750] w-8 h-8" />
        <p className=" font-semibold sm:text-[30px] text-xl">Terms & Condition</p>
      </Link>
      <div className='mt-4'>
        <div className="mt-4">
          <p className="leading-7 mt-5">
            {termsConditon?.data?.attributes[0]?.content}
          </p>
        </div>
      </div>
      <div className=" text-right mt-16">
        <button onClick={() => navigate(`/dashboard/settings/edittermcondition?id=${termsConditon?.data?.attributes?._id}`)} className=" h-[44px] w-full sm:w-[260px] !text-white !bg-[#430750] rounded-[8px]">Edit</button>
        {/* <button onClick={() => navigate(`/dashboard/settings/edittermcondition/${termcondition?.data?.attributes?.docs[0]._id}`)}  className=" h-[44px] w-[260px] !text-black !bg-[#69C0BE] rounded-[8px]">Edit</button> */}
      </div>
    </div>
  );
};

export default TermsCondition;
