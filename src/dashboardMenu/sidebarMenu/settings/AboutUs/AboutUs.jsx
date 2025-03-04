import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useGetAboutQuery } from "../../../../redux/features/settings/getAbout";

export default function AboutUs() {
  const navigate = useNavigate();


  const { data: aboutUs, isLoading } = useGetAboutQuery();

  console.log(aboutUs);


  return (
    <div className=" mt-8 sm:mx-6">
      <Link to="/dashboard/settings" className="flex items-center gap-2">
        <FaCircleArrowLeft className=" text-[#430750] w-8 h-8" />
        <p className=" font-semibold sm:text-[30px] text-xl">About Us</p>
      </Link>
      <div className='mt-4'>
        <div className="mt-4">
          <p className="leading-7 mt-5">
            {aboutUs?.data?.attributes[0]?.content}
          </p>
        </div>
      </div>
      <div className=" text-right mt-16">
        <button onClick={() => navigate(`/dashboard/settings/editaboutus?id=temp`)} className=" h-[44px] w-full sm:w-[260px] !text-white !bg-[#430750] rounded-[8px]">Edit</button>
        {/* <button onClick={() => navigate(`/dashboard/settings/edittermcondition/${termcondition?.data?.attributes?.docs[0]._id}`)}  className=" h-[44px] w-[260px] !text-black !bg-[#69C0BE] rounded-[8px]">Edit</button> */}
      </div>
    </div>
  )
}
