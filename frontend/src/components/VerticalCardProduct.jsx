import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const VerticalCardProduct = ({ category, heading }) => {
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

  const calculateDiscount = (originalPrice, sellingPrice) => {
    return Math.round(((originalPrice - sellingPrice) / originalPrice) * 100);
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  //   console.log("Products", products);
  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-2 md:gap-5 overflow-x-scroll scrollbar-none transition-all"
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
                  className="border-black w-full min-w-[180px] md:min-w-[350px] max-w-[180px] md:max-w-[350px] bg-white rounded-sm shadow-lg"
                >
                  <div className="bg-slate-200 h-48 p-4 min-w-[180px] md:min-w-[145px] animate-pulse"></div>
                  <div className="p-4 grid gap-2">
                    <h2 className="bg-slate-200 p-2 w-full rounded-full animate-pulse">
                      {""}
                    </h2>
                    <p className="bg-slate-200 p-2 w-full rounded-full animate-pulse"></p>
                    <p className="bg-slate-200 p-2 w-full rounded-full animate-pulse"></p>
                    <div className="flex items-center gap-3">
                      <p className="bg-slate-200 p-2 w-full rounded-full animate-pulse"></p>
                      <p className="bg-slate-200 p-2 w-full rounded-full animate-pulse"></p>
                    </div>
                    <button className="bg-slate-200 py-3 px-2 w-full rounded-full animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : products?.map((product, index) => {
              return (
                <Link
                  to={`/product/${product?._id}`}
                  key={index + "Category Product"}
                  className="w-full min-w-[180px] md:min-w-[350px] max-w-[180px] md:max-w-[350px] bg-white rounded-sm shadow"
                >
                  <div className="bg-slate-200 h-48 p-4 min-w-[180px] md:min-w-[145px] flex items-center justify-center">
                    <img
                      src={product?.productImages[0]}
                      alt={product?.productName}
                      className="object-scale-down w-full h-full hover:scale-110 transition-all cursor-pointer mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4 grid gap-2">
                    <h2
                      className="font-medium text-base md:text-md text-ellipsis line-clamp-2 text-black"
                      title={product?.productName}
                    >
                      {product?.productName}
                    </h2>
                    <p className="capitalize">{product?.category}</p>
                    <p className="text-green-800 font-medium">
                      {calculateDiscount(
                        product?.originalPrice,
                        product?.sellingPrice
                      )}
                      % OFF
                    </p>
                    <div className="flex items-center gap-3 text-sm md:text-[18px]">
                      <p className="text-red-600 font-medium">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                      <p className="line-through text-slate-500">
                        {displayINRCurrency(product?.originalPrice)}
                      </p>
                    </div>
                    <button
                      className="text-xs md:text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full"
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

export default VerticalCardProduct;
