import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { FaCloudUploadAlt } from "react-icons/fa";
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchAllProducts }) => {
  const [product, setProduct] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImages: [],
    description: "",
    originalPrice: "",
    sellingPrice: "",
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setProduct((prev) => {
      return {
        ...prev,
        productImages: [...prev.productImages, uploadImageCloudinary.url],
      };
    });
  };
  const handleDeleteProductImage = async (index) => {
    const newProductImages = [...product.productImages];
    newProductImages.splice(index, 1);

    setProduct((prev) => {
      return {
        ...prev,
        productImages: newProductImages,
      };
    });
  };

  // UPLOAD PRODUCT
  const handleUploadProductSubmit = async (e) => {
    e.preventDefault();
    // console.log("Product", product);

    const fetchResponse = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      fetchAllProducts();
      onClose();
    }
    if (responseData.error) {
      toast.error(responseData?.message);
    }
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
        <form
          className="grid gap-2 p-4 pb-5 overflow-y-scroll h-full"
          onSubmit={handleUploadProductSubmit}
        >
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
            onChange={handleOnChange}
            className="p-2 bg-blue-50 border rounded-md"
            required
            title={product?.category ? "" : "Please Select Category"}
          >
            <option value="">Select Category</option>
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
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {product?.productImages[0] ? (
              <div className="flex items-center gap-3">
                {product.productImages.map((img, ind) => {
                  return (
                    <div key={img + ind} className="relative group">
                      <img
                        src={img}
                        alt={img}
                        width={80}
                        height={80}
                        className="bg-blue-50 border rounded cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(img);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-0.5 bg-white text-red-700 rounded-full cursor-pointer hidden group-hover:block"
                        onClick={() => {
                          handleDeleteProductImage(ind);
                        }}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">*Please upload image</p>
            )}
          </div>
          <label htmlFor="originalPrice" className="cursor-pointer w-fit mt-3">
            Original Price :
          </label>
          <input
            type="number"
            id="originalPrice"
            name="originalPrice"
            value={product.originalPrice}
            onChange={handleOnChange}
            placeholder="Enter Original Price"
            className="p-2 bg-blue-50 border rounded-md"
            title="Please Fill Original Price Field"
            required
          />
          <label htmlFor="sellingPrice" className="cursor-pointer w-fit mt-3">
            Selling Price :
          </label>

          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            value={product.sellingPrice}
            onChange={handleOnChange}
            placeholder="Enter Selling Price"
            className="p-2 bg-blue-50 border rounded-md"
            title="Please Fill Selling Price Field"
            required
          />
          <label htmlFor="description" className="cursor-pointer w-fit mt-3">
            Product Description :
          </label>
          <textarea
            name="description"
            id="description"
            className="h-28 bg-blue-50 border rounded-md resize-none p-1"
            placeholder="Enter Product Description"
            required
            rows={3}
            value={product.description}
            onChange={handleOnChange}
          ></textarea>
          <button className="px-3 py-1 mt-2 bg-blue-600 text-white rounded mb-10 hover:bg-blue-700">
            Upload Product
          </button>
        </form>
      </div>
      {/* **** Display Image Full Screen */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
      {/* **** Display Image Full Screen */}
    </div>
  );
};

export default UploadProduct;
