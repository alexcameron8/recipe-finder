import { useState, useMemo } from "react";
import axios from "axios";
import { useCurrentUserResults } from "../App";
import { useNavigate, Link } from "react-router-dom";
import { Spinner, Input, Checkbox, Button, useInput } from "@nextui-org/react";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { LuChefHat } from "react-icons/lu";
import { Nav } from "../navbar/Navbar";
import { Footer } from "../Footer/Footer";
import "../index.css";

export function Register() {
  const default_errors = {
    email: false,
    firstName: false,
    lastName: false,
    password: false,
    confirmPassword: false,
  };
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState(default_errors);
  const [isVisible, setIsVisible] = useState(false);
  const { setCurrentUser } = useCurrentUserResults();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const updateFormErrors = (fieldName, value) => {
    // Update the specified field with the provided value
    setFormErrors((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };
  function resetFormErrors() {
    setFormErrors(default_errors);
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const validateEmail = (value) => {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  const helper = useMemo(() => {
    if (!formData.email) {
      return {
        text: "",
        color: "",
      };
    }
    const isValid = validateEmail(formData.email);
    return {
      text: isValid ? "Correct email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [formData]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      resetFormErrors();
      let endpoint;
      if (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
      ) {
        // Code for development environment
        endpoint = `http://localhost:3000/users/register`;
      } else {
        // Code for production environment
        endpoint = `https://recipe-finder-backend-6wdh.onrender.com/users/register`;
      }
      const response = await axios.post(endpoint, formData);
      console.log("Register response:", response.data);
      // Handle successful register (e.g., redirect to dashboard)
      if (response.status === 200) {
        setCurrentUser(response.data);
        navigate("/");
      } else if (response.status === 403) {
        console.log("Status 403 - TO-DO SET FORM ERRORS");
        // Data error message
        console.error("Data error:", response.data);
      } else {
        console.log("Status unknown");
        console.log("Login response:", response);
      }
    } catch (error) {
      // Handle register error (e.g., display error message to user)
      if (error.response.status === 403) {
        error.response.data.errors.forEach((error, index) => {
          if (error.msg === "Invalid email format") {
            updateFormErrors("email", true);
          } else if (error.msg === "Passwords do not match") {
            updateFormErrors("confirmPassword", true);
          } else if (
            error.msg ===
            "Password must be at least 6 characters and contain at least one number, one character, and one symbol"
          ) {
            updateFormErrors("password", true);
          } else if (error.msg === "First name contains invalid characters") {
            updateFormErrors("firstName", true);
          } else if (error.msg === "Last name contains invalid characters") {
            updateFormErrors("lastName", true);
          } else {
            console.log(`Error ${index + 1}: ${error.msg}`);
          }
        });
      } else {
        // Data error message
        console.error("Register error:", error.response.data);
      }
    }
  };
  return (
    <>
      <Nav />
      <div>
        <div className="flex h-min min-h-screen items-start justify-center bg-orange-50">
          <form
            className="mx-8 mt-5 w-full rounded-2xl bg-orange-100 p-8 shadow-md sm:w-2/3"
            onSubmit={handleSubmit}
          >
            <fieldset className="flex flex-col gap-2">
              <h2 className="mb-6 flex flex-row items-center justify-center text-center text-2xl font-semibold max-md:flex-col">
                Register with&nbsp;
                <span className="flex flex-row font-bold">
                  <LuChefHat className="text-3xl max-md:text-2xl" />
                  &nbsp;MyRecipe<span className="text-yellow-400">Seeker</span>
                </span>
              </h2>
              {formErrors.firstName && (
                <span className="ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
                  * Contains invalid characters.
                </span>
              )}
              <Input
                name="firstName"
                id="firstName"
                // status={helper.color}
                // color={helper.color}
                // helperColor={helper.color}
                // errorMessage={helper.color === "error" && helper.text}
                variant="faded"
                type="text"
                label="First Name"
                labelPlacement="outside"
                placeholder="Enter First Name..."
                endContent={<MdOutlineEmail />}
                isRequired
                onChange={handleChange}
              />
              {formErrors.lastName && (
                <span className="ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
                  * Contains invalid characters.
                </span>
              )}
              <Input
                name="lastName"
                id="lastName"
                // status={helper.color}
                // color={helper.color}
                // helperColor={helper.color}
                // errorMessage={helper.color === "error" && helper.text}
                variant="faded"
                type="text"
                label="Last Name"
                labelPlacement="outside"
                placeholder="Enter Last Name..."
                endContent={<MdOutlineEmail />}
                isRequired
                onChange={handleChange}
              />
              {formErrors.email && (
                <span className="ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
                  * Invalid email format.
                </span>
              )}
              <Input
                name="email"
                id="email"
                status={helper.color}
                color={helper.color}
                helperColor={helper.color}
                errorMessage={helper.color === "error" && helper.text}
                variant="faded"
                type="email"
                label="Email"
                labelPlacement="outside"
                placeholder="Email address"
                endContent={<MdOutlineEmail />}
                isRequired
                onChange={handleChange}
              />

              {formErrors.password && (
                <span className="ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
                  * Password must be at least 6 characters and contain at least
                  one number, one character, and one symbol
                </span>
              )}
              <Input
                name="password"
                id="password"
                variant="faded"
                type={isVisible ? "text" : "password"}
                label="Password"
                labelPlacement="outside"
                placeholder="Must have at least 6 characters"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? <IoMdEye /> : <IoMdEyeOff />}
                  </button>
                }
                isRequired
                onChange={handleChange}
              />
              {formErrors.confirmPassword && (
                <span className="ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
                  * Passwords do not match
                </span>
              )}
              <Input
                name="confirmPassword"
                id="confirmPassword"
                variant="faded"
                type={isVisible ? "text" : "password"}
                label="Confirm Password"
                labelPlacement="outside"
                placeholder="Passwords must match"
                isRequired
                onChange={handleChange}
              />
              <Button
                className="mt-5 w-full font-semibold"
                type="submit"
                value="Register"
                color="warning"
              >
                Register
              </Button>
              <div className="flex w-full justify-end text-xs">
                Skip the Registration: &nbsp;
                <Link
                  className="flex items-center text-xs underline hover:cursor-pointer hover:font-semibold"
                  to="/login"
                >
                  Try a Demo Account
                </Link>
              </div>
            </fieldset>
          </form>
        </div>
        <div className="footer-section-divider bg-orange-50">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <Footer />
      </div>
    </>
  );
}
