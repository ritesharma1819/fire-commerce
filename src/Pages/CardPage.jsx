import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Layout from "../component/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";

const CardPage = () => {
  const { cartItem } = useSelector((state) => state.CartReducer);
  const { register, handleSubmit } = useForm();
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const placeorderSubmit = (data) => {
    console.log(data);
  };

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
        <button onClick={handleShow}>Place order</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Address</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(placeorderSubmit)}>
          <Modal.Body>
            <div className="d-flex flex-column gap-2">
              <input type="text" placeholder="Name" {...register("name")} />
              <input
                type="text"
                placeholder="Address"
                {...register("address")}
              />
              <input
                type="number"
                placeholder="Pin Code"
                {...register("pCode")}
              />
              <input
                type="number"
                placeholder="Phone Number"
                {...register("pNumber")}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose}>Close</button>
            <button type="submit" onClick={handleClose}>
              Order
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </Layout>
  );
};

export default CardPage;
