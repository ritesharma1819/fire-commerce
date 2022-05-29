import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../component/Layout";
import { db } from "../../utils/firebase";

const HomePage = () => {
  const [product, setProduct] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterKey, setFilterKey] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.CartReducer);

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

  const addtocart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Layout loader={loader}>
      <div className="container">
        <div className="d-flex my-4 gap-2 mx-2">
          <input
            type="text"
            placeholder="Search Items"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <select
            value={filterKey}
            onChange={(e) => setFilterKey(e.target.value)}
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="mobile">Mobiles</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>
        <div className="row">
          {product
            .filter((obj) => obj.name.toLowerCase().includes(searchKey))
            .filter((obj) => obj.category.toLowerCase().includes(filterKey))
            .map((product, i) => {
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
                        <button
                          className="mx-1"
                          onClick={() => addtocart(product)}
                        >
                          ADD TO CART
                        </button>
                        <button
                          onClick={() => {
                            navigate(`/product/${product.id}`);
                          }}
                        >
                          VIEW
                        </button>
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
};

export default HomePage;
