import React, { useEffect, useState } from "react";
import moment from "moment";
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";
const AdminAllOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.allOrders.url, {
      method: SummaryApi.allOrders.method,
      credentials: "include",
    });

    const responseData = await response.json();

    setOrders(responseData.data);
    console.log("Order List", responseData.data);
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);
  return (
    <div className="p-4 w-full h-[calc(100vh-190px)] overflow-y-scroll">
      {orders.length === 0 && <p>No Orders Available</p>}
      <div>
        {orders.length > 0 &&
          orders.map((order, index) => {
            return (
              <div key={order._id + Math.random() + index}>
                <p className="font-medium text-lg">
                  {moment(order.createdAt).format("LLLL")}
                </p>
                <div className="border-2 border-slate-300 rounded p-2">
                  <div className="flex flex-col lg:flex-row justify-between gap-2">
                    <div className="grid gap-1">
                      {order?.productDetails.map((product, index) => {
                        return (
                          <div
                            key={index + product.productId}
                            className="flex gap-3 rounded-lg p-2 bg-slate-200"
                          >
                            <img
                              src={product?.images[0]}
                              alt={product?.name}
                              className="w-28 h-28 object-scale-down p-2 rounded-lg mix-blend-multiply"
                            />
                            <div>
                              <div className="font-medium text-lg text-ellipsis line-clamp-1">
                                {product?.name}
                              </div>
                              <div className="flex items-center gap-5 mt-1">
                                <div className="font-semibold text-lg text-red-600">
                                  {displayINRCurrency(product?.price)}
                                </div>
                                <p>Quantity : {product?.quantity}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-col gap-4 p-2 min-w-[300px]">
                      <div>
                        <div className="font-medium text-lg">
                          Payment Details
                        </div>
                        <p className="ml-1">
                          Payment Method :{" "}
                          {order?.paymentDetails.payment_method_type[0]}
                        </p>
                        <p className="ml-1">
                          Payment Status :{" "}
                          {order?.paymentDetails.payment_status}
                        </p>
                      </div>
                      <div>
                        <div className="font-medium text-lg">
                          Shipping Details
                        </div>
                        {order.shipping_options.map((option, index) => (
                          <div
                            key={option.shipping_rate + index}
                            className="ml-1"
                          >
                            Shipping Charge :{" "}
                            {displayINRCurrency(option.shipping_amount)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className=" w-full font-semibold lg:text-lg flex flex-col lg:flex-row lg:justify-between">
                    <p>{order.email}</p>
                    <p>
                      Total Amount : {displayINRCurrency(order.totalAmount)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AdminAllOrders;
