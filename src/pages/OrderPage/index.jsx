import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import { db } from "../../utils/firebase";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);

  const getProduct = async () => {
    try {
      setLoader(true);
      const userOrder = await getDocs(collection(db, "orders"));
      const orderArray = [];
      userOrder.forEach((doc) => {
        orderArray.push(doc.data());
      });
      setOrders(orderArray);
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
      {orders.map((order, i) => {
        return (
          <table className="table mt-3" key={i}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItem.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <img src={item.imageUrl} alt="" height="80" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      })}
    </Layout>
  );
};

export default OrderPage;
