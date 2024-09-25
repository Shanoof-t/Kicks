import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

function UserProfile() {
  const { userID } = useParams();
  const { users } = useContext(UserContext);
  const user = users.filter((value) => value.id === userID);

  return user.map((value) => (
    <div className="ms-64 p-6 bg-gray-100 min-h-screen" key={value.id}>
      {/* User Details Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-700">User Details</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <h1 className="font-bold text-xl text-gray-800">{`User ID: ${value.id}`}</h1>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg text-gray-600">
            <span className="font-semibold">Name:</span>{" "}
            {`${value.firstName} ${value.lastName}`}
          </h1>
          <h1 className="text-lg text-gray-600">
            <span className="font-semibold">Email:</span> {value.email}
          </h1>
        </div>
      </div>

      {/* User Cart Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Cart</h1>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Product Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Quantity</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price</th>
            </tr>
          </thead>
          <tbody>
            {value.cart.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2 text-sm text-gray-600">{item.id}</td>
                <td className="border px-4 py-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <img src={item.imageURL} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td className="border px-4 py-2 text-sm text-gray-600">{item.quantity}</td>
                <td className="border px-4 py-2 text-sm text-gray-600">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Orders Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Orders</h1>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Product Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Quantity</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price</th>
            </tr>
          </thead>
          <tbody>
            {value.order.map((item) =>
              item.product.map((product) => (
                <tr key={product.productId} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 text-sm text-gray-600">{product.productId}</td>
                  <td className="border px-4 py-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <img src={product.imageURL} alt={product.name} className="w-12 h-12 object-cover rounded" />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td className="border px-4 py-2 text-sm text-gray-600">{product.quantity}</td>
                  <td className="border px-4 py-2 text-sm text-gray-600">${product.price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  ));
}

export default UserProfile;
