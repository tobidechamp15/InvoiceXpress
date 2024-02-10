import React, { useState } from "react";
import CustomerInfo from "./CustomerInfo";
import axiosInstance from "./axios/axios";
import headers from "./headers/headers";

const ReceiptTest = () => {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [date, setDate] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [products, setProducts] = useState([]);
  const [productInput, setProductInput] = useState({ id: "", quantity: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(
        `/getByProductId/${productInput.id}`,
        { headers }
      );
      const productData = response.data;
      const productWithQuantity = {
        ...productData,
        quantity: productInput.quantity,
      };
      setProducts((prevProducts) => [...prevProducts, productWithQuantity]);
      console.log(products);
      setProductInput({ id: "", quantity: "" }); // Clear input fields after fetching
    } catch (error) {
      console.log(
        // `Error fetching product with ID ${productInput.id}:`,
        "Error",
        error.response.data.message
      );
    }
  };

  const handleCustomerInfoChange = (name, value) => {
    // Handle changes in customer information

    if (name === "customerName") {
      setCustomerName(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "paymentMethod") {
      setPaymentMethod(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
    } else if (name === "date") {
      setDate(value);
    } else if (name === "amountPaid") {
      setAmountPaid(value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (productInput.id.trim() !== "" && productInput.quantity.trim() !== "") {
      fetchProduct();
    }
  };
  const calculateTotalAmount = () => {
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const handleCreateInvoice = () => {
    // handleCustomerInfoChange();
    const items = products.map((product) => ({
      itemName: product.productName,
      quantity: product.quantity,
      price: product.price,
    }));
    const data = JSON.stringify({
      invoice: {
        customerName,
        email,
        phone: phoneNumber,
        address,
        amountPaid,
        datePaid: date,
        paymentMethod,
      },
      items,
    });

    axiosInstance
      .post("/createInvoice", data, { headers })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err.response);
      });
  };
  return (
    <div className="text-white container-fluid min-h-screen my-4 ">
      <div className="justify-between items-center flex md:mx-[24px]">
        <span className="nav-title">Add Products</span>
        <span
          to="/dashboard/add-products"
          //   onClick={setShowModal(true)}
          className="flex gap-2 items-center gen-rec-cont"
        >
          <img src="" alt="" />
          <span onClick={handleCreateInvoice} className="gen-rec">
            Generate Receipt
          </span>
        </span>
      </div>
      <CustomerInfo onChange={handleCustomerInfoChange} />
      <div className="flex flex-col w-full justify-center items-center mt-4">
        <form
          onSubmit={handleSubmit}
          className=" flex gap-2 xsm:flex-col xsm:w-full md:w-[75%]  items-center justify-center"
        >
          <div className=" flex-col flex gap-2 items-start w-full">
            <span className="input-name">Enter product ID:</span>
            <input
              type="number"
              className="form-control input-text  md:w-[196px]"
              name="id"
              value={productInput.id}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className=" flex-col flex gap-2 items-start w-full">
            <span className="input-name">Enter quantity</span>
            <input
              type="number"
              className="form-control input-text md:w-[196px]"
              name="quantity"
              value={productInput.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary md:w-[96px]">
            Fetch Product
          </button>
        </form>
      </div>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.productName} - #{product.price} - Quantity:{" "}
            {product.quantity}
          </li>
        ))}
      </ul>
      <input
        className="input-field form-control my-3 md:w-[196px]"
        value={calculateTotalAmount()}
      />
    </div>
  );
};

export default ReceiptTest;
