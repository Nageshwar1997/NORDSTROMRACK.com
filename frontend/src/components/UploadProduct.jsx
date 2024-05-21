import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";

const UploadProduct = ({ onClose }) => {
  const [product, setProduct] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImages: [],
    description: "",
    originalPrice: "",
    sellingPrice: "",
  });

  const handleOnChange = (e) => {};
  return (
    <div className="bg-blue-100 bg-opacity-50 fixed w-full h-full bottom-0 top-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md w-full max-w-2xl h-full max-h-[80%]">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg">Upload Product</h1>
          <div
            className="w-fit ml-auto font-bold text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <RiCloseCircleLine />
          </div>
        </div>
        <form className="grid gap-2 p-4">
          <label htmlFor="productName" className="cursor-pointer w-fit">
            Product Name :
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={product.productName}
            onChange={handleOnChange}
            placeholder="Enter Product Name"
            className="p-2 bg-blue-50 border rounded-md"
            title="Please Fill Product Name Field"
            required
          />
          <label htmlFor="brandName" className="cursor-pointer w-fit mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            value={product.brandName}
            onChange={handleOnChange}
            placeholder="Enter Product Brand"
            className="p-2 bg-blue-50 border rounded-md"
            title="Please Fill Product Brand Field"
            required
          />
          <label htmlFor="category" className="cursor-pointer w-fit mt-3">
            Category Name :
          </label>
          <select
            name="category"
            id="category"
            value={product.category}
            className="p-2 bg-blue-50 border rounded-md"
          ></select>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
