import React from "react";
import {Link} from 'react-router-dom'

function RegisterPage() {
  return (
    <div className="register_parent">
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
          <div className="register_fields">
            <div className="register_input">
              <h2>Register </h2>
              <input type="text" placeholder="Username" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Register</button>
              <Link to='/login'>Click Here For Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
