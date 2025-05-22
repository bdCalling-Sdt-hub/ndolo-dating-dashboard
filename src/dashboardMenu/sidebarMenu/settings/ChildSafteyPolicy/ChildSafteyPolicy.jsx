import React from 'react';
import { useGetChildSafetyPolicyQuery } from '../../../../redux/features/settings/childSafteyPolicy';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';

const ChildSafetyPolicy = () => {
    const { data, isLoading, error } = useGetChildSafetyPolicyQuery();

    // Assuming your data structure is similar to others:
    const policyContent = data?.data?.attributes?.[0]?.content || "";

    if (isLoading) {
        return (
            <div className="mt-8 sm:mx-6 text-center text-gray-500">Loading child safety policy...</div>
        );
    }

    if (error) {
        return (
            <div className="mt-8 sm:mx-6 text-center text-red-500">Failed to load child safety policy.</div>
        );
    }

    return (
        <div className="mt-8 sm:mx-6">



            <div className='flex items-center gap-2 justify-between'>
                <Link to="/dashboard/settings" className="flex items-center gap-2">
                    <FaCircleArrowLeft className="text-[#430750] w-8 h-8" />
                    <p className="font-semibold sm:text-[30px] text-xl">Child Safety Policy</p>
                </Link>
                {/* edit button goes here */}
                <Link to="/dashboard/settings/edit-child-safety-policy">
                    <button className="bg-[#430750] text-white flex items-center gap-1 px-4 py-3 rounded mt-4">
                        <FaRegEdit className='mr-2 text-xl' /> Edit
                    </button>
                </Link>
            </div>


            <div className="mt-4">
                <div
                    className="leading-7 mt-5"
                    dangerouslySetInnerHTML={{ __html: policyContent }}
                />
            </div>
        </div>
    );
};

export default ChildSafetyPolicy;
