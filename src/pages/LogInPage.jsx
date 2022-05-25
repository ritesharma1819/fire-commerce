import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Loader from "../component/Loader";
import { toast } from "react-toastify";

function LogInPage() {
  const { register, handleSubmit } = useForm();
  const [loader, setLoader] = useState(false);
  const auth = getAuth();

  const loginSubmit = async (data) => {
    console.log(data);
    try {
      setLoader(true);
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      localStorage.setItem("currentUser", JSON.stringify(result));
      toast.success("Login successful");
      setLoader(false);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
      setLoader(false);
    }
  };
  return (
    <div className="login_parent">
      {loader && <Loader />}
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
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
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
