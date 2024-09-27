import React, { useContext, useEffect, useState } from "react";
import { userURL } from "../API/API_URL";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
function OrderList() {
  const navigate = useNavigate();
  const { orders, users } = useContext(UserContext);

  const [orderList, setOrderList] = useState(orders);

  useEffect(() => {
    if (orders) {
      setOrderList(orders);
    }
  }, [users]);

  const handleStatusSelector = (e) => {
    const { value } = e.target;
    if (value === "allorder") {
      setOrderList(orders);
    } else if (value === "delivered") {
      const deliveredOrders = orders.filter((value) => !value.status);
      setOrderList(deliveredOrders);
    } else if (value === "pending") {
      const pendingOrders = orders.filter((value) => value.status);
      setOrderList(pendingOrders);
    }
  };
  return (
    <div className="min-h-screen p-6 ms-64">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order List</h1>
      </div>
      <div className="mb-4">
        <select
          className="px-4 py-2 border border-gray-300 rounded-md"
          onChange={handleStatusSelector}
        >
          <option value="allorder">All Orders</option>
          <option value="delivered">Delivered</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold">Purchases</h1>
        </div>
        <hr />
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-3 px-4">Customer Name</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Payment Method</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr
                key={order.orderId}
                onClick={() => navigate(`/admin/order/${order.orderId}`)}
                className="cursor-pointer hover:bg-gray-100 transition duration-200"
              >
                <td className="border-b border-gray-200 py-3 px-4">
                  {`${order.firstName} ${order.lastName}`}
                </td>
                <td className="border-b border-gray-200 py-3 px-4">
                  {order.orderId.slice(0, 5)}
                </td>
                <td className="border-b border-gray-200 py-3 px-4">
                  {order.date}
                </td>
                <td className="border-b border-gray-200 py-3 px-4">
                  {order.paymentMethod}
                </td>
                <td className="border-b border-gray-200 py-3 px-4">
                  {order.status ? "Pending" : "Delivered"}
                </td>
                <td className="border-b border-gray-200 py-3 px-4">
                  ${order.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;
