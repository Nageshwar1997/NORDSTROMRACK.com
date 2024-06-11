import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const scrollElement = useRef();
  const loadingListArr = new Array(13).fill(null);

  const { fetchAddToCartCount } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchAddToCartCount();
  };

  const fetchProducts = async () => {
    setLoading(true);
    const categoryProductResponse = await fetchCategoryWiseProduct(category);

    // console.log("Category Product Response Data", categoryProductResponse.data);
    setProducts(categoryProductResponse?.data);
    setLoading(false);
  };

  const handleScrollRight = () => {
    scrollElement.current.scrollLeft += 1000;
  };
  const handleScrollLeft = () => {
    scrollElement.current.scrollLeft -= 1000;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //   console.log("Products", products);
  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-9 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          onClick={handleScrollLeft}
          className="bg-white shadow-md rounded-full p-2 absolute left-0 text-lg hidden md:block z-10"
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={handleScrollRight}
          className="bg-white shadow-md rounded-full p-2 absolute right-0 text-lg hidden md:block z-10"
        >
          <FaAngleRight />
        </button>
        {loading
          ? loadingListArr.map((_, index) => {
              return (
                <div
                  key={index + "Category Product"}
                  className="border-black w-full min-w-[280px] md:min-w-[340px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex animate-pulse"
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                  <div className="p-4 grid gap-1 w-full">
                    <h2 className="bg-slate-200 p-1 rounded-full animate-pulse">
                      {loading && ""}
                    </h2>
                    <p className="capitalize bg-slate-200 rounded-full animate-pulse"></p>
                    <div className="flex items-center gap-3 w-full">
                      <p className="p-2 bg-slate-200 w-full rounded-full animate-pulse"></p>
                      <p className="p-2 bg-slate-200 w-full rounded-full animate-pulse"></p>
                    </div>
                    <button className="px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : products?.map((product, index) => {
              return (
                <Link
                  to={`/product/${product?._id}`}
                  key={index + "Category Product"}
                  className="w-full min-w-[280px] md:min-w-[340px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] flex items-center justify-center">
                    <img
                      src={product?.productImages[0]}
                      alt={product?.productName}
                      className="object-scale-down w-full h-full hover:scale-110 transition-all cursor-pointer mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4 grid gap-1">
                    <h2
                      className="font-medium text-base md:text-md text-ellipsis line-clamp-1 text-black"
                      title={product?.productName}
                    >
                      {product?.productName}
                    </h2>
                    <p className="capitalize">{product?.category}</p>
                    <div className="flex items-center gap-3 text-sm md:text-[16px]">
                      <p className="text-red-600 font-medium">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                      <p className="line-through text-slate-500">
                        {displayINRCurrency(product?.originalPrice)}
                      </p>
                    </div>
                    <button
                      className="mt-1 text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
