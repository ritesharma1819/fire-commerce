import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Layout from "../component/Layout";
import { useDispatch, useSelector } from "react-redux";

const CardPage = () => {
  const { cartItem } = useSelector((state) => state.CartReducer);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();

  const deletefromcart = (item) => {
    dispatch({ type: "DELETE_FROM_CART", payload: item });
  };

  useEffect(() => {
    let temp = 0;
    cartItem.forEach((cartItem) => {
      temp = temp + cartItem.price;
    });
    setTotalAmount(temp);
  }, [cartItem]);

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  return (
    <Layout>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItem.map((item, i) => {
            return (
              <tr key={i}>
                <td>
                  <img src={item.imageUrl} alt="" height="80" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td style={{ cursor: "pointer" }}>
                  <FaTrash
                    onClick={() => {
                      deletefromcart(item);
                    }}
                  />{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <h1 className="cartPage_totalamount">
          Total Amount = {totalAmount} Rs/-
        </h1>
      </div>
      <div className="d-flex justify-content-end mt-2">
        <button>Place order</button>
      </div>
    </Layout>
  );
};

export default CardPage;
