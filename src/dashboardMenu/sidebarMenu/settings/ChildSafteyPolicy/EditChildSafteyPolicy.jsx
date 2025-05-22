import React, { useEffect, useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Button, Form } from "antd";
import { useGetChildSafetyPolicyQuery, useEditChildSafteyPolicyMutation } from "../../../../redux/features/settings/childSafteyPolicy";
import { ToastContainer, toast } from "react-toastify";

const EditChildSafetyPolicy = () => {
    const navigate = useNavigate();
    const editor = useRef(null);

    // Fetch existing child safety policy
    const { data: policyData, isLoading, error } = useGetChildSafetyPolicyQuery();
    // Mutation hook to update policy
    const [updatePolicy, { isLoading: isUpdating }] = useEditChildSafteyPolicyMutation();

    const [content, setContent] = useState("");

    useEffect(() => {
        if (policyData) {
            // Adjust this according to your actual data structure
            setContent(policyData?.data?.attributes?.[0]?.content || "");
        }
    }, [policyData]);

    const handleSubmit = async () => {
        try {
            const response = await updatePolicy({ content }).unwrap();
            toast.success(response?.message || "Child Safety Policy updated successfully!");
            setTimeout(() => {
                navigate("/dashboard/settings/child-safety-policy");
            }, 1000);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update child safety policy.");
        }
    };

    if (isLoading) {
        return <p className="mt-8 sm:mx-6">Loading policy...</p>;
    }

    if (error) {
        return <p className="mt-8 sm:mx-6 text-red-500">Failed to load policy data.</p>;
    }

    return (
        <div className="mt-8 sm:mx-6">
            <ToastContainer position="top-right" autoClose={5000} theme="colored" />

            <Link to="/dashboard/settings/childsafetypolicy" className="flex items-center gap-2">
                <FaCircleArrowLeft className="text-[#430750] w-8 h-8" />
                <p className="font-semibold sm:text-[30px] text-xl">Edit Child Safety Policy</p>
            </Link>

            <Form layout="vertical" onFinish={handleSubmit}>
                <div className="mt-6">
                    <JoditEditor
                        ref={editor}
                        value={content}
                        onBlur={newContent => setContent(newContent)}
                        config={{ height: 400 }}
                    />
                </div>
                <div className="text-right mt-6">
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            loading={isUpdating}
                            disabled={content.trim() === ""}
                            className="h-[44px] w-full sm:w-[260px] !text-white !bg-[#430750] rounded-[8px]"
                        >
                            Save Changes
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default EditChildSafetyPolicy;
