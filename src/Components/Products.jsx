import React, { useEffect, useState } from "react";
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
        setUserProducts(dataList);
      });
  };

  useEffect(() => {
    getAllProduct();
  }, [userProducts]);
  return (
    <div className="text-white container-fluid h-screen my-4 ">
      <div className="justify-between items-center flex md:mx-[24px]">
        <span className="nav-title">Products</span>
        <div
          to="/dashboard/generate-receipt"
          //   onClick={setShowModal(true)}
          className="flex gap-2 items-center gen-rec-cont"
        >
          <img src="" alt="" />
          <span className="gen-rec">Add Products</span>
        </div>
      </div>
      {userProducts.map((pro, index) => (
        <div key={index}>
          <span className="text-white">{pro.productName}</span>
        </div>
      ))}
    </div>
  );
};

export default Products;
