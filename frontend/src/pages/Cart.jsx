import React, { useContext, useEffect, useState } from "react";

import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";

import { MdDelete } from "react-icons/md";

import { loadStripe } from "@stripe/stripe-js";

import process from "../env";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const context = useContext(Context);

  const loadingCartArr = new Array(context?.cartProductCount).fill(null);

  const fetchCartProducts = async () => {
    const response = await fetch(SummaryApi.userCart.url, {
      method: SummaryApi.userCart.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataResponse = await response.json();
    // console.log("Data Response", dataResponse);

    if (dataResponse.success) {
      setCartProducts(dataResponse.data);
    }
  };

  const handleLoading = async () => {
    await fetchCartProducts();
  };
  // console.log("Cart Products", cartProducts);
  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const handleIncreaseUpdateCartProductQuantity = async (id, quantity) => {
    const response = await fetch(
      SummaryApi.updateAddToCartProductQuantity.url,
      {
        method: SummaryApi.updateAddToCartProductQuantity.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: quantity + 1,
        }),
      }
    );

    const responseData = await response.json();

    if (responseData.success) {
      fetchCartProducts();
    }
  };

  const handleDecreaseUpdateCartProductQuantity = async (id, quantity) => {
    if (quantity >= 2) {
      const response = await fetch(
        SummaryApi.updateAddToCartProductQuantity.url,
        {
          method: SummaryApi.updateAddToCartProductQuantity.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: id,
            quantity: quantity - 1,
          }),
        }
      );

      const responseData = await response.json();

      if (responseData.success) {
        fetchCartProducts();
      }
    }
  };

  const handleDeleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchCartProducts();
      context.fetchAddToCartCount();
    }
  };

  const totalQuantity = cartProducts?.reduce(
    (previousValue, currentValue) => previousValue + currentValue?.quantity,
    0
  );

  const totalPrice = cartProducts?.reduce(
    (previousValue, currentValue) =>
      previousValue +
      currentValue?.quantity * currentValue?.productId?.sellingPrice,
    0
  );

  const handlePayment = async () => {
    const stripePromise = await loadStripe(
      process.env.REACT_APP_STRIPE_PUBLIC_KEY
    );
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems: cartProducts }),
    });

    const responseData = await response.json();

    // console.log("Payment Response", responseData);
    if (responseData?.id) {
      stripePromise
        .redirectToCheckout({
          sessionId: responseData.id,
        })
        .then((result) => {
          console.log("Stripe Result", result);
        });
    }

    console.log("Stripe Promise", stripePromise);
  };

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
                    <div className="px-4 py-2 relative">
                      {/* Remove Product */}
                      <div
                        className="absolute right-0 top-0 text-red-600 hover:bg-red-600 hover:text-white rounded-full m-1 p-1 text-lg cursor-pointer"
                        onClick={() => handleDeleteCartProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>
                      <h2
                        title={product?.productId?.productName}
                        className="text-md lg:text-lg text-ellipsis line-clamp-1"
                      >
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId?.category}
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-red-600 font-medium text-md">
                          {displayINRCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayINRCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          className="border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center hover:bg-red-600 hover:text-white rounded"
                          onClick={() =>
                            handleDecreaseUpdateCartProductQuantity(
                              product?._id,
                              product?.quantity
                            )
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center hover:bg-red-600 hover:text-white rounded"
                          onClick={() =>
                            handleIncreaseUpdateCartProductQuantity(
                              product?._id,
                              product?.quantity
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* Total Product Price Summary */}
        {cartProducts.length > 0 && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="min-h-36 bg-slate-200 border border-slate-300 animate-pulse">
                Total
              </div>
            ) : (
              <div className="h-36 bg-slate-200 rounded">
                <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
                <div className="flex items-center justify-between gap-4 px-4 font-medium text-lg text-slate-600">
                  <p>Quantity</p>
                  <p>{totalQuantity}</p>
                </div>
                <div className="flex items-center justify-between gap-4 px-4 font-medium text-lg text-slate-600">
                  <p>Total</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>
                <button
                  className="bg-blue-600 p-2 text-white w-full"
                  onClick={handlePayment}
                >
                  Make Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
