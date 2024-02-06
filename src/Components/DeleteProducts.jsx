import React from "react";
import { useState } from "react";
import axiosInstance from "./axios/axios";
import headers from "./headers/headers";

const DeleteProducts = () => {
  const [productID, setProductID] = useState("");
  const [error, setError] = useState("");

  const handleProductID = (e) => {
    setProductID(e.target.value);
  };
  const handleDeleteProducts = (e) => {
    e.preventDefault();
    axiosInstance
      .delete(`deleteProduct/${productID}`, { headers })
      .then((response) => {
        setError(response.data.message);

        console.log(response.data.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.error(err.response);
      });
  };
  return (
    <div className="text-white container-fluid h-screen my-4 ">
      <div className="justify-between items-center flex md:mx-[24px]">
        <span className="nav-title">Delete Products</span>
        <span
          to="/dashboard/add-products"
          //   onClick={setShowModal(true)}
          className="flex gap-2 items-center gen-rec-cont"
        >
          <img src="" alt="" />
          <span className="gen-rec">Add Products</span>
        </span>
      </div>
      <div className="flex flex-col w-full justify-center items-center mt-4">
        <form
          //   onChange={handleFormChange}
          onSubmit={handleDeleteProducts}
          className=" flex flex-col gap-3 xsm:w-full md:w-3/5 mt-16 items-center justify-center"
        >
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Product ID</span>
            <input
              type="number"
              className="form-control input-text"
              value={productID}
              onChange={handleProductID}
              required
            />
          </div>{" "}
          {error && <div className="text-red-500 w-full">{error}</div>}
          <button type="submit" className="btn btn-primary">
            Delete Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteProducts;
