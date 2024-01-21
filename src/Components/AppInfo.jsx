import React from "react";
import totalSales from "../assets/totalSales.svg";
import totalReceipts from "../assets/totalReceipts.svg";
import newCustomers from "../assets/newCustomers.svg";
import exportIcon from "../assets/exportIcon.svg";

const AppInfo = () => {
  return (
    <div className="text-white container-fluid h-screen my-4 ">
      <span className="nav-title">Dashboard</span>
      <div className="">
        <div className="flex flex-col md:w-[50%] w-full">
          <div className=" border border-[#F8F9FA] p-3 flex flex-col rounded-lg mt-3">
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-col gap-2">
                <span className="sales">Todays Sales</span>
                <span className="summary">Sales Summary</span>
              </div>
              <div className="border border-[#F8F9FA] rounded-lg flex flex-wrap gap-2 items-center xsm:p-2 p-3 h-fit">
                <img src={exportIcon} alt="" />
                <span className="export text-center h-fit w-fit">Export</span>
              </div>
            </div>
            <div className="mt-[50px] flex md:flex-wrap gap-2 justify-around">
              <div className="xsm:max-w-[150px]">
                <img src={totalSales} className="full" />
              </div>
              <div className="">
                <img src={totalReceipts} className="full" />
              </div>
              <div className="">
                <img src={newCustomers} className="full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppInfo;
