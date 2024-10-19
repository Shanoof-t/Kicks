import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Field, Form, Formik } from "formik";
import { checkoutValidationSchema } from "./checkoutValidationSchema";
import { addOrder, fetchUser } from "../../features/checkout/checkoutAPI";
import { setCartItems } from "../../features/cart/cartSlice";
import {
  setContactDetails,
  setDate,
  setOrderId,
  setProducts,
  setTotalPrice,
  setUser,
} from "../../features/checkout/checkoutSlice";
import { v4 as uuidv4 } from "uuid";
function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.checkout.fetchUserData);
  const cartItem = useSelector((state) => state.cart.cartItems);
  // const totalPrice = useSelector((state) => state.checkout.totalPrice);
  const contactDetails = useSelector((state) => state.checkout.contactDetails);
  // console.log("main data ==", contactDetails);

  const user = contactDetails.userId;
  // const [paymentMethod, setPaymentMethod] = useState("");
  const moment = require("moment");
  const currentDate = moment().format("YYYY-MM-DD");
  // const [contactDetailsErrors, setContactDetailsErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(setUser(userId));
    dispatch(fetchUser(userId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setTotalPrice(cartItem));
    const products = cartItem.map((el) => {
      return {
        name: el.name,
        productId: el.id,
        size: el.size,
        quantity: el.quantity,
        imageURL: el.imageURL,
        price: el.price,
      };
    });
    dispatch(setProducts(products));
  }, [cartItem, dispatch]);

  // const handleChange = (e) => {
  // const { name, value } = e.target;
  // dispatch(setContactDetails({ name, value }));
  // setContactDetails({
  //   ...contactDetails,
  //   [name]: value,
  //   amount: totalPrice,
  //   userId: user,
  // });
  // };

  const handlePlaceOrder = (values) => {
    values.userId = user;
    values.orderId = uuidv4();
    values.date = currentDate;
    values.amount = contactDetails.amount;
    values.product = contactDetails.product;

    if (!user) {
      navigate("/login");
    } else {
      // dispatch(setDate(currentDate));
      // dispatch(setOrderId(uuidv4()));
      // dispatch(dispatch(fetchUser(user)))
      //   .then(() => {
      const userDetails = userData.userData;
      // if (!userData.loading) {
      // console.log(userDetails);

      dispatch(addOrder({ user, values, userDetails }))
        .then(() => {
          toast.success("Your Order is Placed", {
            className: "mt-12",
            onClose: () => {
              navigate("/");
              dispatch(setCartItems([]));
            },
          });
        })
        .catch((err) => {
          toast.error(err.message, { className: "mt-12" });
        });
      // }
      // })
      // .catch((err) => {
      //   toast.error(err.message, { className: "mt-12" });
      // });
    }
  };

  // const validate = (value) => {
  //   const error = {};
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   const phoneRegex = /^[0-9]{10}$/;
  //   if (!value.email) {
  //     error.email = "Email is required!";
  //   } else if (!emailRegex.test(value.email)) {
  //     error.email = "Invalid email format!";
  //   }
  //   if (!value.firstName) {
  //     error.firstName = "First Name is required!";
  //   }
  //   if (!value.lastName) {
  //     error.lastName = "Last Name is required!";
  //   }
  //   if (!value.address) {
  //     error.address = "Address is required!";
  //   }
  //   if (!value.phone) {
  //     error.phone = "Phone Number is required!";
  //   } else if (!phoneRegex.test(value.phone)) {
  //     error.phone = "Invalid phone format!";
  //   }
  //   if (!value.paymentMethod) {
  //     error.paymentMethod = "Choose any payment method";
  //   }
  //   return error;
  // };

  // const handlePaymentMethod = (payment) => {
  //   setPaymentMethod(payment);
  //   setContactDetails((prev) => {
  //     return { ...prev, paymentMethod: payment };
  //   });
  // };

  // useEffect(() => {
  // const products = cartItem.map((el) => {
  //   return {
  //     name: el.name,
  //     productId: el.id,
  //     size: el.size,
  //     quantity: el.quantity,
  //     imageURL: el.imageURL,
  //     price: el.price,
  //   };
  // });
  // setContactDetails((p) => {
  //   return { ...p, product: products };
  // });
  // }, [cartItem]);

  // const addOrderTojson = () => {
  //   if (Object.keys(contactDetailsErrors).length === 0 && isSubmit && user) {
  //     const userDetails = userData.userData;
  //     dispatch(fetchUser(user))
  //       .then(() => {
  //         dispatch(addOrder({ user, contactDetails, userDetails }))
  //           .then(() => {
  //             toast.success("Your Order is Placed", {
  //               className: "mt-12",
  //               onClose: () => {
  //                 navigate("/");
  //                 dispatch(setCartItems([]));
  //               },
  //             });
  //           })
  //           .catch((err) => {
  //             toast.error(err.message, { className: "mt-12" });
  //           });
  //       })
  //       .catch((err) => {
  //         toast.error(err.message, { className: "mt-12" });
  //       });
  //   } else
  // };
  // const handleToastClose = () => {
  //   navigate("/");
  //   dispatch(setCartItems([]));
  // };
  // useEffect(() => {
  //   if (Object.keys(contactDetailsErrors).length === 0 && isSubmit) {
  //     addOrderTojson();
  //   }
  // }, [isSubmit]);

  return (
    <div className="min-h-screen py-10 px-6">
      <ToastContainer />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
        {/* Left: Contact Form */}
        <div className="lg:col-span-1 w-full">
          <Formik
            initialValues={contactDetails}
            validationSchema={checkoutValidationSchema}
            onSubmit={handlePlaceOrder}
          >
            {({ errors, touched, handleChange, setFieldValue, values }) => (
              <Form className="space-y-8">
                {/* Contact Details Section */}
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold">Contact Details</h1>
                  {/* <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                    name="email"
                    value={contactDetails.email}
                    onChange={handleChange}
                  /> */}
                  <Field
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                    name="email"
                  ></Field>
                  {errors.email && touched.email && (
                    <p className="text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <h1 className="text-2xl font-bold">Shipping Address</h1>
                  {/* <input
                    type="text"
                    placeholder="First Name*"
                    className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                    name="firstName"
                    value={contactDetails.firstName}
                    onChange={handleChange}
                  />
                  <p className="text-red-600">
                    {contactDetailsErrors.firstName}
                  </p> */}
                  <Field
                    type="text"
                    placeholder="First Name*"
                    className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                    name="firstName"
                  ></Field>
                  {errors.firstName && touched.firstName && (
                    <p className="text-red-600">{errors.firstName}</p>
                  )}

                  {/* <input
                    type="text"
                    placeholder="Last Name*"
                    className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                    name="lastName"
                    value={contactDetails.lastName}
                    onChange={handleChange}
                  />
                  <p className="text-red-600">
                    {contactDetailsErrors.lastName}
                  </p> */}
                  <Field
                    type="text"
                    placeholder="Last Name*"
                    className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                    name="lastName"
                  ></Field>
                  {errors.lastName && touched.lastName && (
                    <p className="text-red-600">{errors.lastName}</p>
                  )}
                  {/* <input
                    type="text"
                    placeholder="Delivery Address*"
                    className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                    name="address"
                    value={contactDetails.address}
                    onChange={handleChange}
                  />
                  <p className="text-red-600">{contactDetailsErrors.address}</p> */}
                  <Field
                    type="text"
                    placeholder="Delivery Address*"
                    className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                    name="address"
                  ></Field>
                  {errors.address && touched.address && (
                    <p className="text-red-600">{errors.address}</p>
                  )}
                  {/* <input
                    type="number"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                    name="phone"
                    value={contactDetails.phone}
                    onChange={handleChange}
                  />
                  <p className="text-red-600">{contactDetailsErrors.phone}</p> */}
                  <Field
                    type="number"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                    name="phone"
                  ></Field>
                  {errors.phone && touched.phone && (
                    <p className="text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <h1 className="text-2xl font-bold">Payment Methods</h1>
                  <div className="flex space-x-6">
                    <label className="inline-flex items-center space-x-2">
                      {/* <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4"
                        checked={paymentMethod === "cash"}
                        onChange={() => handlePaymentMethod("cash")}
                      /> */}
                      <Field
                        type="checkbox"
                        className="form-checkbox h-4 w-4"
                        checked={values.paymentMethod === "cash"}
                        onChange={() => setFieldValue("paymentMethod", "cash")}
                      ></Field>

                      <span>Cash</span>
                    </label>

                    <label className="inline-flex items-center space-x-2">
                      {/* <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4"
                        checked={paymentMethod === "UPI"}
                        onChange={() => handlePaymentMethod("UPI")}
                      /> */}
                      <Field
                        type="checkbox"
                        className="form-checkbox h-4 w-4"
                        checked={values.paymentMethod === "UPI"}
                        onChange={() => setFieldValue("paymentMethod", "UPI")}
                      ></Field>
                      <span>UPI</span>
                    </label>
                  </div>
                  {/* <p className="text-red-600">
                    {contactDetailsErrors.paymentMethod}
                  </p> */}
                  {errors.paymentMethod && touched.paymentMethod && (
                    <p className="text-red-600">{errors.paymentMethod}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  className="w-full mt-6 px-6 py-3 bg-thirdColor text-white text-lg font-semibold rounded-lg hover:bg-hoverColor transition duration-300"
                  type="submit"
                >
                  Place Order ${contactDetails.amount}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1 w-full space-y-6">
          {/* Order Summary Section */}
          <div className="p-6 rounded-lg border border-gray-300">
            <h1 className="text-2xl font-semibold mb-4">Order Summary</h1>
            <div className="flex justify-between text-lg mb-4">
              <span>{cartItem.length} ITEMS</span>
              <span>${contactDetails.amount}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-xl font-semibold">
              <h2>Total</h2>
              <h2>${contactDetails.amount}</h2>
            </div>
          </div>

          {/* Order Details Section */}
          <div className="p-6 rounded-lg border border-gray-300 space-y-4">
            <h1 className="text-2xl font-semibold mb-2">Your Order</h1>
            <div className="space-y-2">
              {cartItem.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="text-lg">{item.name}</div>
                  <div className="text-lg font-medium">
                    {item.quantity} x ${item.price}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${contactDetails.amount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
