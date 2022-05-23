import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function LogInPage() {
  const {register, handleSubmit}= useForm()

  const loginSubmit=(data)=>{
    console.log(data)
  }
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
        <form onSubmit={handleSubmit(loginSubmit)}>
          <div className="login_fields">
            <div className="login_input">
              <h2>Login </h2>
              <input type="email" placeholder="Email" {...register('email')} />
              <input type="password" placeholder="Password" {...register('password')}/>
              <button type="submit">Login</button>
              <Link to="/register">Click Here For Register</Link>
            </div>
          </div>
      </form>
        </div>
      </div>
    </div>
  );
}

export default LogInPage;
