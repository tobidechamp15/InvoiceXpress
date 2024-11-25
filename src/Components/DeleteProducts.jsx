import React, { useState } from "react";
import { Link } from "react-router-dom";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase/config"; // Make sure you import your Firebase config

const DeleteProducts = () => {
  const [productID, setProductID] = useState("");
  const [error, setError] = useState("");

  const handleProductID = (e) => {
    setProductID(e.target.value);
  };

  const handleDeleteProducts = async (e) => {
    e.preventDefault();
    setError(""); // Reset the error message before trying to delete

    if (!productID) {
      setError("Please enter a product ID.");
      return;
    }

    try {
      // Reference to the product document using productID
      const productRef = doc(
        db,
        "products",
        localStorage.getItem("userID"),
        "userProducts",
        productID
      );

      // Check if the product exists
      const docSnap = await getDoc(productRef);

      if (!docSnap.exists()) {
        setError("Product not found. Please check the Product ID.");
        return;
      }

      // Delete the product document
      await deleteDoc(productRef);

      // Success feedback
      alert("Product deleted successfully!");

      // Clear the input field after successful deletion
      setProductID("");
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="text-white container-fluid min-h-screen my-4">
      <div className="justify-between items-center flex md:mx-[24px]">
        <span className="nav-title">Delete Products</span>
        <Link
          to="/dashboard/add-products"
          className="flex gap-2 items-center gen-rec-cont"
        >
          <img src="" alt="" />
          <span className="gen-rec">Add Products</span>
        </Link>
      </div>
      <div className="flex flex-col w-full justify-center items-center mt-4">
        <form
          onSubmit={handleDeleteProducts}
          className="flex flex-col gap-3 xsm:w-full md:w-3/5 mt-16 items-center justify-center"
        >
          <div className="flex-col flex gap-4 items-start w-full">
            <span className="input-name">Product ID</span>
            <input
              type="text"
              className="form-control input-text"
              value={productID}
              onChange={handleProductID}
              required
            />
          </div>
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
