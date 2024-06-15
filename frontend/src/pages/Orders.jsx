import React, { useEffect, useState } from "react";
import moment from "moment";
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrders.url, {
      method: SummaryApi.getOrders.method,
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
    <div>
      {orders.length === 0 && <p>No Orders Found</p>}
      {orders.length > 0 &&
        orders.map((order, index) => {
          return (
            <div key={order._id + Math.random() + index}>
              <p className="font-medium text-lg">
                {moment(order.createdAt).format("LLLL")}
              </p>
              <div>
                {order?.productDetails.map((product, index) => {
                  return (
                    <div key={index + Math.random()}>
                      <img
                        src={product?.images[0]}
                        alt={product?.name}
                        className="w-28 h-28 bg-slate-200 object-scale-down p-2 mix-blend-multiply"
                      />
                      <div>{product?.name}</div>
                      <div>{displayINRCurrency(product?.price)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Orders;
