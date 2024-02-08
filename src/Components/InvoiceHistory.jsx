import React from "react";
import { Link } from "react-router-dom";
import axiosInstance from "./axios/axios";
import headers from "./headers/headers";
import { useState, useEffect } from "react";

const InvoiceHistory = () => {
  const [invoices, setInvoices] = useState([]);
  const getAllInvoices = () => {
    axiosInstance
      .get("getAllInvoice", { headers })
      .then((response) => {
        // console.log(response.data.data);

        const invoiceList = response.data.data;
        console.log(invoiceList);
        setInvoices(invoiceList);
      })
      .catch((err) => {
        // setInvoices(null);
        console.error(err.response);
      });
  };
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    getAllInvoices();
  }, [invoices]);
  return (
    <div className="text-white container-fluid h-screen my-4 ">
      <div className="justify-between items-center flex md:mx-[24px]">
        <span className="nav-title">Invoice History</span>
        <Link
          to="/dashboard/generate-receipt"
          //   onClick={setShowModal(true)}
          className="flex gap-2 items-center gen-rec-cont"
        >
          <img src="" alt="" />
          <span className="gen-rec">Generate Receipt</span>
        </Link>
      </div>
      <div className="flex flex-col w-full my-3 bg-white text-black rounded-lg">
        <div className="flex gap-3 justify-around items-center p-2 bg-white">
          <span className="text-black products  w-full  flex items-center justify-center">
            Customer Name
          </span>
          <span className="text-black products  w-full  flex items-center justify-center">
            Invoice Date
          </span>
          <span className="text-black products  w-full  flex items-center justify-center">
            Invoice ID
          </span>
        </div>
      </div>
      <div className="flex flex-col w-full my-3 bg-white text-black   justify-around  rounded-lg  p-2">
        {invoices.map((inv, index) => (
          <div
            key={index}
            className="flex gap-3 justify-around items-center p-2 bg-white"
          >
            <span className="text-black products  w-full  flex items-center justify-center">
              {inv.customerName}
            </span>
            <span className="text-black products  w-full  flex items-center justify-center">
              {formatDate(inv.date)}
            </span>
            <span className="text-black products  w-full  flex items-center justify-center">
              {inv.invoiceID}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceHistory;
