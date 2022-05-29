import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../component/Layout";
import { db } from "../../utils/firebase";

const ProductInfoPage = () => {
  const [productData, setProductData] = useState();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.CartReducer);

  const prams = useParams();

  const getProductInfo = async () => {
    try {
      setLoader(true);
      const productInfo = await getDoc(doc(db, "products", prams.id));

      setProductData(productInfo.data());
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const addtocart = (productData) => {
    dispatch({ type: "ADD_TO_CART", payload: productData });
  };

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  useEffect(() => {
    getProductInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout loader={loader}>
      <div className="container my-3">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {productData && (
              <div>
                <p>
                  <b>{productData.name}</b>
                </p>
                <img
                  src={productData.imageUrl}
                  alt=""
                  className="productInfo_img"
                />
                <hr />
                <p>{productData.description}</p>
                <div className="d-flex justify-content-end ">
                  <button onClick={() => addtocart(productData)}>
                    ADD TO CART
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductInfoPage;
