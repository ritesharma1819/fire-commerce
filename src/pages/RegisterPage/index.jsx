import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const [loader, setLoader] = useState(false);
  const auth = getAuth();

  const registerSubmit = async (data) => {
    try {
      setLoader(true);
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      const usernameData = data.username;
      localStorage.setItem("username", JSON.stringify(usernameData));
      toast.success("Registration successfull");
      setLoader(false);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
      setLoader(false);
    }
  };
  return (
    <div className="register_parent">
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
          <form onSubmit={handleSubmit(registerSubmit)}>
            <div className="register_fields">
              <div className="register_input">
                <h2>Register </h2>
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username")}
                />
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
                <button type="submit">Register</button>
                <Link to="/login">Click Here For Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
