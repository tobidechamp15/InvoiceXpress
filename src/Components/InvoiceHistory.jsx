import React from "react";
import { Link } from "react-router-dom";
import axiosInstance from "./axios/axios";
import headers from "./headers/headers";
import { useState, useEffect } from "react";

const InvoiceHistory = () => {
  const [invoices, setInvoices] = useState([]);
  const [invoicesInfo, setInvoicesInfo] = useState({});
  const [showInvoicesInfo, setShowInvoicesInfo] = useState(false);

  const getAllInvoices = () => {
    axiosInstance
      .get("getAllInvoice", { headers })
      .then((response) => {
        const invoiceList = response.data.data;
        setInvoices(invoiceList);
      })
      .catch((err) => {
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

  const handleShowInformation = (index) => {
    const clickedInvoice = invoices[index];
    console.log(index);
    console.log("Clicked Invoice:", clickedInvoice);
    setShowInvoicesInfo(true);
    setInvoicesInfo(clickedInvoice);
  };

  useEffect(() => {
    getAllInvoices();
  }, [invoices]);
  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  return (
    <div>
      {showInvoicesInfo ? (
        <div className=" min-h-screen p-2">
          <div className="flex justify-between px-2 items-center">
            <span className="mb-6">Display Information</span>
            <span
              className="font-extrabold text-[25px]"
              onClick={() => setShowInvoicesInfo(null)}
            >
              X
            </span>
          </div>
          <div className="receipt-container text-black my-4">
            <h2 className="text-xl text-center font-bold mb-7 text-blue-600">
              Receipt Information
            </h2>
            <div className="customer-info">
              <div>
                <strong>Customer Name: </strong>
                {invoicesInfo.customerName}
              </div>
              <div>
                <strong>Address: </strong>
                {invoicesInfo.address}
              </div>
              <div>
                <strong>Email: </strong>
                {invoicesInfo.email}
              </div>
              <div>
                <strong>Amount Paid: </strong>
                {invoicesInfo.amountPaid}
              </div>
              <div>
                <strong>Payment Method: </strong>
                {invoicesInfo.paymentMethod}
              </div>
              <div>
                <strong>Phone Number: </strong>
                {invoicesInfo.phone}
              </div>
              <div>
                <strong>Invoice ID: </strong>
                {invoicesInfo.invoiceID}
              </div>
            </div>
            <div className="items-list">
              <span className="text-xl font-bold"> Items:</span>
              {invoicesInfo.items.map((item, index) => (
                <li key={index}>
                  <span className="font-bold">{item.itemName}</span>
                  <span>#{item.price}</span>
                  <span>Quantity: {item.quantity}</span>
                </li>
              ))}
              <div className="total-amount">
                <p className="my-5">
                  <strong>Total Amount:</strong>
                  {calculateTotalAmount(invoicesInfo.items)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white container-fluid min-h-screen my-4">
          <div className="justify-between items-center flex md:mx-[24px]">
            <span className="nav-title">Invoice History</span>
            <Link
              to="/dashboard/generate-receipt"
              className="flex gap-2 items-center gen-rec-cont"
            >
              <img src="" alt="" />
              <span className="gen-rec">Generate Receipt</span>
            </Link>
          </div>
          <div className="flex flex-col w-full my-3 bg-white text-black rounded-lg">
            <div className="flex gap-3 justify-around items-center p-2 bg-white">
              <span className="text-black products w-full flex items-center justify-center">
                Customer Name
              </span>
              <span className="text-black products w-full flex items-center justify-center">
                Invoice Date
              </span>
              <span className="text-black products w-full flex items-center justify-center">
                Invoice ID
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full my-3 mb-0 bg-whi gap- justify-around rounded-lg p-2">
            {invoices.map((inv, index) => (
              <div
                key={index}
                className="flex gap-3 justify-around items-center p-2 py-3 border cursor-pointer invoiceList"
                onClick={() => handleShowInformation(index)}
              >
                <span className="products w-full flex items-center justify-center">
                  {inv.customerName}
                </span>
                <span className="products w-full flex items-center justify-center">
                  {formatDate(inv.date)}
                </span>
                <span className="products w-full flex items-center justify-center">
                  {inv._id}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceHistory;
