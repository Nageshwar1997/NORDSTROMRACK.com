import React from "react";
import { Link } from "react-router-dom";
import paymentCancelImage from "../assets/paymentCancel.gif";

const PaymentCancel = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex flex-col justify-center items-center p-4 m-2 rounded">
      <img
        src={paymentCancelImage}
        width={150}
        height={150}
        alt="Payment Cancel"
        className="mix-blend-multiply"
      />
      <p className="text-red-600 font-bold text-xl">Payment Cancelled</p>
      <Link to={"/cart"} className="p-2 px-3 mt-4 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white">
        Go to Cart
      </Link>
    </div>
  );
};

export default PaymentCancel;
