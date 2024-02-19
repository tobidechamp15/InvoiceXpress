import React from "react";
// Import React and other necessary modules
import PropTypes from "prop-types";

const Receipt = ({ invoiceData }) => {
  // Destructure the invoiceData object
  const { invoice, items } = invoiceData;
  // Destructure the invoice object
  const {
    customerName,
    email,
    phone,
    address,
    // amountPaid,
    datePaid,
    paymentMethod,
  } = invoice;

  // Render the receipt using invoiceData
  const totalAmount = items.reduce((total, item) => total + item.price, 0);

  return (
    <div className="min-h-screen pt-10">
      <div className="receipt-container text-black">
        <h2>Receipt</h2>
        <div className="customer-info">
          <p>
            <strong>Customer Name:</strong> {customerName} {datePaid}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
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
                <span>{item.itemName}</span>
                <span>${item.price.toFixed(2)}</span>
                <span>Qty: {item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="total-amount">
          <p>
            <strong>Total Amount:</strong> ${totalAmount.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
Receipt.propTypes = {
  invoiceData: PropTypes.shape({
    invoice: PropTypes.shape({
      customerName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      amountPaid: PropTypes.string.isRequired,
      datePaid: PropTypes.string.isRequired,
      paymentMethod: PropTypes.string.isRequired,
    }).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        itemName: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
export default Receipt;
