import React from "react";
import { Link } from "react-router-dom";

function LogInPage() {
  return (
    <div className="login_parent">
      <div className="row">
        <div className="col-md-6">
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_skfh9odt.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-4 ">
          <div className="login_fields">
            <div className="login_input">
              <h2>Login </h2>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Login</button>
              <Link to="/register">Click Here For Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogInPage;
