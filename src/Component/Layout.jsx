import React from "react";
import Header from "./Header";
import Loader from "./Loader";

function Layout(props) {
  return (
    <div>
      {props.loader && <Loader />}
      <Header />
      <div className="content">{props.children}</div>
    </div>
  );
}

export default Layout;
