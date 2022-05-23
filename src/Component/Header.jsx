import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { useSelector } from "react-redux";

function Header() {
  const { cartItem } = useSelector((state) => state.CartReducer);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Fire Commerce{" "}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              {" "}
              <AiOutlineBars size={25} color="white" />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/">
                  {user}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  LogOut
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <FaCartPlus /> {cartItem.length}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
