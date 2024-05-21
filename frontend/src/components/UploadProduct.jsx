import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { FaCloudUploadAlt } from "react-icons/fa";
import productCategory from "../helpers/productCategory";

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

  const [uploadProductImageInput, setUploadProductImageInput] = useState("");

  const handleOnChange = (e) => {};

  const handleUploadProduct = (e) => {
      const file = e.target.files[0];
      setUploadProductImageInput(file.name)
    console.log("File", file);
    };
  return (
    <div className="bg-blue-100 bg-opacity-50 fixed w-full h-full bottom-0 top-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h1 className="font-bold text-lg">Upload Product</h1>
          <div
            className="w-fit ml-auto font-bold text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <RiCloseCircleLine />
          </div>
        </div>
        <form className="grid gap-2 p-4 pb-5 overflow-y-scroll h-full">
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
          >
            {productCategory.map((prod, ind) => {
              return (
                <option value={prod.value} key={prod.value + ind}>
                  {prod.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImages" className="cursor-pointer w-fit mt-3">
            Product Images :
          </label>
          <label htmlFor="uploadImageInput" className="cursor-grab">
            <div className="p-2 bg-blue-50 border rounded-md h-32 w-full flex justify-center items-center">
              <div className="text-slate-500 flex flex-col gap-2 justify-center items-center">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  name="productImages"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            <img
              src=""
              alt=""
              width={80}
              height={80}
              className="bg-blue-50 border"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
