

import React from 'react';
import { MdArrowBackIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useCustomerManifestQuery } from '../../../redux/features/manifest/customerManifest';
import { useDeleteManifestMutation } from '../../../redux/features/manifest/deletemanifest';
import toast from 'react-hot-toast';

const CustomerManifest = () => {
    const navigate = useNavigate()

 const {data: customerManifest} = useCustomerManifestQuery()

//  console.log(customerManifest);
const [deletemanifest, {isLoading}] = useDeleteManifestMutation() 

const handleDelete = async (id) => {
   try{
    const res = await deletemanifest(id).unwrap();
    if(res?.statusCode == 200){
      toast.success(res?.message)
    }
   }catch(error){
    console.log(error);
    
   }
}



    return (
        <div>
            <div className='flex items-center justify-between'>
            <h1 className='text-2xl flex items-center'> <span> <MdArrowBackIos className='cursor-pointer' onClick={() => navigate('/dashboard/customers')} /> </span> Customer Manifest</h1>
            <button
          onClick={() => navigate("addmenifest")}
          className="text-[18px] font-normal mr-2 px-4 py-2 rounded !text-black !bg-[#69C0BE]"
        >
       +Add Customer Manifest
        </button>
            </div>
              <div className='grid grid-cols-6 gap-4 mt-4'>
   {
    customerManifest?.data?.attributes?.map(equipment =>
        <div key={equipment?._id} className="p-4 h-40 relative bg-blue-50 rounded-lg shadow-md">
        <h2 className="flex items-center justify-center h-24 font-semibold mb-4">{equipment?.manifestName?.slice(0,18)} ({equipment?.totalmanifest})</h2>

  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
    <button onClick={() => handleDelete(equipment?._id)}  className="px-2 py-1 bg-white border rounded hover:bg-blue-100">
      Delete
    </button>
    <button onClick={() => navigate('editmanifest', {state : {manifest: equipment}})} className="px-2 py-1 bg-[#2FA3B0] text-white rounded">
      Edit
    </button>
  </div>
</div>
  )}   
       
        </div>
        </div>
    );
};

export default CustomerManifest;