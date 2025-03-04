import { Button, Card } from 'antd';
import React, { useState } from 'react';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useGetLicenceCartificateQuery } from '../../../redux/features/settings/getLicenceCartificate';
import url from '../../../redux/api/baseUrl';
import PDFViewer from './Pdfviewer';
import documentImage from './../../../../public/documentImage.png'
import download from './../../../../public/download.png'
import { useDeleteLicenceCartificateMutation } from '../../../redux/features/settings/deleteLicenceCartificate';
import toast, { Toaster } from 'react-hot-toast';
  
 
const LicensCartificate = () => {

    const navigate = useNavigate()
const {data: documents,error, isLoading} = useGetLicenceCartificateQuery()
console.log(documents);


console.log( error);

const [deleted] = useDeleteLicenceCartificateMutation()
const handleDelete = async(id) => {
     try{
      const res = await deleted(id).unwrap()
      // console.log(res);
      toast.success(res?.message)
      
     }catch(error){
      console.log(error);
      
     }
}

// documents?.data?.attributes?.map(doc => {
//   console.log(doc);
//   setData(doc)
  
// })


// function getFileType(url) {
//   // Extract the file extension using regex
//   const match = url.match(/\.(\w+)$/);
//   return match ? match[1] : 'Unknown file type';
// }

// const url =  data.documentImage.publicFileUrl;
// const fileType = getFileType(url);
// console.log(fileType);
// const images = fileType



    return (
        <div className='mt-6'>
          <Toaster reverseOrder = {false} />
               <div className="flex justify-between my-3">
               <Link to ='/dashboard/settings' className="flex items-center gap-2">
               <IoIosArrowBack className="w-8 h-8"/>
        <p className="font-semibold text-[30px]">Licensing and Certificates</p>
      </Link>
         
        <button
          onClick={() => navigate("addlicenscartificate")}
          className="text-[18px] font-normal px-4 py-2 rounded !text-black !bg-[#69C0BE]"
        >
          +Add Document
        </button>
      </div>
    {
      error ? (
        <div className='text-red-500 font-semibold mt-10 text-center'>{error?.data?.message}</div>
      ) : 
      <div className='grid grid-cols-5 gap-4'>
        {
          documents?.data?.attributes?.map(document => 
          
        <div key={document._id} >
        <Card
    
    className="shadow-lg p-4 rounded-lg"
    cover={
      <div className="bg-gray-200 h-32 w-full flex relative justify-center items-center">
         

         {document.fileType === "image" ? (
            <img className='h-32 w-full' src= { url + document.documentImage.publicFileUrl} alt={document.documentType} />
          ) : document.fileType === "pdf" ? (
            <img className='h-32 w-full' src= {documentImage} alt= ""/>
          ) : null}  
       <button
        className="flex items-center absolute w-52 top-12 ml-4 mx-auto px-4 py-2 bg-white border border-dashed rounded-md shadow hover:bg-gray-100"
        onClick={() => window.open(url + document?.documentImage?.publicFileUrl, '_blank')}
      >
        <img
          src={download}   
          alt="Download Icon"
          className="w-6 h-6 mr-2"
        />
        Download {document.fileType.toUpperCase()} File
      </button> 
    </div>
    }            

  > 

 

    <div className="flex justify-around items-center">
      <p className="text-gray-500">Document Type:</p>
      <p className="font-semibold">{document?.documentType}</p>
    </div>
    <div className="flex justify-around items-center">
      <p className="text-gray-500">Expire Date:</p>
      <p className="font-semibold">{document?.expireDate}</p>
    </div>
    <div className="flex justify-around mt-4">
      <Button   onClick={() => navigate(`editlicencecartificate`, { state: { document } })} type="primary" className="bg-teal-500">Edit</Button>
      <Button onClick={() => handleDelete(document?._id)} danger>Delete</Button>
    </div>
  </Card>
        </div>

          )
        }
      </div>
    }

     

        </div>
    );
};

export default LicensCartificate;

 