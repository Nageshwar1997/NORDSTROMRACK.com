import React, { useContext, useEffect, useState } from "react";

import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const context = useContext(Context);

  const loadingCartArr = new Array(context?.cartProductCount).fill(null);

  const fetchCartProducts = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.userCart.url, {
      method: SummaryApi.userCart.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);

    const dataResponse = await response.json();
    // console.log("Data Response", dataResponse);

    if (dataResponse.success) {
      setCartProducts(dataResponse.data);
    }
  };

  // console.log("Cart Products", cartProducts);
  useEffect(() => {
    fetchCartProducts();
  }, []);

  const handleIncreaseUpdateCartProductQuantity = async (id,quantity) => {
    const response = await fetch(
      SummaryApi.updateAddToCartProductQuantity.url,
      {
        method: SummaryApi.updateAddToCartProductQuantity.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: quantity + 1,
        }),
      }
    );

    const responseData = await response.json();

    if(responseData.success){
      fetchCartProducts();
    }
  }
  return (
    <div className="container mx-auto max-w-[96%] m-4">
      <div className="text-center text-lg">
        {cartProducts.length === 0 && !loading && (
          <p className="bg-white py-5">Cart is Empty</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-2">
        {/* Cart Products */}
        <div className="w-full max-w-3xl grid gap-2">
          {loading
            ? loadingCartArr.map((_, index) => (
                <div
                  key={index + "cartProductLoading"}
                  className="w-full bg-slate-200 h-32 border border-slate-300 animate-pulse rounded-md"
                ></div>
              ))
            : cartProducts.map((product) => {
                return (
                  <div
                    key={product?._id + "cartProduct"}
                    className="w-full bg-white h-32 border border-slate-300 rounded-md grid grid-cols-[128px,1fr]"
                  >
                    <div className="h-32 w-32 bg-slate-200 p-2">
                      <img
                        src={product?.productId?.productImages[0]}
                        alt={product?.productId?.productName}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2">
                      <h2
                        title={product?.productId?.productName}
                        className="text-md lg:text-lg text-ellipsis line-clamp-1"
                      >
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId?.category}
                      </p>
                      <p className="text-red-600 font-medium text-md">
                        {displayINRCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button className="border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center hover:bg-red-600 hover:text-white rounded">
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button className="border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center hover:bg-red-600 hover:text-white rounded"onClick={()=>handleIncreaseUpdateCartProductQuantity(product?._id, product?.quantity)}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* Total Product Price Summary */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="min-h-36 bg-slate-200 border border-slate-300 animate-pulse">
              Total
            </div>
          ) : (
            <div className="h-36 bg-slate-200">Total</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
