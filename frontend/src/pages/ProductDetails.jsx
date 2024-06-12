import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import RatingStarGenerator from "../components/RatingStarGenerator";
import displayINRCurrency from "../helpers/displayCurrency";
import VerticalCardProduct from "../components/VerticalCardProduct";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const { fetchAddToCartCount } = useContext(Context);
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImages: [],
    description: "",
    originalPrice: "",
    sellingPrice: "",
  });
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinates, setZoomImageCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [showZoomImage, setShowZoomImage] = useState(false);

  const params = useParams();
  const productImageListLoading = new Array(4).fill(null);
  const ratings = <RatingStarGenerator />;

  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });

    setLoading(false);
    const dataResponse = await response.json();
    setProduct(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImages[0]);
  };

  const handleMouseChangeActiveImage = (image) => {
    setActiveImage(image);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setShowZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const coordinates = {
        x: ((e.clientX - left) / width) * 100,
        y: ((e.clientY - top) / height) * 100,
      };

      setZoomImageCoordinates(coordinates);
      // console.log("Coordinates", left, top, width, height);
    },
    [zoomImageCoordinates]
  );
  const handleCloseZoomImage = () => {
    setShowZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchAddToCartCount();
  };
  const handleBuyNow = async (e, id) => {
    await addToCart(e, id);
    fetchAddToCartCount();
    navigate("/cart");
  };

  // console.log("Product Details", product);
  useEffect(() => {
    fetchProduct();
  }, [params]);
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col gap-0 lg:flex-row lg:gap-4">
        {/* Product Image */}
        <div className="h-65 md:h-96 flex flex-col gap-4 lg:flex-row-reverse">
          {loading ? (
            <div className="h-[300px] w-[300px] lg:w-96 lg:h-96 bg-slate-200 animate-pulse rounded-md"></div>
          ) : (
            <div className="h-[300px] w-[300px] lg:w-96 lg:h-96 bg-slate-200 rounded-md relative">
              <img
                src={activeImage}
                alt={product?.productName}
                className="w-full h-full object-scale-down mix-blend-multiply cursor-crosshair rounded-md"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleCloseZoomImage}
              />

              {/* Zoom Image */}
              {showZoomImage && (
                <div className="hidden lg:block absolute min-w-[420px] min-h-[420px] top-0 -right-[435px] bg-slate-200 p-1 overflow-hidden">
                  <div
                    className="w-full h-full min-h-[400px] min-w-[400px] mix-blend-multiply rounded scale-150 overflow-hidden"
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: `${zoomImageCoordinates.x}% ${zoomImageCoordinates.y}%`,
                    }}
                  ></div>
                </div>
              )}
            </div>
          )}
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={index + "loadingImage"}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {product?.productImages?.map((image, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                      key={index + image}
                    >
                      <img
                        src={image}
                        alt="ProductImage"
                        onMouseEnter={() => handleMouseChangeActiveImage(image)}
                        onClick={() => handleMouseChangeActiveImage(image)}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* Product Details */}
        {loading ? (
          <div className="flex flex-col gap-2 w-full lg:w-[40%] mt-[-80px] lg:mt-0">
            <p className="bg-slate-200 animate-pulse h-8 w-1/4 rounded-full"></p>
            <h2 className="w-full bg-slate-200 animate-pulse h-8 rounded-full">
              {""}
            </h2>
            <p className="bg-slate-200 animate-pulse h-8 w-full rounded-full"></p>
            <p className="bg-slate-200 animate-pulse h-8 w-full rounded-full"></p>
            <div className="h-8 w-full flex gap-2 lg:gap-3 my-1">
              <p className="bg-slate-200 animate-pulse w-full rounded-full"></p>
              <p className="bg-slate-200 animate-pulse w-full rounded-full"></p>
            </div>
            <div className="flex gap-2 items-center">
              <button className="bg-slate-200 animate-pulse h-8 w-full rounded-full px-3 py-1 my-2 min-w-[120px]"></button>
              <button className="bg-slate-200 animate-pulse h-8 w-full rounded-full px-3 py-1 my-2 min-w-[120px]"></button>
            </div>
            <div className="h-28 bg-slate-200 animate-pulse rounded-lg"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full mt-10 lg:mt-0">
            <p className="bg-red-200 text-red-700 font-bold p-1 px-3 rounded-full w-fit">
              {product?.brandName}
            </p>
            <h2 className="text-xl lg:text-2xl font-medium">
              {product?.productName}
            </h2>
            <p className="capitalize text-slate-500">{product?.category}</p>
            <>{ratings}</>
            <div className="flex gap-2 lg:gap-3 text-xl lg:text-2xl font-medium my-1">
              <p className="text-red-600">
                {displayINRCurrency(product?.sellingPrice)}
              </p>
              <p className="text-gray-500 line-through">
                {displayINRCurrency(product?.originalPrice)}
              </p>
            </div>
            <div className="flex gap-2 items-center">
                <button className="border-2 border-red-600 rounded px-3 py-1 my-2 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
                onClick={(e) => handleBuyNow(e, product?._id)}
                >
                Buy Now
              </button>
              <button
                className="border-2 border-red-600 rounded px-3 py-1 my-2 min-w-[120px] hover:text-red-600 hover:bg-slate-100 font-medium bg-red-600 text-white"
                onClick={(e) => handleAddToCart(e, product?._id)}
              >
                Add To Cart
              </button>
            </div>
            <div className="w-full max-w-screen-md">
              <p>Description : </p>
              <p>{product?.description}</p>
            </div>
          </div>
        )}
      </div>
      {product?.category && (
        <CategoryWiseProductDisplay
          category={product?.category}
          heading={"Similar Products"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
