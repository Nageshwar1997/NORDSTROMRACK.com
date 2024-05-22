import React, { useState } from "react";
import UploadProduct from "../components/UploadProduct";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold uppercase text-blue-900">
          All Products
        </h1>
        <button
          onClick={() => setOpenUploadProduct(true)}
          className="border-2 py-2 px-4 rounded-full text-md border-blue-600 hover:bg-blue-600 hover:text-white transition-all font-semibold hover"
        >
          Upload Product
        </button>
      </div>
      {/* **** Upload Product Component **** */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} />
      )}
    </div>
  );
};

export default AllProducts;
