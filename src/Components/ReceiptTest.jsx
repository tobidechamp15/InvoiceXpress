import React, { useState } from "react";
import CustomerInfo from "./CustomerInfo";
import Receipt from "./Receipt";
import { doc, getDoc } from "firebase/firestore";
import { db, userID } from "./firebase/config";

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
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input changes for product details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  // Fetch product details by product ID
  const fetchProductByID = async (productID) => {
    try {
      setLoading(true); // Set loading state before API call
      const productRef = doc(db, "products", userID, "userProducts", productID);
      const productSnapshot = await getDoc(productRef);

      if (productSnapshot.exists()) {
        const product = { id: productSnapshot.id, ...productSnapshot.data() };
        return product;
      } else {
        console.error("No such product found!");
        return null;
      }
    } catch (err) {
      console.error("Error fetching product by ID:", err);
      throw err;
    } finally {
      setLoading(false); // Ensure loading state is reset
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, quantity } = productInput;

    if (!id.trim() || !quantity.trim()) {
      alert("Please enter both product ID and quantity.");
      return;
    }

    try {
      const product = await fetchProductByID(id);
      if (product) {
        setProducts((prevProducts) => [
          ...prevProducts,
          { ...product, quantity: parseInt(quantity, 10) },
        ]);
        setProductInput({ id: "", quantity: "" }); // Reset form inputs
      } else {
        alert("Product not found!");
      }
    } catch {
      alert("Failed to fetch product. Please try again.");
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
    setInvoiceData(data); // Set invoice data
    setShowInvoice(true); // Show the invoice component
  };

  return (
    <>
      {showInvoice ? (
        <Receipt invoiceData={invoiceData} />
      ) : (
        <div className="container mx-auto text-white my-4 flex-grow">
          <div className="flex justify-between items-center md:mx-[24px]">
            <span className="nav-title">Generate Receipt</span>
            <span
              onClick={handleCreateInvoice}
              className="cursor-pointer flex items-center gap-2 gen-rec"
            >
              Generate Receipt
            </span>
          </div>

          <CustomerInfo onChange={handleCustomerInfoChange} />

          <div className="flex flex-col w-full justify-center items-center mt-6">
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap gap-4 justify-center items-center w-full md:w-[75%]"
            >
              <div className="flex flex-col gap-1 items-start w-full md:w-[196px]">
                <label htmlFor="productId" className="text-sm text-white">
                  Enter product ID:
                </label>
                <input
                  id="productId"
                  type="text"
                  className="form-control input-text w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="id"
                  value={productInput.id}
                  onChange={handleInputChange}
                  required
                />
              </div>

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

              <button
                type="submit"
                className="btn btn-primary bg-blue-500 text-white rounded-lg px-4 py-2 w-full md:w-[96px] hover:bg-blue-600 transition duration-200"
              >
                {loading ? "Fetching..." : "Fetch Product"}
              </button>
            </form>

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
