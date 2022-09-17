import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Layout from "../../component/Layout";
import { db } from "../../utils/firebase";

const CartPage = () => {
  const { cartItem } = useSelector((state) => state.CartReducer);
  const { register, handleSubmit } = useForm();
  const [totalAmount, setTotalAmount] = useState(0);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const placeorderSubmit = async (data) => {
    const addressInfo = data;
    const orderInfo = {
      cartItem,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      uderId: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };
    try {
      setLoader(true);
      await addDoc(collection(db, "orders"), orderInfo);
      toast.success("Order placed successfully");
      setLoader(false);
    } catch (error) {
      toast.error("Order placed failed");
      setLoader(false);
    }
  };

  const deletefromcart = (item) => {
    dispatch({ type: "DELETE_FROM_CART", payload: item });
  };

  useEffect(() => {
    let temp = 0;
    let newCartItem = cartItem.reduce((previosCartItem, currentCartItem) => {
      return previosCartItem + currentCartItem.price;
    }, temp);
    setTotalAmount(newCartItem);
  }, [cartItem]);

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  return (
    <Layout loader={loader}>
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

export default CartPage;
