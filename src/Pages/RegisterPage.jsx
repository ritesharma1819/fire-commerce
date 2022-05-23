import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function RegisterPage() {

  const {register, handleSubmit}= useForm()

  const registerSubmit=(data)=>{
    console.log(data)
  }
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
          <form onSubmit={handleSubmit(registerSubmit)}>
          <div className="register_fields">
            <div className="register_input">
              <h2>Register </h2>
              <input type="text" placeholder="Username" {...register("username")} />
              <input type="email" placeholder="Email"  {...register("email")}/>
              <input type="password" placeholder="Password" {...register("password")} />
              <button type="submit">Register</button>
              <Link to="/login">Click Here For Login</Link>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
