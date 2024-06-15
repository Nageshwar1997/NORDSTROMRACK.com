import React from "react";
import { Link } from "react-router-dom";
import paymentSuccessImage from "../assets/paymentSuccess.gif";

const PaymentSuccess = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex flex-col justify-center items-center p-4 m-2 rounded">
      <img
        src={paymentSuccessImage}
        width={150}
        height={150}
        alt="Payment Success"
      />
      <p className="text-green-600 font-bold text-xl">Payment Successful</p>
      <Link to={"/orders"} className="p-2 px-3 mt-4 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white">
        Go to Orders
      </Link>
    </div>
  );
};

export default PaymentSuccess;
