import React from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useGetReportQuery } from '../../../redux/features/reporting/getReport';

const Reporting = () => {
    const navigate = useNavigate()
 
    
    return (
        <div className='mt-6'>
        <h1 className='flex items-center gap-2 text-2xl my-5'>
        <IoChevronBackOutline />
        Reporting
        </h1>
        <div  className=' grid  lg:grid-cols-6 gap-6'>
              <div onClick={() => navigate('cgreporting')} className='bg-black h-48 cursor-pointer rounded-md text-white flex justify-center items-center'>
              CG Reporting Form
              </div>
              <div onClick={() => navigate('insurancereport')} className='bg-[#10162580] h-48 cursor-pointer rounded-md text-white flex justify-center items-center'>
               Insurance Form
              </div>
              <div onClick={() => navigate('incidentreport')} className='bg-green-400 cursor-pointer h-48 rounded-md text-white flex justify-center items-center'>
              Incident Report Form
              </div>
        </div>

        </div>
    );
};

export default Reporting;