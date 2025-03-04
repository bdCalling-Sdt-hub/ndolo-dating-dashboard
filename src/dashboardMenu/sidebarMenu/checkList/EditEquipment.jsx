import React, { useState, useEffect } from 'react';
import { Button, Input, Form } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetByIdQuery } from '../../../redux/features/checklist/getById';
import { useEditEquipmentMutation } from '../../../redux/features/checklist/editEquipment';
 

const EditEquipment = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the equipment ID from the URL
    
    const { data: singleEquipment } = useGetByIdQuery(id);
    
    const [equipment, {isLoading}] = useEditEquipmentMutation()

    const [equipmentName, setEquipmentName] = useState('');
    const [fields, setFields] = useState([{ key: Date.now(), value: '' }]);

    // Populate form with fetched data when `singleEquipment` is available
    useEffect(() => {
        if (singleEquipment) {
            setEquipmentName(singleEquipment?.data?.attributes?.equipmentName || '');
            setFields(
                singleEquipment?.data?.attributes?.equipmentChackBox.map((item, index) => ({
                    key: index,
                    value: item,
                })) || []
            );
        }
    }, [singleEquipment]);

    const handleFieldChange = (key, value) => {
        setFields(fields.map(field => (field.key === key ? { ...field, value } : field)));
    };

    const addField = () => {
        setFields([...fields, { key: Date.now(), value: '' }]);
    };

    const removeField = (key) => {
        setFields(fields.filter(field => field.key !== key));
    };

    const equipmentChackBox = fields.map(field => field.value);

    const handleSave = async () => {
        const data = {
            equipmentId: id, // Make sure to include equipmentId here
            equipmentName: equipmentName,
            equipmentChackBox: equipmentChackBox,
        };
        // console.log(data);
        try{
            const res = await equipment(data).unwrap()
            // console.log(res);
            if(res?.statusCode == 200){
                toast.success(res?.message)
            }
            setTimeout(() => {
                navigate('/dashboard/dailychecklist/equipment') 
            }, 1000);
            
        }catch(error){
            toast.error(error?.data?.message)
            console.log(error);
            
        }
         
    };
    


    return (
        <div className="p-6 max-w-2xl mx-auto bg-blue-50 rounded-lg shadow-md">
            <Toaster reverseOrder = {false} />
            <h1 className="text-2xl font-semibold mb-6">Edit Equipment</h1>
            <Toaster reverseOrder={false} />

            {/* Equipment Name Section */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border">
                <Form.Item label="Equipment Name" className="mb-4">
                    <Input
                        placeholder="Enter equipment name"
                        className="w-full"
                        value={equipmentName}
                        onChange={(e) => setEquipmentName(e.target.value)}
                    />
                </Form.Item>
            </div>

            {/* Equipment Check Box Section */}
            <h2 className="font-medium mb-4">Equipment Check Box</h2>
            {fields.map((field) => (
                <div key={field.key} className="flex items-center mb-4">
                    <Input
                        className="w-full mr-4"
                        placeholder="Enter equipment detail"
                        value={field.value}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    />
                    <Button
                        type="danger"
                        shape="circle"
                        icon={<MinusCircleOutlined />}
                        onClick={() => removeField(field.key)}
                    />
                </div>
            ))}

            {/* Add Fields Button */}
            <Button
                type="dashed"
                className="w-full mb-8"
                icon={<PlusOutlined />}
                onClick={addField}
            >
                Add Fields
            </Button>

            {/* Save Button */}
            <Button
                loading={isLoading}
                type="primary"
                className="w-full"
                onClick={handleSave}
            >
                Save
            </Button>
        </div>
    );
};

export default EditEquipment;
