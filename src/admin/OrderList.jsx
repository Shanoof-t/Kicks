import React, { useEffect, useState } from "react";
import { userURL } from "../API/API_URL";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OrderList() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${userURL}`).then((res) => {
      const allOrders = res.data
        .filter((value) => !value.isAdmin && value.order)
        .flatMap((value) => value.order);

      setOrders(allOrders);
    });
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100 ms-64">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order List</h1>
      </div>
      <div className="mb-4">
        <select className="px-4 py-2 border border-gray-300 rounded-md">
          <option value="allorder">All Orders</option>
          <option value="delivered">Delivered</option>
          <option value="pending">Pending</option>
          {/* <option value="canceled">Canceled</option> */}
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
            {orders.map((order) => (
              <tr
                key={order.orderId}
                onClick={() => navigate("/admin/order")}
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
                  {order.status}
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
