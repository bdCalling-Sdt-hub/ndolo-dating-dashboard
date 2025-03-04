import React from 'react';
import { BiSolidUserPlus } from 'react-icons/bi';
import { BsCardChecklist, BsExclude } from 'react-icons/bs';
import { CiBag1 } from 'react-icons/ci';
import { FaPersonRunning, FaUsers } from 'react-icons/fa6';
import { HiDocumentReport, HiOutlineCurrencyDollar } from 'react-icons/hi';
import { ImUserPlus } from 'react-icons/im';
import { SiMagento } from 'react-icons/si';
import { DatePicker, Space } from 'antd';
import { useTotalStatusQuery } from '../redux/features/dashboardHome/status';

const onChange = (date, dateString) => {
  // console.log(date, dateString);
};

const Card = () => {

  const {data: totalStatus, isLoading} = useTotalStatusQuery()

  // console.log(totalStatus?.data?.attributes);
  
  
    return (
        <div className=' mt-8'>
            <div className='flex items-center justify-between'>
            <h1 className="font-medium text-xl">Overview</h1>
            
 

            </div>
               <div className="grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-2 grid-cols-1 lg:gap-2 xl:gap-3 w-full">
        <div className=" rounded h-[180px] flex justify-between items-center card bg-[#FFFFFF] shadow-xl">
          <div className="mx-6 h-16 w-16 rounded bg-[#101625] flex justify-center items-center">
            <FaUsers className=" text-white w-12 h-12" />
          </div>
          <div className="mx-2 text-center">
            <p className="text-[18px] font-semibold text-[#101625] my-4">
            Total User  
            </p>
            <h1 className="text-[34px] font-medium">{totalStatus?.data?.attributes?.totalUser}</h1>
          </div>
        </div>
        <div className=" rounded h-[180px] flex justify-between items-center card bg-[#FFFFFF] shadow-xl">
          <div className="mx-6 h-16 w-16 rounded bg-[#101625] flex justify-center items-center">
          <BsCardChecklist className=" text-white w-12 h-12" />
          </div>
          <div className="mx-6 text-center">
            <p className="text-[18px] font-semibold text-[#101625] my-4">
            Daily Checklist
            </p>
            <h1 className="text-[34px] font-medium">{totalStatus?.data?.attributes?.dailyChecklist}</h1>
          </div>
        </div>
        <div className="  rounded h-[180px] flex justify-between items-center card bg-[#FFFFFF] shadow-xl">
          <div className="mx-2 h-16 w-16 rounded bg-[#101625] flex justify-center items-center">
          <ImUserPlus className=" text-white w-12 h-12" />
          </div>
          <div className="mx-2 text-center">
            <p className="text-[18px] font-semibold text-[#101625] my-4">
            Customer Manifest
            </p>
            <h1 className="text-[34px] font-medium">{totalStatus?.data?.attributes?.coustomerMenifest}</h1>
          </div>
        </div>

        <div className="  rounded h-[180px] flex justify-between items-center card bg-[#FFFFFF] shadow-xl">
          <div className="mx-2 h-16 w-16 rounded bg-[#101625] flex justify-center items-center">
          <HiDocumentReport  className=" text-white w-12 h-12" />
          </div>
          <div className="mx-2 text-center">
            <p className="text-[18px] font-semibold text-[#101625] my-4">
            Number Of Reporting
            </p>
            <h1 className="text-[34px] font-medium">{totalStatus?.data?.attributes?.insidnetReporting}</h1>
          </div>
        </div> 
      </div>

        </div>
    );
};

export default Card;