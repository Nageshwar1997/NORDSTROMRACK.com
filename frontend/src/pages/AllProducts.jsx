import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    const fetchData = await fetch(SummaryApi.allProducts.url);

    const responseData = await fetchData.json();


    setAllProducts(responseData?.data || []);
  };
  // console.log(allProducts);

  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold uppercase text-blue-900">
          All Products
        </h1>
        <button
          onClick={() => setOpenUploadProduct(true)}
          className="border-2 py-2 px-4 rounded-full text-md border-blue-600 hover:bg-blue-600 hover:text-white transition-all font-semibold hover"
        >
          Upload Product
        </button>
      </div>

      {/* **** All Products **** */}
      <div className="flex items-center flex-wrap gap-3 p-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProducts &&
          allProducts.map((product, index) => {
            return (
              <AdminProductCard
                key={index + "Product"}
                product={product}
                fetchAllProducts={fetchAllProducts}
              />
            );
          })}
      </div>

      {/* **** Upload Product Component **** */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchAllProducts={fetchAllProducts}
        />
      )}
    </div>
  );
};

export default AllProducts;
