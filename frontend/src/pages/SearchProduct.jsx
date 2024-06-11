import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import SearchProductCard from "../components/SearchProductCard";

const SearchProduct = () => {
  const query = useLocation();
  const [searchProducts, setSearchProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  //   console.log("Query :", query);

  const fetchSearchProduct = async () => {
    setLoading(true);
    const response = await fetch(
      `${SummaryApi.searchProduct.url + query.search}`,
      {
        method: SummaryApi.searchProduct.method,
      }
    );

    setLoading(false);

    const responseData = await response.json();

    setSearchProducts(responseData.data);

    // console.log("Response Search Data :", responseData);
  };

  useEffect(() => {
    fetchSearchProduct();
  }, [query]);

  console.log("Search Products :", searchProducts);
  return (
    <div className="container mx-auto p-3">
      {searchProducts.length === 0 && !loading && (
        <h1 className="text-4xl text-center bg-white w-full p-4 font-bold">
          No Products Found...
        </h1>
      )}
      {!loading && searchProducts.length > 0 && (
        <>
          <h1 className="text-xl text-left  w-full p-1 font-semibold">
            Search results for : {query.search.split("=")[1]}
          </h1>
          <h1 className="text-xl text-left  w-full p-1 mb-1 font-semibold">
            Result found : {searchProducts.length}
          </h1>
        </>
      )}
      {searchProducts.length > 0 && !loading && (
        <SearchProductCard loading={loading} products={searchProducts} />
      )}
      <SearchProductCard loading={loading} products={searchProducts} />
    </div>
  );
};

export default SearchProduct;
