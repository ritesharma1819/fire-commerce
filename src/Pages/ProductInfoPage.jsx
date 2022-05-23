import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useParams } from "react-router-dom";

function ProductInfoPage() {
  const [productData, setProductData] = useState();
  const [loader, setLoader] = useState(false);

  const prams = useParams();

  const getProductInfo = async () => {
    try {
      setLoader(true);
      const productInfo = await getDoc(doc(db, "products", prams.id));
      console.log(productInfo.data());

      setProductData(productInfo.data());
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

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
                  <button>ADD TO CART</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductInfoPage;
