



import { Button, Card } from 'antd';
import React from 'react';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
 
// import url from '../../../redux/api/baseUrl';
import download from './../../../../../public/download.png'
import nodata from './../../../../../public/nodata.jpg'
import documentt from './../../../../../public/documentImage.png'
 
import { useGetReportQuery } from '../../../../redux/features/reporting/getReport';
import url from '../../../../redux/api/baseUrl';
import { useGetInsurenceReportQuery } from '../../../../redux/features/reporting/getInsurenceReport';
 

const SeeInsurence = () => {

    const navigate = useNavigate()

   const {data: documents ,isLoading} = useGetInsurenceReportQuery()

    // console.log(documents);
   
     
    return (
        <div className='mt-6'>
               <div className="flex justify-between my-3">
               <Link to ='/dashboard/reporting/insurancereport' className="flex items-center gap-2">
               <IoIosArrowBack className="  w-8 h-8"/>
        <p className="font-semibold text-[30px]"> Insurance-Report Document</p>
      </Link>
         
        
      </div>

      {
        isLoading ?   <h1>Loading data .........</h1>
        : 
       documents  ? <div className=' w-[30%] mx-auto'>
        {
          documents?.data?.attributes?.map(document => 
          
        <div key={document._id} >
        <Card
    
    className="shadow-lg p-4 rounded-lg"
    cover={
      <div className="bg-gray-200 h-52  flex relative justify-center items-center">
         

         {document?.document?.fileType === "image" ? (
            <img className='h-32 w-full' src= { url + document?.document?.publicFileUrl} alt={document.documentType} />
          ) : document?.document?.fileType === "pdf" ? (
            <img className='h-44 w-full' src= {documentt} alt= ""/>
          ) : null}  
       <button
        className="flex items-center absolute w-52 top-12 ml-4 mx-auto px-4 py-2 bg-white border border-dashed rounded-md shadow hover:bg-gray-100"
        onClick={() => window.open(url + document?.document?.publicFileUrl, '_blank')}
      >
        <img
          src={download}   
          alt="Download Icon"
          className="w-6 h-6 mr-2"
        />
        Download {document?.document?.fileType.toUpperCase()} File
      </button> 
    </div>
    }            

  > 

  
    <div className="flex justify-around mt-4">
      <Button   onClick={() => navigate(`editinsurance`, { state: { document } })} type="primary" className="bg-teal-500">Edit</Button>
      
    </div>
  </Card>
        </div>

          )
        }
      </div>  :  <img className='h-32 mt-12 w-[15%] mx-auto rounded-lg shadow-lg' src={nodata} alt="" />  
      }

     
        </div>
    );
};

export default SeeInsurence;