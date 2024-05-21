// React Hooks
import React, { useState } from "react";

// Logo
import signUpLogo from "../assets/LoginIcon.webp";

// React Icons
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Router
import { Link, useNavigate } from "react-router-dom";

// Helpers
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";

// React Toast
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    // console.log("File :", file);

    const imagePic = await imageTobase64(file);
    // console.log("Image Pic :", imagePic);

    setData((prev) => ({ ...prev, profilePic: imagePic }));
  };

  // console.log("Data Sign Up :", data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submit Data Sign Up :", data);

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
      }
      // console.log("Submit Data Sign Up :", dataApi);
    } else {
      toast.error("Password and Confirm Password does not match");
    }

    // console.log("Data Sign Up :", data);
  };
  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto rounded">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img
                className="rounded-full"
                src={data.profilePic || signUpLogo}
                alt="Login Logo"
              />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-50 bg-blue-200 pb-5 cursor-pointer pt-1 text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form onSubmit={handleSubmit} className="pt-6">
            <div className="grid mb-1">
              <label htmlFor="name">Name : </label>
              <div className="bg-blue-100 p-2 inputBorderRadius">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  placeholder="Enter Your Full Name"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid mb-1">
              <label htmlFor="email">Email : </label>
              <div className="bg-blue-100 p-2 inputBorderRadius">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="Enter Your Email"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid mb-1">
              <label htmlFor="password">Password : </label>
              <div className="bg-blue-100 p-2 flex items-center inputBorderRadius">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  placeholder="Enter Password"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div className="grid mb-1">
              <label htmlFor="password">Confirm Password : </label>
              <div className="bg-blue-100 p-2 flex items-center inputBorderRadius">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  placeholder="Enter Confirm Password"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className="hover:bg-blue-700 bg-blue-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Sign Up
            </button>
          </form>
          <p className="my-5">
            Already have an account ?{" "}
            <Link
              to={"/login"}
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
