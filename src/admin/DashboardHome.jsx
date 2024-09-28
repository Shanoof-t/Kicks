import { faBagShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserProvider";
import ReactApexChart from "react-apexcharts";
import { ProductContext } from "../context/ProductProvider";
import album from "../assets/icons/albums.svg";

function DashboardHome() {
  const { orders, users } = useContext(UserContext);
  const { allitems } = useContext(ProductContext);
  const [orderList, setOrderList] = useState(orders);

  const initialOrderData = {
    totalOrders: 0,
  };
  const [orderDetails, setOrderDetails] = useState(initialOrderData);

  const initialChartData = {
    series: [
      {
        name: "Sale Graph",
        data: [],
      },
    ],
    options: {
      chart: {
        id: "realtime",
        type: "line",
        height: 350,
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000,
          },
        },
        zoom: {
          enabled: false,
        },
      },
      xaxis: {
        type: "datetime",
        categories: [],
      },
      yaxis: {
        title: {
          text: "Sales Amount",
        },
      },
    },
  };
  const [chartData, setChartData] = useState(initialChartData);

  const updateChartData = () => {
    const salesByDate = orders.reduce((acc, order) => {
      const date = new Date(order.date).getTime();
      acc[date] = (acc[date] || 0) + order.amount;
      return acc;
    }, {});
    const categories = Object.keys(salesByDate);
    const data = Object.values(salesByDate);
    setChartData((prevData) => ({
      ...prevData,
      series: [
        {
          name: "Sales Amount",
          data,
        },
      ],
      options: {
        ...prevData.options,
        xaxis: {
          categories: categories.map(Number),
        },
      },
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateChartData();
    }, 1000);
    return () => clearInterval(interval);
  }, [orders]);

  useEffect(() => {
    if (orders) {
      setOrderList(orders);
    }
    setOrderDetails({ totalOrders: orders.length });
  }, [orders, users]);

  return (
    <div className="px-6 py-8 lg:px-16 lg:py-12 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-10 text-gray-900">Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:shadow-xl transition duration-300">
          <div>
            <h1 className="text-lg font-semibold text-gray-600">Total Orders</h1>
            <div className="flex items-center gap-4 mt-2">
              <FontAwesomeIcon icon={faBagShopping} className="text-4xl text-blue-500" />
              <h2 className="text-3xl font-bold text-gray-800">{orderDetails.totalOrders}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:shadow-xl transition duration-300">
          <div>
            <h1 className="text-lg font-semibold text-gray-600">Total Customers</h1>
            <div className="flex items-center gap-4 mt-2">
              <FontAwesomeIcon icon={faUser} className="text-4xl text-green-500" />
              <h2 className="text-3xl font-bold text-gray-800">{users.length}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:shadow-xl transition duration-300">
          <div>
            <h1 className="text-lg font-semibold text-gray-600">Total Products</h1>
            <div className="flex items-center gap-4 mt-2">
              <img src={album} alt="Products Icon" className="w-10 h-10" />
              <h2 className="text-3xl font-bold text-gray-800">{allitems.length}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Graph */}
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 mb-10">
        <h1 className="text-xl font-semibold mb-4 text-gray-800">Sales Graph</h1>
        <ReactApexChart options={chartData.options} series={chartData.series} type="line" height="300" />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Recent Orders</h1>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="py-4 px-6">Customer Name</th>
              <th className="py-4 px-6">Order ID</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Payment Method</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Amount</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {orderList.map((order) => (
              <tr key={order.orderId} className="hover:bg-gray-50 transition duration-200">
                <td className="border-b border-gray-200 py-4 px-6">{`${order.firstName} ${order.lastName}`}</td>
                <td className="border-b border-gray-200 py-4 px-6">{order.orderId.slice(0, 5)}</td>
                <td className="border-b border-gray-200 py-4 px-6">{order.date}</td>
                <td className="border-b border-gray-200 py-4 px-6">{order.paymentMethod}</td>
                <td className="border-b border-gray-200 py-4 px-6">
                  <span
                    className={`px-2 py-1 rounded-lg text-sm font-medium ${
                      order.status ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status ? "Pending" : "Delivered"}
                  </span>
                </td>
                <td className="border-b border-gray-200 py-4 px-6">${order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardHome;
