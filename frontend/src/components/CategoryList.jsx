import React, { useEffect, useState } from "react";

import SummaryApi from "../common";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CategoryList = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const categoryLoadingArray = new Array(12).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.categoryProducts.url);

      const responseData = await response.json();
      setCategoryProducts(responseData.data);
      setLoading(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  if (error) {
    toast.error("Something went wrong. Please try again");
    return;
  }

  //   console.log("categoryProducts", categoryProducts);
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading
          ? categoryLoadingArray.map((el, i) => {
              return (
                <div
                  key={i + el + "categoryLoadingArray"}
                  className="h-16 w-16 md:w-20 md:h-20 p-4 rounded-full overflow-hidden bg-slate-200 animate-pulse flex items-center justify-center"
                ></div>
              );
            })
          : categoryProducts?.map((product) => {
              return (
                <Link
                  to={`/product-category?category=${product?.category}`}
                  key={product._id + Math.random()}
                  className="p-2 cursor-pointer"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                    <img
                      src={product?.productImages[0]}
                      alt={product?.category}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  </div>
                  <p className="text-center capitalize text-sm md:text-base">
                    {product?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
