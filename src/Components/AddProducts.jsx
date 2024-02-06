import React from "react";
import { useState } from "react";
import axiosInstance from "./axios/axios";
import headers from "./headers/headers";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productID, setProductID] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handlePrice = (e) => {
    let value = e.target.value;
    if (!isNaN(parseInt(value))) {
      setPrice(value);
    }
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleProductName = (e) => {
    setProductName(e.target.value);
  };
  const handleProductID = (e) => {
    setProductID(e.target.value);
  };
  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };
  const data = {
    productName,
    productID,
    description,
    quantity,
    price,
  };
  const handleCreateProducts = (e) => {
    e.preventDefault();
    // console.log(data);
    axiosInstance
      .post("createProduct", data, { headers })
      .then((response) => {
        setErrorMessage("Product created successfully");

        // alert(response.message);
        console.log(response);
      })
      .catch((err) => {
        // alert(err);
        if (err) {
          setErrorMessage("Product Id already exists");
        }
      });
  };
  const handleFormChange = () => {
    setErrorMessage(null);
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
          <span className="gen-rec">Add Products</span>
        </span>
      </div>
      <div
        className={`${
          errorMessage
            ? " transition-all ease-in-out left-0 p-3"
            : "transition-all ease-in-out left-full "
        } flex rounded-lg my-2 absolute  w- ms-[265px] me-[10px]  w-auto bg-[#fff] text-[#0066ff]`}
      >
        {errorMessage}
      </div>
      <div className="flex flex-col w-full justify-center items-center mt-4">
        <form
          onChange={handleFormChange}
          onSubmit={handleCreateProducts}
          className=" flex flex-col gap-3 xsm:w-full md:w-3/5 mt-16 items-center justify-center"
        >
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Product Name</span>
            <input
              type="text"
              className="form-control input-text"
              value={productName}
              onChange={handleProductName}
              required
            />
          </div>
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Product ID</span>
            <input
              type="number"
              className="form-control input-text"
              value={productID}
              onChange={handleProductID}
              required
            />
          </div>
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Description</span>
            <input
              type="text"
              className="form-control input-text"
              value={description}
              onChange={handleDescription}
              required
            />
          </div>
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Quantity</span>
            <input
              type="number"
              className="form-control input-text"
              value={quantity}
              onChange={handleQuantity}
              required
            />
          </div>
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Price</span>
            <input
              type="number"
              className="form-control input-text"
              value={price}
              onChange={handlePrice}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
