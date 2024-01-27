// ReceiptDetails.js
import React from "react";
import PropTypes from "prop-types";

const ReceiptDetails = ({ items, onItemChange, onAddItem, onRemoveItem }) => {
  const calculateTotalAmount = () => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };
  console.log(items);
  return (
    <div className="flex w-full justify-center items-center">
      <div className="md:w-[70%] flex flex-col justify-center w-">
        {items.map((item, index) => (
          <div key={index} className="mt-3 p-2">
            <label>Item Name:</label>
            <input
              type="text"
              value={item.description}
              className="form-control item-input mt-2"
              onChange={(e) =>
                onItemChange(index, "description", e.target.value)
              }
            />
            <div className="flex justify-between mt-3 gap-2">
              <div>
                <label>Price:</label>
                <input
                  type="number"
                  value={item.price}
                  className="form-control item-input mt-2"
                  onChange={(e) =>
                    onItemChange(index, "price", parseFloat(e.target.value))
                  }
                />
              </div>
              <div>
                <label>Quantity:</label>
                <input
                  type="number"
                  value={item.quantity}
                  className="form-control mt-2 item-input"
                  onChange={(e) =>
                    onItemChange(index, "quantity", parseInt(e.target.value))
                  }
                />
              </div>

              <button
                onClick={() => onRemoveItem(index)}
                className="btn-danger btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <div className="flex w-full xsm:flex-col justify-around gap-2 my-4">
          <button onClick={onAddItem} className="btn-outline-primary btn ">
            Add Item
          </button>
          <div className="flex gap-2 items-center xsm:justify-end">
            <label className="">Total Amount</label>
            <input
              type="text"
              readOnly
              value={calculateTotalAmount()}
              className="form-control item-input w-fit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ReceiptDetails.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onItemChange: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

export default ReceiptDetails;
