import { Form, Input, Button } from "antd";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useWaiverFormQuery } from "../../../redux/features/waiver/waiver";
import { useUpdateWaiverMutation } from "../../../redux/features/waiver/editwaiverForm";
import toast, { Toaster } from "react-hot-toast";

const EditWaiver = () => {
    const navigate = useNavigate();
    const editor = useRef(null);
    
    const { data: waiverform, isLoading } = useWaiverFormQuery();

    // Initialize the content state
    const [content, setContent] = useState('');
    // console.log(content);
   const [updateWaiver] = useUpdateWaiverMutation()
    // Update content when waiverform data is available
    useEffect(() => {
        if (waiverform) {
            setContent(waiverform?.data?.attributes?.waiverForm || '');
        }
    }, [waiverform]);

    const handleUpdate = async() => {
      //  console.log(content);
       const data = {
        text : content
       }
       try{
        const res = await updateWaiver(data).unwrap();
        if(res?.statusCode == 200){
          toast.success(res?.message)
        }
        setTimeout(() => {
          navigate('/dashboard/waiver/waiverform')
        }, 1000);
        
       }catch(error){
        console.log(error);
        
       }
       
    }
    const stripHtmlTags = (html) => {
        return html.replace(/<[^>]*>?/gm, ''); // Removes all HTML tags
      };

    const handleBackAboutUs = () => {
        navigate('/dashboard/waiver/waiverform');
    };


    return (
        <div className="relative ml-[24px]">
          <Toaster />
            <div className="mt-[34px]  flex items-center pb-3 gap-2">
                <MdOutlineKeyboardArrowLeft className="cursor-pointer" onClick={handleBackAboutUs} size={34} />
                <h1 className="text-[24px] font-semibold">Edit Waiver Form</h1>
            </div>
            <div className="text-justify mt-[24px] relative">
              {/* <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={(newContent) => {
                        const plainText = stripHtmlTags(newContent); // Strips HTML tags
                          setContent(plainText);
                    }}
                    className="text-wrap h-60"
                    
                    style={{ width: '100%' }}
                /> */}
                 <JoditEditor
            ref={editor}
            value={content}
            onBlur={(newContent) => {
              const plainText = stripHtmlTags(newContent); // Strips HTML tags
              setContent(plainText); // Sets only the plain text to content
            }}
            onChange={() => {}}
          />


                <Button
                    onClick={handleUpdate}
                    style={{
                        backgroundColor: "#101625",
                        color: "#fff",
                        size: "18px",
                        height: "56px",
                    }}
                    block
                    className="mt-[30px] h-[60px] hover:text-white bg-secondary hover:bg-gradient-to-r from-red-500 via-red-600 to-red-800
                    text-white py-3 rounded-lg w-full text-[18px] font-medium duration-200"
                >
                    Update
                </Button>
            </div>
        </div>
    );
}

export default EditWaiver;
