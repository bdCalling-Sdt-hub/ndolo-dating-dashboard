import React from "react";
import Card from "./Card";
import Barchart from "./Barchart";
import RecentUser from "./RecentUser";
import Patient from "../../public/Dashboard/Patient.png";
import { useAllUsersDisQuery, useAllUsersQuery } from "../redux/features/users/users";
import { useAllDashboardInfoQuery } from "../redux/features/admin/getDashboardInfo";
import moment from "moment";

const DashboardHome = () => {
  const { data: userData, isLoading, error } = useAllUsersDisQuery({})
  const user = userData?.data?.attributes?.results;


  const { data: allDashboardInfo, isLoading: dashboardLoading } = useAllDashboardInfoQuery();



  const totalAdmin = allDashboardInfo?.data?.attributes?.totalAdmin;
  const totalUser = allDashboardInfo?.data?.attributes?.totalUser;


  return (
    <div className="sm:px-5">
      {/* <Card> </Card> */}
      {/* <Barchart /> */}
      <div className="grid sm:grid-cols-1 md:grid-cols-3 sm:gap-5">
        {/* Total User Card */}
        <div className="mt-5 bg-[#ece6ee] sm:p-4 p-4 rounded-xl flex sm:flex-col md:flex-row items-center gap-8">
          <img src={Patient} alt="Total Users" className="w-16 sm:w-20 md:w-24" />
          <div className="sm:text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1a1a1a]">
              Total Users
            </h2>
            <h2 className="text-3xl font-medium text-[#430750]">
              {totalUser ? totalUser : "00"}
            </h2>
          </div>
        </div>

        <div className="mt-5 bg-[#ece6ee] sm:p-4 p-4 rounded-xl flex sm:flex-col md:flex-row items-center gap-8">
          <img src={Patient} alt="Total Users" className="w-16 sm:w-20 md:w-24" />
          <div className="sm:text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1a1a1a]">
              Total Admins
            </h2>
            <h2 className="text-3xl font-medium text-[#430750]">
              {totalAdmin ? totalAdmin : "0"}
            </h2>
          </div>
        </div>

        {/* Recent User Card */}
        <div className="mt-5 bg-[#ece6ee] sm:p-4 p-4 rounded-xl flex sm:flex-col md:flex-row items-center gap-8">
          <img src={Patient} alt="Recent Users" className="w-16 sm:w-20 md:w-24" />
          <div className="sm:text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1a1a1a]">
              Recent User <sup className="text-sm">( Last 7 days )</sup>
            </h2>
            <h2 className="text-3xl font-medium text-[#430750]">{user?.length} </h2>
          </div>
        </div>
      </div>

      {/* Recent Users List */}
      <RecentUser state={"Recent Users"} />
      {/* <RecentUser state={"Total Users"} /> */}
    </div>
  );
};

export default DashboardHome;
