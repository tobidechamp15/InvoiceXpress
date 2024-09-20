// CustomerInfo.js
import React from "react";
import PropTypes from "prop-types";

const CustomerInfo = ({ onChange }) => {
  return (
    <div className="flex items-center justify-center w-full bg-[#1e1b18] py-10">
      <div className="md:w-[75%] w-full bg-[#1e1b18] text-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col gap-6 items-start mt-3">
          {/* Customer Name & Email */}
          <div className="flex justify-between w-full gap-6 flex-wrap">
            <div className="flex w-full md:w-[48%] flex-col items-start">
              <label
                htmlFor="customerName"
                className="text-sm text-white font-medium"
              >
                Customer Name:
              </label>
              <input
                type="text"
                id="customerName"
                className="form-control input-field bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                onChange={(e) => onChange("customerName", e.target.value)}
              />
            </div>
            <div className="flex w-full md:w-[48%] flex-col items-start">
              <label htmlFor="email" className="text-sm text-white font-medium">
                Email:
              </label>
              <input
                type="email"
                className="form-control input-field bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                id="email"
                onChange={(e) => onChange("email", e.target.value)}
              />
            </div>
          </div>

          {/* Address & Phone Number */}
          <div className="flex justify-between w-full gap-6 flex-wrap">
            <div className="flex w-full md:w-[48%] flex-col items-start">
              <label
                htmlFor="address"
                className="text-sm text-white font-medium"
              >
                Address:
              </label>
              <input
                type="text"
                className="form-control input-field bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                id="address"
                onChange={(e) => onChange("address", e.target.value)}
              />
            </div>
            <div className="flex w-full md:w-[48%] flex-col items-start">
              <label
                htmlFor="phoneNumber"
                className="text-sm text-white font-medium"
              >
                Phone Number:
              </label>
              <input
                type="number"
                className="form-control input-field bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                id="phoneNumber"
                onChange={(e) => onChange("phoneNumber", e.target.value)}
              />
            </div>
          </div>

          {/* Date & Amount Paid */}
          <div className="flex justify-between w-full gap-6 flex-wrap">
            <div className="flex w-full md:w-[48%] flex-col items-start">
              <label htmlFor="date" className="text-sm text-white font-medium">
                Date:
              </label>
              <input
                type="date"
                className="form-control input-field bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                id="date"
                onChange={(e) => onChange("date", e.target.value)}
              />
            </div>
            <div className="flex w-full md:w-[48%] flex-col items-start">
              <label
                htmlFor="amountPaid"
                className="text-sm text-white font-medium"
              >
                Amount Paid:
              </label>
              <input
                type="number"
                className="form-control input-field bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                id="amountPaid"
                onChange={(e) => onChange("amountPaid", e.target.value)}
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="w-full">
            <label className="text-sm text-white font-medium">
              Select the payment method:
            </label>
            <select
              className="bg-gray-50 form-control text-white w-full mt-2 py-2 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              onChange={(e) => onChange("paymentMethod", e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="POS">Debit Card</option>
              <option value="Transfer">Transfer</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

CustomerInfo.propTypes = {
  onChange: PropTypes.func.isRequired,
};
export default CustomerInfo;
