import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Layout from "../../component/Layout";
import { db } from "../../utils/firebase";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [add, setAdd] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    imageUrl: "",
    category: "",
    price: 0,
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getProduct = async () => {
    try {
      setLoader(true);
      const user = await getDocs(collection(db, "products"));
      const productArray = [];
      user.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productArray.push(obj);
      });
      setProducts(productArray);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const editHandler = (item) => {
    handleShow();
    setProduct(item);
  };

  const updateData = async () => {
    try {
      setLoader(true);
      await setDoc(doc(db, "products", product.id), product);
      getProduct();
      toast.success("Upadted successfully");
      window.location.reload();
      setLoader(false);
    } catch (error) {
      toast.error("Upadte failed");
      setLoader(false);
    }
  };
  const addData = async () => {
    try {
      setLoader(true);
      await addDoc(collection(db, "products"), product);
      toast.success("Add successfully");
      window.location.reload();
      handleClose();
      setLoader(false);
    } catch (error) {
      toast.error("Add failed");
      setLoader(false);
    }
  };

  const deleteProduct = async (item) => {
    try {
      setLoader(true);
      await deleteDoc(doc(db, "products", item.id));
      toast.success("Product deleted successfully");
      getProduct();
      setLoader(false);
    } catch (error) {
      toast.error("Product deleted failed");
      setLoader(false);
    }
  };

  const addHandler = () => {
    setAdd(true);
    handleShow();
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <Layout loader={loader}>
      <div className="d-flex justify-content-between mx-2 my-2">
        <h3 className="mt-2">Products List</h3>
        <button onClick={addHandler}>Add Product</button>
      </div>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, i) => {
            return (
              <tr key={i}>
                <td>
                  <img src={item.imageUrl} alt="" height="80" />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td style={{ cursor: "pointer" }}>
                  <FaTrash onClick={() => deleteProduct(item)} />{" "}
                  <FaEdit onClick={() => editHandler(item)} />{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{add ? "Add Product" : "Edit Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-2">
            <input
              type="text"
              placeholder="Name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="ImageUrl"
              value={product.imageUrl}
              onChange={(e) =>
                setProduct({ ...product, imageUrl: e.target.value })
              }
            />
            <input
              type="text"
              value={product.description}
              placeholder="Description"
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="price"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Category"
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          {add ? (
            <button type="submit" onClick={addData}>
              Add
            </button>
          ) : (
            <button type="submit" onClick={updateData}>
              Save
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default AdminPage;
