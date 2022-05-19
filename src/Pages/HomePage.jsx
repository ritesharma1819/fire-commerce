import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

function HomePage() {
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          {product.map((product, i) => {
            return (
              <div key={i} className="col-md-4 text-center ">
                <div className="m-2 p-1 product">
                  <div className="product_content">
                    <p>{product.name}</p>
                    <img
                      className="product_img"
                      src={product.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="product_action">
                    <h3>{product.price} RS/-</h3>
                    <div>
                      <button className="mx-1">ADD TO CART</button>
                      <button>VIEW</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
