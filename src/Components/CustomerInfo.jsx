// CustomerInfo.js
import React from "react";
import PropTypes from "prop-types";

const CustomerInfo = ({ onChange }) => {
  return (
    <div className="flex items-center justify-center w-full ">
      <div className="md:w-[75%] w-full">
        <div className="flex flex-col gap-4 items-start mt-3">
          <div className="flex justify-between w-full gap-3 xsm:flex-col">
            <div className="flex w-full flex-col items-start">
              <label htmlFor="customerName" className="input-name">
                Customer Name:
              </label>
              <input
                type="text"
                id="customerName"
                className="form-control input-field"
                onChange={(e) => onChange("customerName", e.target.value)}
              />
            </div>
            <div className="flex w-full flex-col items-start">
              <label htmlFor="email" className="input-name">
                Email:
              </label>
              <input
                type="email"
                className="form-control input-field"
                id="email"
                onChange={(e) => onChange("email", e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between w-full gap-3 xsm:flex-col">
            <div className="flex w-full flex-col items-start">
              <label htmlFor="address" className="input-name">
                Address:
              </label>
              <input
                type="text"
                className="form-control input-field"
                id="address"
                onChange={(e) => onChange("address", e.target.value)}
              />
            </div>
            <div className="flex w-full flex-col items-start">
              <label htmlFor="phoneNumber" className="input-name">
                Phone Number:
              </label>
              <input
                type="number"
                className="form-control input-field"
                id="phoneNumber"
                onChange={(e) => onChange("phoneNumber", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between w-full gap-3 xsm:flex-col">
            <div className="flex w-full flex-col items-start">
              <label htmlFor="Date" className="input-name">
                Date:
              </label>
              <input
                type="date"
                className="form-control input-field"
                id="date"
                onChange={(e) => onChange("date", e.target.value)}
              />
            </div>
            <div className="flex w-full flex-col items-start">
              <label htmlFor="amountPaid" className="input-name">
                Amount Paid:
              </label>
              <input
                type="number"
                className="form-control input-field"
                id="amountPaid"
                onChange={(e) => onChange("amountPaid", e.target.value)}
              />
            </div>
          </div>
          <div className="w-full">
            <label>Select the payment method</label>
            <select
              className="bg-black form-control text-white w-full mt-2"
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
