import { Button } from "antd";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useWaiverFormQuery } from "../../../redux/features/waiver/waiver";

const WaiverForm = () => {
  const navigate = useNavigate();

  const handleBackSettings = () => {
    navigate("/dashboard/waiver");
  };

  const {data: waiverform, isLoading} = useWaiverFormQuery()
  // console.log(waiverform?.data?.attributes?.waiverForm);
  

  const eiditWaiverForm = () => {
    navigate("editwaiver");
  };

  return (
    <div className="w-[79vw] mt-6">
      <div>
        <div
          onClick={handleBackSettings}
          className="border-none text-[#193664] text-2xl flex gap-2 items-center cursor-pointer"
        >
          <IoIosArrowBack />
          Waiver Form
        </div>
      </div>
      <div className="pl-10 text-justify py-12">
        
        <p dangerouslySetInnerHTML={{ __html: waiverform?.data?.attributes?.waiverForm }}>
           {/* {waiverform?.data?.attributes?.waiverForm} */}
        </p> 
        {/* <div dangerouslySetInnerHTML={{ __html: privacy?.data?.attributes?.privacyText }} />

        </div> */}
      </div>
      <div className="flex justify-end">
        <Button
          onClick={eiditWaiverForm}
          // type="primary"
          style={{
            backgroundColor: "#101625",
            color: "#fff",
            size: "18px",
            height: "56px",
          }}
          htmlType="submit"
          className=" w-[300px] 
                   h-[56px]  py-4 mt-2 text-white hover:border-none border-none rounded-lg"
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default WaiverForm;
