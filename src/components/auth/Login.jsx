import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(null);
  const initailValues = {
    email: "",
    password: "",
  };
  const [LoginValues, setLoginValues] = useState(initailValues);
  const [loginError, setLoginError] = useState({});
  const [isSubmit, serIsSubmit] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginValues({ ...LoginValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = await validate(LoginValues);
    setLoginError(errors);
    serIsSubmit(true);
  };
  const validate = async (values) => {
    const error = {};
    if (!values.email) {
      error.email = "Please enter your email";
    }
    if (!values.password) {
      error.password = "Please enter your password";
    }
    if (Object.keys(error).length === 0) {
      try {
        const response = await axios.get("http://localhost:4000/user");
        const users = response.data;
        console.log(users);

        const matchedUser = users.find((obj) => values.email === obj.email);
        console.log(matchedUser);

        if (!matchedUser) {
          error.email = "Your email is incorrect";
        } else if (values.password !== matchedUser.password) {
          error.password = "Your password is incorrect";
        } else if (matchedUser.isAdmin) {
          localStorage.setItem("adminId", matchedUser.id);
          localStorage.setItem("isAdmin", matchedUser.isAdmin);
          navigate("/admin");
        } else {
          setIsAllowed(matchedUser.isAllowed);
          localStorage.setItem("userId", matchedUser.id);
          localStorage.setItem("firstName", matchedUser.firstName);
          localStorage.setItem("lastName", matchedUser.lastName);
          localStorage.setItem("email", matchedUser.email);
          localStorage.setItem("isAllowed", matchedUser.isAllowed);
        }
      } catch (error) {
        console.log(error);
      }
    }
    return error;
  };
  useEffect(() => {
    if (Object.keys(loginError).length === 0 && isSubmit) {
      if (isAllowed) {
        navigate("/");
      } else {
        toast.error("Authentication is Rejected");
        localStorage.clear();
      }
    }
  }, [loginError]);
  return (
    <div className="flex flex-col items-center justify-center h-screen  ">
      <ToastContainer />
      <div className=" p-8 rounded-lg  w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email"
              onChange={handleChange}
              value={LoginValues.email}
              name="email"
              className="w-full px-4 py-3 bg-transparent border border-black rounded-md text-gray-800 focus:outline-none focus:ring-0"
            />
            <p>{loginError.email}</p>
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={LoginValues.password}
              name="password"
              className="w-full px-4 py-3 bg-transparent border border-black rounded-md text-gray-800 focus:outline-none focus:ring-0"
            />
            <p>{loginError.password}</p>
          </div>
          <button
            className="w-full  text-white py-3 rounded-md font-semibold bg-thirdColor hover:bg-hoverColor transition duration-300"
            type="submit"
          >
            Log In
          </button>
        </form>
        <div className="text-center mt-5">
          <p className="text-gray-700 mb-2">
            <span>Don't have an account? </span>
            <button
              onClick={() => navigate("/register")}
              className="text-thirdColor "
            >
              Create your <strong>Kicks</strong> account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
