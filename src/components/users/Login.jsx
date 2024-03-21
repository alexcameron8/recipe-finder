import { useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlertsContext, useCurrentUserResults } from "../App";
import { MdOutlineEmail } from "react-icons/md";
import { Spinner, Input, Button } from "@nextui-org/react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";

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
      const response = await axios.post("http://localhost:3000/users/login", {
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
      const response = await axios.post(
        "http://localhost:3000/users/login",
        formData,
      );

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
      {isLoading ? (
        <div className=" flex h-screen min-h-screen flex-col items-center justify-center bg-orange-50">
          <Spinner size="md" />
        </div>
      ) : (
        <div className="flex h-min min-h-screen items-start justify-center bg-orange-50">
          <form
            className="mt-5 w-2/3 rounded-2xl p-8 shadow-md"
            onSubmit={handleSubmit}
          >
            <fieldset className="flex flex-col gap-2">
              <h2 className="mb-6 text-center text-2xl font-semibold">
                Welcome to <span className="font-bold">RecipeApp</span>
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
      )}
    </>
  );
}
