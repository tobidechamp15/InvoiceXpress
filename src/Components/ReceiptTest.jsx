import React, { useState } from "react";
import CustomerInfo from "./CustomerInfo";
import axiosInstance from "./axios/axios";
import headers from "./headers/headers";
import Receipt from "./Receipt";

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
  const [showInvoice, setShowInvoice] = useState(false); // Changed to boolean
  const [invoiceData, setInvoiceData] = useState({});
  const [loading, setLoading] = useState(false); // Loading state for async operations

  // Handle input changes for product details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  // Fetch product details by product ID
  const fetchProduct = async () => {
    try {
      setLoading(true); // Set loading to true
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
      setProductInput({ id: "", quantity: "" }); // Clear input fields
    } catch (error) {
      console.error(
        "Error fetching product:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Handle customer information change
  const handleCustomerInfoChange = (name, value) => {
    switch (name) {
      case "customerName":
        setCustomerName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "paymentMethod":
        setPaymentMethod(value);
        break;
      case "date":
        setDate(value);
        break;
      case "amountPaid":
        setAmountPaid(value);
        break;
      default:
        break;
    }
  };

  // Handle form submission to add products
  const handleSubmit = (e) => {
    e.preventDefault();
    if (productInput.id.trim() !== "" && productInput.quantity.trim() !== "") {
      fetchProduct();
    } else {
      alert("Please enter both product ID and quantity.");
    }
  };

  // Calculate total amount for the products added
  const calculateTotalAmount = () => {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  // Create invoice
  const handleCreateInvoice = () => {
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
        setInvoiceData(JSON.parse(data));
        setShowInvoice(true); // Show the receipt after generating it
      })
      .catch((err) => {
        console.error(
          "Error creating invoice:",
          err.response?.data?.message || err.message
        );
      });
  };

  return (
    <>
      {showInvoice ? (
        <Receipt invoiceData={invoiceData} />
      ) : (
        <div className="container mx-auto text-white my-4 flex-grow">
          {/* Header */}
          <div className="flex justify-between items-center md:mx-[24px]">
            <span className="nav-title">Generate Receipt</span>
            <span
              onClick={handleCreateInvoice}
              className="cursor-pointer flex items-center gap-2 gen-rec"
            >
              Generate Receipt
            </span>
          </div>

          {/* Customer Info Component */}
          <CustomerInfo onChange={handleCustomerInfoChange} />

          {/* Product Form */}
          <div className="flex flex-col w-full justify-center items-center mt-6">
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap gap-4 justify-center items-center w-full md:w-[75%]"
            >
              {/* Product ID Field */}
              <div className="flex flex-col gap-1 items-start w-full md:w-[196px]">
                <label htmlFor="productId" className="text-sm text-white">
                  Enter product ID:
                </label>
                <input
                  id="productId"
                  type="number"
                  className="form-control input-text w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="id"
                  value={productInput.id}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Quantity Field */}
              <div className="flex flex-col gap-1 items-start w-full md:w-[196px]">
                <label htmlFor="quantity" className="text-sm text-white">
                  Enter quantity:
                </label>
                <input
                  id="quantity"
                  type="number"
                  className="form-control input-text w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="quantity"
                  value={productInput.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary bg-blue-500 text-white rounded-lg px-4 py-2 w-full md:w-[96px] hover:bg-blue-600 transition duration-200"
              >
                {loading ? "Fetching..." : "Fetch Product"}
              </button>
            </form>

            {/* Product List */}
            <ul className="mt-6 w-full md:w-[75%] bg-gray-50 border border-gray-200 rounded-lg p-4">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-2 bg-white border-b rounded-md mb-2"
                  >
                    <span className="text-gray-700 text-sm">
                      {product.productName}
                    </span>
                    <span className="text-gray-500 text-sm">
                      #{product.price}
                    </span>
                    <span className="text-gray-500 text-sm">
                      Qty: {product.quantity}
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center">
                  No products added yet.
                </p>
              )}
            </ul>

            {/* Total Amount */}
            <input
              className="form-control bg-gray-100 border rounded-lg px-3 py-2 text-sm mt-4 md:w-[196px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={calculateTotalAmount()}
              readOnly
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ReceiptTest;
