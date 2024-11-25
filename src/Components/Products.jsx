import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, userID } from "./firebase/config";
import { collection, getDocs } from "firebase/firestore";

const Products = () => {
  //   const [showModal, setShowModal] = useState(false);

  const [userProducts, setUserProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      // Reference the collection
      const userProductsRef = collection(
        db,
        "products",
        userID,
        "userProducts"
      );

      // Query to get products for the specific user
      const querySnapshot = await getDocs(userProductsRef);

      // Map through the documents and return the data
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Document ID
        ...doc.data(), // Document data
      }));

      console.log("User products:", products);
      setUserProducts(products);
      return products; // Return or set state with the products
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="text-white container-fluid min-h-screen my-4 ">
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
        {userProducts.length > 0 ? (
          <>
            <div className="flex justify-around rounded-lg bg-white p-4">
              <div className="text-black products w-full flex items-center justify-center">
                Product Name
              </div>
              <div className="text-black products w-full flex items-center justify-center">
                Quantity
              </div>
              <div className="text-black products w-full flex items-center justify-center">
                Product ID
              </div>
              <div className="text-black products w-full flex items-center justify-center">
                Price
              </div>
            </div>
            {userProducts.map((pro, index) => (
              <div
                key={index}
                className="flex justify-around bg-white border-b border-[#A3A3A3] p-3"
              >
                <div className="text-black products bg-white w-full flex items-center justify-center">
                  {pro.productName}
                </div>
                <div className="text-black products bg-white w-full flex items-center justify-center">
                  {pro.quantity}
                </div>
                <div className="text-black products bg-white w-full flex items-center justify-center">
                  {pro.productID}
                </div>
                <div className="text-black products bg-white w-full flex items-center justify-center">
                  {pro.price}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center text-center p-8">
            <span className="text-xl text-gray-400">
              No products available.
            </span>
            <span className="text-lg text-gray-500">
              It seems like you have no products yet.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
