import React from "react";
import totalSales from "../assets/totalSales.svg";
import totalReceipts from "../assets/totalReceipts.svg";
import newCustomers from "../assets/newCustomers.svg";
import exportIcon from "../assets/exportIcon.svg";
import receiptIcon from "../assets/ReceiptIcon.svg";
import { Link } from "react-router-dom";

const AppInfo = () => {
  return (
    <div className="text-white container-fluid min-h-screen my-4 ">
      <div className="justify-between items-center flex md:mx-[24px]">
        <span className="nav-title">Dashboard</span>
        <Link
          to="/dashboard/generate-receipt"
          className="flex gap-2 items-center gen-rec-cont"
        >
          <img src={receiptIcon} alt="" />
          <span className="gen-rec">Generate Receipt</span>
        </Link>
      </div>
      <div className="">
        <div className="flex flex-col items-center w-full">
          <div className=" border border-[#F8F9FA] md:w-[50%] fir-cont p-3 flex flex-col rounded-lg mt-8">
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
              <div className="xsm:max-w-[150px] image-container">
                <img src={totalSales} className="full" />
              </div>
              <div className="image-container">
                <img src={totalReceipts} className="full" />
              </div>
              <div className="image-container">
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
