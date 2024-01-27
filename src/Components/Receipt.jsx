// Receipt.js
import React from "react";
import PropTypes from "prop-types";

const Receipt = ({ customerName, address, paymentMethod, items }) => {
  return (
    <div className="receipt-container text-black">
      <h2>Receipt</h2>
      <div className="customer-info">
        <p>
          <strong>Customer Name:</strong> {customerName}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>
      </div>
      <div className="payment-info">
        <p>
          <strong>Payment Method:</strong> {paymentMethod}
        </p>
      </div>
      <div className="items-list">
        <h3>Items</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <span>{item.description}</span>
              <span>${item.price.toFixed(2)}</span>
              <span>Qty: {item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="total-amount">
        <p>
          <strong>Total Amount:</strong> $
          {items
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </p>
      </div>
    </div>
  );
};

Receipt.propTypes = {
  customerName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Receipt;
