import { faBagShopping, faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Order() {
  return (
    <div className="ms-64 p-8 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Order Details</h1>
      </div>
      
      <div className="bg-white p-6 shadow-md rounded-lg">
        <div className="grid grid-cols-2 gap-5 mb-6">
          <div>
            <h2 className="font-semibold text-gray-700">Order ID:</h2>
          </div>
          <div className="bg-secondaryColor text-white p-2 rounded-md text-center">
            <span className="font-medium">Pending</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 mb-6">
          <FontAwesomeIcon icon={faCalendar} className="text-gray-500" />
          <span className="text-gray-700">Date</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 p-4 shadow rounded-md">
            <div className="flex items-center space-x-2 mb-4">
              <FontAwesomeIcon icon={faUser} className="text-primaryColor" />
              <h2 className="font-bold text-gray-700">Customer</h2>
            </div>
            <div>
              <p><strong>Full Name:</strong> John Doe</p>
              <p><strong>Email:</strong> johndoe@example.com</p>
              <p><strong>Phone:</strong> (555) 555-5555</p>
            </div>
            <button className="mt-4 bg-thirdColor text-white py-2 px-4 rounded-md shadow">
              View Profile
            </button>
          </div>

          <div className="bg-gray-50 p-4 shadow rounded-md">
            <div className="flex items-center space-x-2 mb-4">
              <FontAwesomeIcon icon={faBagShopping} className="text-primaryColor" />
              <h2 className="font-bold text-gray-700">Order Info</h2>
            </div>
            <div>
              <p><strong>Payment Method:</strong> Credit Card</p>
              <p><strong>Status:</strong> Processing</p>
            </div>
            <button className="mt-4 bg-thirdColor text-white py-2 px-4 rounded-md shadow">
              View Order
            </button>
          </div>

          <div className="bg-gray-50 p-4 shadow rounded-md">
            <div className="flex items-center space-x-2 mb-4">
              <FontAwesomeIcon icon={faBagShopping} className="text-primaryColor" />
              <h2 className="font-bold text-gray-700">Deliver to</h2>
            </div>
            <div>
              <p><strong>Address:</strong> 1234 Main St, City, Country</p>
            </div>
            <button className="mt-4 bg-thirdColor text-white py-2 px-4 rounded-md shadow">
              View Address
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Products</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-gray-200 text-left">
              <th className="py-3 px-4 font-semibold text-gray-600">Product Name</th>
              <th className="py-3 px-4 font-semibold text-gray-600">Order ID</th>
              <th className="py-3 px-4 font-semibold text-gray-600">Quantity</th>
              <th className="py-3 px-4 font-semibold text-gray-600">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-3 px-4">Product A</td>
              <td className="py-3 px-4">12345</td>
              <td className="py-3 px-4">2</td>
              <td className="py-3 px-4">$100</td>
            </tr>
            <tr className="border-t">
              <td className="py-3 px-4">Product B</td>
              <td className="py-3 px-4">12346</td>
              <td className="py-3 px-4">1</td>
              <td className="py-3 px-4">$50</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Order;
