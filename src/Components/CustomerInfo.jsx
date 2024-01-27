// CustomerInfo.js
import React from "react";
import PropTypes from "prop-types";

const CustomerInfo = ({ onChange }) => {
  return (
    <div className="flex items-center justify-center w-full ">
      <div className="md:w-[75%] w-full">
        <div className="flex flex-col gap-4 items-start mt-3">
          <div className="flex w-full flex-col items-start">
            <label htmlFor="customerName" className="input-name">
              Customer Name:
            </label>
            <input
              type="text"
              id="customerName"
              className="form-control"
              onChange={(e) => onChange("customerName", e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col items-start">
            <label htmlFor="address" className="input-name">
              Address:
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              onChange={(e) => onChange("address", e.target.value)}
            />
          </div>
          <div className="w-full">
            <label>Select the payment method</label>
            <select
              className="bg-black form-control text-white w-full mt-2"
              onChange={(e) => onChange("paymentMethod", e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="Debit Card">Debit Card</option>
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
