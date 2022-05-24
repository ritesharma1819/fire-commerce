import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import Layout from "../component/Layout";

const AdminPage = () => {
  const [product, setProduct] = useState([]);
  const [loader, setLoader] = useState(false);

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
      setProduct(productArray);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <Layout loader={loader}>
      <h3 className="mt-2">Products List</h3>
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
          {product.map((item, i) => {
            return (
              <tr key={i}>
                <td>
                  <img src={item.imageUrl} alt="" height="80" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td style={{ cursor: "pointer" }}>
                  <FaTrash /> <FaEdit />{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default AdminPage;
