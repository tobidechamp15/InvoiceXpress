import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "./axios/axios";

const Products = () => {
  //   const [showModal, setShowModal] = useState(false);

  const [userProducts, setUserProducts] = useState([]);
  const userToken = localStorage.getItem("userToken");
  const userID = localStorage.getItem("userID");
  //   console.log(userID);
  const getAllProduct = () => {
    axiosInstance
      .get("/getAllProduct", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        const datas = response.data.data;
        let dataList = [];
        for (let i in datas) {
          if (datas[i].user === userID) {
            dataList.push(datas[i]);
          }
        }
        console.log(dataList);
        dataList.sort((a, b) => a.productID - b.productID);

        setUserProducts(dataList);
      });
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <div className="text-white container-fluid h-screen my-4 ">
      <div className="justify-between items-center flex md:mx-[24px]">
        <span className="nav-title">Products</span>
        <Link
          to="/dashboard/add-products"
          //   onClick={setShowModal(true)}
          className="flex gap-2 items-center gen-rec-cont"
        >
          <img src="" alt="" />
          <span className="gen-rec">Add Products</span>
        </Link>
      </div>
      <div className="flex flex-col gap-3 my-3">
        <div className="flex justify-around  rounded-lg bg-white p-4">
          <div className="text-black products  w-full  flex items-center justify-center">
            Product Name
          </div>
          <div className="text-black products  w-full  flex items-center justify-center">
            Quantity
          </div>
          <div className="text-black products  w-full  flex items-center justify-center">
            Product ID
          </div>
          <div className="text-black products  w-full  flex items-center justify-center">
            Price
          </div>
        </div>
        <div>
          {userProducts.map((pro, index) => (
            <div
              key={index}
              className="flex justify-around  bg-white border-b border-[#A3A3A3] p-3"
            >
              <div className="text-black products bg-white w-full  flex items-center justify-center">
                {pro.productName}
              </div>
              <div className="text-black products bg-white w-full  flex items-center justify-center">
                {pro.quantity}
              </div>
              <div className="text-black products bg-white w-full  flex items-center justify-center">
                {pro.productID}
              </div>
              <div className="text-black products bg-white w-full  flex items-center justify-center">
                {pro.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
