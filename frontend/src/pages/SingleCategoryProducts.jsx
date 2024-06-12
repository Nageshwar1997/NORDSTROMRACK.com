import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import SearchProductCard from "../components/SearchProductCard";
import SummaryApi from "../common";

const SingleCategoryProducts = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListInArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListInArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");

  console.log("sortBy", sortBy);

  const fetchData = async () => {
    setLoading(true);

    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });

    const dataResponse = await response.json();
    setData(dataResponse.data || []);
    setLoading(false);

    console.log("Data Response :", dataResponse);
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    if (filterCategoryList.length > 0) {
      fetchData();
    }
  }, [filterCategoryList]);

  useEffect(() => {
    const categoryArray = Object.keys(selectCategory).filter(
      (categoryKeyName) => selectCategory[categoryKeyName]
    );

    setFilterCategoryList(categoryArray);

    // Format for url change when change on the checkbox
    const urlFormat = categoryArray.map((el, index) => {
      if (categoryArray.length - 1 === index) {
        return `category=${el}`;
      }

      return `category=${el}&&`;
    });
    // console.log("urlFormat", urlFormat.join(""));
    navigate(`/product-category?${urlFormat.join("")}`);
  }, [selectCategory]);


  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    if (value === "asc" || value === "desc") {
      setSortBy(value);

      setData((prev) => {
        return [...prev].sort((a, b) => {
          if (value === "asc") {
            return a.sellingPrice - b.sellingPrice;
          } else {
            return b.sellingPrice - a.sellingPrice;
          }
        });
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Desktop View */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* Left Side Sidebar */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/* Sort by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort by
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  id="lowToHigh"
                  value={"asc"}
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  id="highToLow"
                  value={"desc"}
                  checked={sortBy === "desc"}
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => (
                <div
                  className="flex items-center gap-3"
                  key={index + "category"}
                >
                  <input
                    type="checkbox"
                    name="category"
                    value={categoryName?.value}
                    id={categoryName?.value}
                    checked={selectCategory[categoryName?.value] || false}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName?.value}>
                    {categoryName?.label}
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Right Side Main */}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg mb-2">
            Showing {data.length} results
          </p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {data.length !== 0 && (
              <SearchProductCard loading={loading} products={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCategoryProducts;
