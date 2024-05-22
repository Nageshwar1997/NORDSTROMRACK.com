import React, { useState } from "react";
import displayINRCurrency from "../helpers/displayCurrency";

import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
const AdminProductCard = ({ product, fetchAllProducts }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40 relative">
        <img
          src={product?.productImages[0]}
          alt={product?.productName}
          width={100}
          height={100}
          className="w-fit mx-auto"
        />
        <h1 className="mb-1">{product?.productName}</h1>
        <div>
          <div className="flex gap-2">
            <p className="font-semibold">
              {displayINRCurrency(product?.sellingPrice)}
            </p>
            <p className="text-gray-500 line-through">
              {displayINRCurrency(product?.originalPrice)}
            </p>
          </div>
          <div
            className="absolute -top-2 -right-2 w-fit ml-auto p-2 cursor-pointer bg-green-100 hover:bg-green-600 hover:text-white rounded-full"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEdit />
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          productData={product}
          onClose={() => setEditProduct(false)}
          fetchAllProducts={fetchAllProducts}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
