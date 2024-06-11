import React, { useContext } from "react";
import { Link } from "react-router-dom";
import displayINRCurrency from "../helpers/displayCurrency";
import scrollTop from "../helpers/scrollTop";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const SearchProductCard = ({ loading, products = [] }) => {
  const loadingListArr = new Array(12).fill(null);
  const { fetchAddToCartCount } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchAddToCartCount();
  };

  const calculateDiscount = (originalPrice, sellingPrice) => {
    return Math.round(((originalPrice - sellingPrice) / originalPrice) * 100);
  };

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {loading
        ? loadingListArr.map((_, index) => (
            <div
              key={index + "Category Product"}
              className="w-full bg-white shadow-lg border border-gray-200 rounded-lg"
            >
              <div className="bg-slate-200 h-48 sm:h-36 md:h-40 lg:h-48 xl:h-56 p-4 animate-pulse rounded-t-lg"></div>
              <div className="p-4 space-y-2">
                <p className="bg-slate-200 h-6 sm:h-4 md:h-5 lg:h-6 xl:h-7 w-full rounded-full animate-pulse"></p>
                <p className="bg-slate-200 h-6 sm:h-4 md:h-5 lg:h-6 xl:h-7 w-full rounded-full animate-pulse"></p>
                <p className="bg-slate-200 h-6 sm:h-4 md:h-5 lg:h-6 xl:h-7 w-full rounded-full animate-pulse"></p>
                <div className="flex items-center gap-3 mt-2">
                  <p className="bg-slate-200 h-6 sm:h-4 md:h-5 lg:h-6 xl:h-7 w-full rounded-full animate-pulse"></p>
                  <p className="bg-slate-200 h-6 sm:h-4 md:h-5 lg:h-6 xl:h-7 w-full rounded-full animate-pulse"></p>
                </div>
                <button className="bg-slate-200 py-3 px-2 w-full rounded-full animate-pulse mt-2"></button>
              </div>
            </div>
          ))
        : products?.map((product, index) => (
            <Link
              to={`/product/${product?._id}`}
              key={index + "Category Product"}
              className="w-full bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl"
              onClick={() => scrollTop()}
            >
              <div className="bg-slate-200 h-48 p-2 flex items-center justify-center rounded-t-lg border border-slate-300">
                <img
                  src={product?.productImages[0]}
                  alt={product?.productName}
                  className="object-scale-down w-full h-full mix-blend-multiply transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h2
                  className="font-medium text-lg text-ellipsis line-clamp-2 text-black"
                  title={product?.productName}
                >
                  {product?.productName}
                </h2>
                <p className="capitalize text-gray-600">{product?.category}</p>
                <p className="text-green-800 font-medium">
                  {calculateDiscount(
                    product?.originalPrice,
                    product?.sellingPrice
                  )}
                  % OFF
                </p>
                <div className="flex items-center gap-3 text-lg mt-2">
                  <p className="text-red-600 font-medium">
                    {displayINRCurrency(product?.sellingPrice)}
                  </p>
                  <p className="line-through text-gray-500">
                    {displayINRCurrency(product?.originalPrice)}
                  </p>
                </div>
                <button
                  className="mt-2 text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 w-[95%] md:w-[90%] lg:w-full block mx-auto rounded-full"
                  onClick={(e) => handleAddToCart(e, product._id)}
                >
                  Add To Cart
                </button>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default SearchProductCard;
