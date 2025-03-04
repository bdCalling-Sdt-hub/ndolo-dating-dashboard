import React from 'react';
import { MdArrowBackIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAllEquipmentQuery } from '../../../redux/features/checklist/allEquipment';
import { useDeleteEquipmentMutation } from '../../../redux/features/checklist/deleteEquipment';
import toast, { Toaster } from 'react-hot-toast';

const Equipment = () => {
    const navigate = useNavigate()
    const {data: equipments, isLoading} = useAllEquipmentQuery()
    // console.log(equipments);
    const [deleteEquipment] = useDeleteEquipmentMutation()
    
  const handleDelete = async (id) => {
      try{
        const res = await deleteEquipment(id).unwrap();
        // console.log(res);
        if(res?.statusCode == 200){
            toast.success(res?.message)
        }
        
      }catch(error){
        console.log(error.data.message);
        
      }
  }



    return (
        <div className='mt-6'>
            <Toaster reverseOrder = {false} />
        <div className='flex items-center justify-between'>
            <div>
            <h1 className='flex items-center gap-2'><MdArrowBackIos/> Equipment list</h1>
            </div>
            <div>
            <button
          onClick={() => navigate("addequipment")}
          className="text-[18px] font-normal px-4 py-1 mr-3 rounded-md !text-black !bg-[#69C0BE]"
        >
          Add equipment
        </button>
            </div>
           
        </div>

        <div className='grid grid-cols-6 gap-4 mt-4'>
  {
    equipments?.data?.attributes?.map(equipment => 
        <div key={equipment?._id} className="p-4 h-40 relative bg-blue-50 rounded-lg shadow-md">
        <h2 className="flex items-center justify-center h-24 font-semibold mb-4">{equipment?.equipmentName}</h2>

  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
    <button onClick={() => handleDelete(equipment?._id)} className="px-2 py-1 bg-white border rounded hover:bg-blue-100">
      Delete
    </button>
    <button onClick={() => navigate(`editequipment/${equipment?._id}`)} className="px-2 py-1 bg-[#2FA3B0] text-white rounded">
      Edit
    </button>
  </div>
</div>
    )
  }
       
        </div>

        </div>

    );
};

export default Equipment;