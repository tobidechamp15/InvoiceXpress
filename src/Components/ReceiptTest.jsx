import React, { useState } from "react";
import axiosInstance from "./axios/axios";
import headers from "./headers/headers";

const ReceiptTest = () => {
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
  return (
    <div className="text-white container-fluid h-screen my-4 ">
      <div className="justify-between items-center flex md:mx-[24px]">
        <span className="nav-title">Add Products</span>
        <span
          to="/dashboard/add-products"
          //   onClick={setShowModal(true)}
          className="flex gap-2 items-center gen-rec-cont"
        >
          <img src="" alt="" />
          <span className="gen-rec">Generate Receipt</span>
        </span>
      </div>
      <div className="flex flex-col w-full justify-center items-center mt-4">
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col gap-3 xsm:w-full md:w-3/5 mt-16 items-center justify-center"
        >
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Enter product ID:</span>
            <input
              type="number"
              className="form-control input-text"
              name="id"
              value={productInput.id}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Enter quantity</span>
            <input
              type="number"
              className="form-control input-text"
              name="quantity"
              value={productInput.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
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
      <div>Total Amount: ${calculateTotalAmount()}</div>
    </div>
  );
};

export default ReceiptTest;
