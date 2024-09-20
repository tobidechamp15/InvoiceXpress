// ReceiptGenerator.js
import React, { useState } from "react";
import CustomerInfo from "./CustomerInfo";
import ReceiptDetails from "./ReceiptDetails";
import Receipt from "./Receipt";
import genIcon from "../assets/genIcon.svg";

const Recgen = () => {
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [items, setItems] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false); // Add showReceipt state

  const handleCustomerInfoChange = (name, value) => {
    // Handle changes in customer information

    if (name === "customerName") {
      setCustomerName(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "paymentMethod") {
      setPaymentMethod(value);
    }
  };

  const handleItemChange = (index, name, value) => {
    // Handle changes in receipt details (items)
    const updatedItems = [...items];
    updatedItems[index][name] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    // Add a new item to the receipt
    setItems((prevItems) => [
      ...prevItems,
      { description: "", price: 0, quantity: 1 },
    ]);
  };

  const removeItem = (index) => {
    // Remove an item from the receipt
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const generateReceipt = () => {
    // Handle receipt generation logic
    console.log("Generated Receipt:", {
      customerName,
      address,
      paymentMethod,
      items,
    });
    setShowReceipt(true);
  };

  return (
    <div className="container-fluid flex-grow py-5">
      {showReceipt ? (
        <Receipt
          customerName={customerName}
          address={address}
          paymentMethod={paymentMethod}
          items={items}
        />
      ) : (
        <>
          <span className="nav-title">Generate Receipt </span>
          <CustomerInfo onChange={handleCustomerInfoChange} />
          <ReceiptDetails
            items={items}
            onItemChange={handleItemChange}
            onAddItem={addItem}
            onRemoveItem={removeItem}
          />
          <div className="w-full flex items-center justify-center">
            <button
              onClick={generateReceipt}
              className="btn btn-primary mt-2 btn-gen flex gap-2 items-center"
            >
              <img src={genIcon} alt="" />
              Generate Receipt
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Recgen;
