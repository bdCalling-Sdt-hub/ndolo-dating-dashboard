import { Button, Card } from 'antd';
import React from 'react';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useGetDocumentQuery } from '../../../redux/features/settings/getDocument';
import url from '../../../redux/api/baseUrl';
import download from './../../../../public/download.png'
import nodata from './../../../../public/nodata.jpg'
import documentt from './../../../../public/documentImage.png'
import { useDeleteDocumentMutation } from '../../../redux/features/settings/deleteDocument';
import toast from 'react-hot-toast';

const Document = () => {

    const navigate = useNavigate()

    const {data: documents, isLoading} = useGetDocumentQuery()
    // console.log(documents);
    const [deleted , {}] = useDeleteDocumentMutation()
    const deletDocument = async (id) => {
      try{
        const res = await deleted(id).unwrap();
        if(res?.statusCode ==200){
          toast.success(res?.message)
        }
      }catch(error){
        console.log(error);
        
      }
    }

    return (
        <div className='mt-6'>
               <div className="flex justify-between my-3">
               <Link to ='/dashboard/settings' className="flex items-center gap-2">
               <IoIosArrowBack className="  w-8 h-8"/>
        <p className="font-semibold text-[30px]">Document</p>
      </Link>
         
        <button
          onClick={() => navigate("adddocument")}
          className="text-[18px] font-normal px-4 py-2 rounded !text-black !bg-[#69C0BE]"
        >
          +Add Document
        </button>
      </div>

      {
        isLoading ?   <h1>Loading data .........</h1>
        : 
       documents  ? <div className='grid grid-cols-5 gap-4'>
        {
          documents?.data?.attributes?.map(document => 
          
        <div key={document._id} >
        <Card
    
    className="shadow-lg p-4 rounded-lg"
    cover={
      <div className="bg-gray-200 h-32 w-full flex relative justify-center items-center">
         

         {document.fileType === "image" ? (
            <img className='h-32 w-full' src= { url + document?.document?.publicFileUrl} alt={document.documentType} />
          ) : document.fileType === "pdf" ? (
            <img className='h-32 w-full' src= {documentt} alt= ""/>
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
        Download {document.fileType.toUpperCase()} File
      </button> 
    </div>
    }            

  > 

  
    <div className="flex justify-around mt-4">
      <Button   onClick={() => navigate(`editdocument`, { state: { document } })} type="primary" className="bg-teal-500">Edit</Button>
      <Button onClick={() => deletDocument(document?._id)} danger>Delete</Button>
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

export default Document;