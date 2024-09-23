import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
  const navigateToHome = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  };
  const [registerValues, setRegisterValues] = useState(initialValues);
  const [registerErrors, setRegisterErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setRegisterValues({ ...registerValues, [name]: value });
  };
  const handleRegistration = (e) => {
    e.preventDefault();
    setRegisterErrors(validate(registerValues));
    setIsSubmit(true);
  };

  const validate = (value) => {
    const error = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value.firstName) {
      error.firstName = "First Name is required!";
    }
    if (!value.lastName) {
      error.lastName = "Last Name is required!";
    }
    if (!value.email) {
      error.email = "Email is required!";
    } else if (!regex.test(value.email)) {
      error.email = "This is not a valid email";
    }
    if (!value.password) {
      error.password = "Password is required!";
    } else if (value.password.length < 6) {
      error.password = "Password must be more than 6 characters";
    } else if (value.password.length > 10) {
      error.password = "Password cannot exceed more than 10 chacters";
    }
    if (!value.confirmPassword) {
      error.confirmPassword = "Confirm password Name is required!";
    } else if (value.password !== value.confirmPassword) {
      error.confirmPassword =
        "The passwords you entered do not match. Please try again.";
    }
    if (!value.gender) {
      error.gender = "Select your gender";
    }
    return error;
  };
  const [gender, setGender] = useState("");
  const hanldeGender = (gen) => {
    setGender(gen);
    setRegisterValues({ ...registerValues, gender: { gen } });
  };
  const handleRegistrationNavigation = () => {
    if (Object.keys(registerErrors).length === 0 && isSubmit) {
      axios
        .post("http://localhost:4000/user", {
          firstName: registerValues.firstName,
          lastName: registerValues.lastName,
          email: registerValues.email,
          password: registerValues.password,
          cart:[],
          order:[]
        })
        .then((res) => {
          navigateToHome("/login");
        })
        .catch((err) => console.log(err.message));
    }
  };
  useEffect(() => {
    if (Object.keys(registerErrors).length === 0) {
      handleRegistrationNavigation();
    }
  }, [registerErrors]);

  return (
    <div className="flex justify-center">
      <div className="w-2/4 mt-5">
        <h1 className="text-4xl font-bold text-center">Register</h1>
        <form onSubmit={handleRegistration}>
          <div className="mb-6">
            <h2 className="text-xl font-bold my-2 mb-4">Your Name</h2>
            <div className="flex flex-col gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 bg-transparent border border-black rounded-md text-gray-800 focus:outline-none focus:ring-0"
                  value={registerValues.firstName}
                  name="firstName"
                  onChange={hanldeChange}
                />
                <p className="text-red-600 my-1 ">{registerErrors.firstName}</p>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 bg-transparent border border-black rounded-md text-gray-800 focus:outline-none focus:ring-0"
                  value={registerValues.lastName}
                  name="lastName"
                  onChange={hanldeChange}
                />
                <p className="text-red-600 my-1">{registerErrors.lastName}</p>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold my-2 mb-4">Gender</h2>
            <div className="items-center ">
              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4"
                  checked={gender === "male"}
                  onChange={() => hanldeGender("male")}
                />
                <span className="font-medium">Male</span>
              </label>
              <label className="inline-flex items-center space-x-2 ms-5">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4"
                  checked={gender === "female"}
                  onChange={() => hanldeGender("female")}
                />
                <span className="font-medium">Female</span>
              </label>
              <p className="text-red-600 my-1">{registerErrors.gender}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold my-2 mb-4">Login Details</h2>
            <div className="flex flex-col gap-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-transparent border border-black rounded-md text-gray-800 focus:outline-none focus:ring-0"
                  onChange={hanldeChange}
                  name="email"
                  value={registerValues.email}
                />
                <p className="text-red-600 my-1">{registerErrors.email}</p>
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-transparent border border-black rounded-md text-gray-800 focus:outline-none focus:ring-0"
                  onChange={hanldeChange}
                  name="password"
                  value={registerValues.password}
                />
                <p className="text-red-600 my-1">{registerErrors.password}</p>
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 bg-transparent border border-black rounded-md text-gray-800 focus:outline-none focus:ring-0"
                  onChange={hanldeChange}
                  name="confirmPassword"
                  value={registerValues.confirmPassword}
                />
                <p className="text-red-600 my-1">
                  {registerErrors.confirmPassword}
                </p>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full  text-white py-3 rounded-md font-semibold bg-thirdColor hover:bg-hoverColor transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
