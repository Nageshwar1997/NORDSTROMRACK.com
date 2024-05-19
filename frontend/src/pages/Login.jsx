import React, { useState } from "react";

// Logo
import loginLogo from "../assets/LoginIcon.webp";

// React Icons
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  console.log("Data Login :", data);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit Data Login :", data);

  };
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto rounded">
          <div className="w-20 h-20 mx-auto">
            <img className="rounded-full" src={loginLogo} alt="Login Logo" />
          </div>
          <form onSubmit={handleSubmit} className="pt-6">
            <div className="grid mb-4">
              <label htmlFor="email">Email : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="Enter Your Email"
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label htmlFor="password">Password : </label>
              <div className="bg-slate-100 p-2 flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  placeholder="Enter Your Password"
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block ml-auto text-blue-600 hover:underline hover:text-blue-700"
              >
                Forgot Password ?
              </Link>
            </div>
            <button className="hover:bg-blue-700 bg-blue-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Login
            </button>
          </form>
          <p className="my-5">
            Don't have an account ?{" "}
            <Link
              to={"/sign-up"}
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
