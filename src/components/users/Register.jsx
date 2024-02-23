import { useState, useMemo } from "react";
import axios from "axios";
import { useCurrentUserResults } from "../App";
import { useNavigate, Link } from "react-router-dom";
import { Spinner, Input, Checkbox, Button, useInput } from "@nextui-org/react";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

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
      const response = await axios.post(
        "http://localhost:3000/users/register",
        formData,
      );
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
    <div className="flex h-min min-h-screen items-start justify-center">
      <form className="mt-5 w-2/3" onSubmit={handleSubmit}>
        <fieldset className="flex flex-col gap-2">
          <h2 className="text-center text-2xl font-semibold">
            Register with <span className="font-bold">RecipeApp</span>
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
              * Password must be at least 6 characters and contain at least one
              number, one character, and one symbol
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
            className="w-full"
            type="submit"
            value="Register"
            color="primary"
          >
            Register
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
