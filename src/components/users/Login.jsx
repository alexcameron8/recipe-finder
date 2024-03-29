import { useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlertsContext, useCurrentUserResults } from "../App";
import { MdOutlineEmail } from "react-icons/md";
import { Spinner, Input, Button } from "@nextui-org/react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { LuChefHat } from "react-icons/lu";
import { Nav } from "../navbar/Navbar";
import { Footer } from "../Footer/Footer";
import "../index.css";

export function Login() {
  const default_errors = {
    email: false,
    password: false,
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(default_errors);
  const { currentUser, setCurrentUser } = useCurrentUserResults();
  const { alerts, setAlerts } = useAlertsContext();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const addAlert = (type, message) => {
    const newAlerts = [...alerts, { type, message }];
    setAlerts(newAlerts);
  };
  // Function to update formErrors state
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

  const handleDemoLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      resetFormErrors();
      let endpoint;
      if (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
      ) {
        // Code for development environment
        endpoint = `http://localhost:3000/users/login`;
      } else {
        // Code for production environment
        endpoint = `https://recipe-finder-backend-6wdh.onrender.com/users/login`;
      }
      const response = await axios.post(endpoint, {
        email: "user@demo.com",
        password: "Demo123!",
      });

      // Check status code for response
      if (response.status === 200) {
        setCurrentUser(response.data);
        addAlert(
          "success",
          `Login success - Welcome back, ${response.data.firstName}.`,
        );
        setIsLoading(false);
        navigate("/");
      }
    } catch (error) {
      // Data error message
      console.error("Data errors:", error.response.data);
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      resetFormErrors();
      let endpoint;
      if (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
      ) {
        // Code for development environment
        endpoint = `http://localhost:3000/users/login`;
      } else {
        // Code for production environment
        endpoint = `https://recipe-finder-backend-6wdh.onrender.com/users/login`;
      }
      const response = await axios.post(endpoint, formData);

      // Check status code for response
      if (response.status === 200) {
        setCurrentUser(response.data);
        addAlert(
          "success",
          `Login success - Welcome back, ${response.data.firstName}.`,
        );
        setIsLoading(false);
        navigate("/");
      } else if (response.status === 403) {
        console.log("Status 403");
        // Data error message
        console.error("Data error:", response.data);
        setIsLoading(false);
        // Display error message to user
      } else if (response.status === 500) {
        console.log("Status 500");
        // Registration error failure
        console.error("Login failure:", response.data);
        setIsLoading(false);
        // Display error message to user
      } else {
        console.log("Status unknown");
        console.log("Login response:", response);
        setIsLoading(false);
      }
    } catch (error) {
      // Handle login error (e.g., display error message to user)
      if (error.response.status === 403) {
        error.response.data.errors.forEach((error, index) => {
          if (error.msg === "Invalid email format") {
            console.log("email flag");
            updateFormErrors("email", true);
          } else if (error.msg === "Passwords do not match.") {
            console.log("password flag");
            updateFormErrors("password", true);
          } else if (error.msg === "Email account not found.") {
            console.log("account flag");
            updateFormErrors("password", true);
          } else {
            console.log(`Error ${index + 1}: ${error.msg}`);
          }
        });
        setIsLoading(false);
      } else {
        // Data error message
        console.error("Data errors:", error.response.data);
      }
      setIsLoading(false);
    }
  };
  return (
    <>
      <Nav />
      {isLoading ? (
        <div className=" flex h-screen min-h-screen flex-col items-center justify-center bg-orange-50">
          <Spinner size="md" />
        </div>
      ) : (
        <div>
          <div className="flex h-min min-h-screen items-start justify-center bg-orange-50">
            <form
              className="mx-8 mt-5 w-full rounded-2xl bg-orange-100 p-8 shadow-md sm:w-2/3"
              onSubmit={handleSubmit}
            >
              <fieldset className="flex flex-col gap-2">
                <h2 className="mb-6 flex flex-row items-center justify-center text-center text-2xl font-semibold max-md:flex-col ">
                  Welcome to&nbsp;
                  <span className="flex flex-row items-center font-bold">
                    <LuChefHat className="text-3xl max-md:text-2xl" />
                    &nbsp;MyRecipe
                    <span className="text-yellow-400">Seeker</span>
                  </span>
                </h2>
                {formErrors.email && (
                  <span className="ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
                    * Invalid email format
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
                  placeholder="Email address"
                  labelPlaceholder="email"
                  endContent={<MdOutlineEmail />}
                  isRequired
                  onChange={handleChange}
                />
                {formErrors.password && (
                  <span className="ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
                    * Invalid credentials. Please try again.
                  </span>
                )}
                <Input
                  name="password"
                  id="password"
                  variant="faded"
                  type={isVisible ? "text" : "password"}
                  label="Password"
                  placeholder="Must have at least 6 characters"
                  // endContent={<MdLockOutline />}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? <IoMdEye /> : <IoMdEyeOff />}
                    </button>
                  }
                  // visibleIcon={<IoMdEye />}
                  // hiddenIcon={<IoMdEyeOff />}
                  isRequired
                  onChange={handleChange}
                />
                <div className="flex w-full justify-end">
                  <a className="flex items-center text-xs no-underline hover:cursor-pointer hover:font-semibold hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <Button
                  className="mt-5 w-full font-semibold"
                  type="submit"
                  value="Login"
                  color="warning"
                >
                  Login
                </Button>
                <div className="flex w-full justify-end text-xs">
                  Not registered yet?&nbsp;
                  <Link
                    className="flex items-center text-xs underline hover:cursor-pointer hover:font-semibold"
                    to="/register"
                  >
                    Create account
                  </Link>
                </div>
                <div className="flex w-full justify-end text-xs">
                  Just browsing? &nbsp;
                  <Link
                    className="flex items-center text-xs underline hover:cursor-pointer hover:font-semibold"
                    to="/"
                    onClick={handleDemoLogin}
                  >
                    Log in with a Demo Account
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
      )}
    </>
  );
}
