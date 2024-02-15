import { useState } from "react";
import axios from "axios";
import { useCurrentUserResults } from "../App";
import { useNavigate } from "react-router-dom";

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

  const { setCurrentUser } = useCurrentUserResults();
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
    <div className="flex h-min items-center justify-center">
      <form className="mt-5 w-2/3" onSubmit={handleSubmit}>
        <fieldset className="flex flex-col">
          <h2 className="text-center text-2xl font-semibold">Register</h2>
          <label className="font-medium" htmlFor="firstName">
            First Name:
          </label>
          {formErrors.firstName && (
            <span className="ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
              * Contains invalid characters.
            </span>
          )}
          <input
            className="mx-1 my-2 block rounded-md border-0 p-1 shadow-sm ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter First Name..."
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <label className="font-medium" htmlFor="lastName">
            Last Name:
          </label>
          {formErrors.lastName && (
            <span className="ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
              * Contains invalid characters.
            </span>
          )}
          <input
            className="mx-1 my-2 block rounded-md border-0 p-1 shadow-sm ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter Last Name..."
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label className="font-medium" htmlFor="email">
            Email Address:
          </label>
          {formErrors.email && (
            <span className="ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
              * Invalid email format.
            </span>
          )}
          <input
            className="mx-1 my-2 block rounded-md border-0 p-1 shadow-sm ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            type="text"
            id="email"
            name="email"
            placeholder="john@doe.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label className="font-medium" htmlFor="password">
            Password
          </label>
          {formErrors.password && (
            <span className="ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
              * Password must be at least 6 characters and contain at least one
              number, one character, and one symbol
            </span>
          )}
          <input
            className="mx-1 my-2 block rounded-md border-0 p-1 shadow-sm ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            type="password"
            id="password"
            name="password"
            placeholder="Must have at least 6 characters"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label className="ml-1 font-medium" htmlFor="confirmPassword">
            Confirm Password
          </label>
          {formErrors.confirmPassword && (
            <span className="ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
              * Passwords do not match
            </span>
          )}
          <input
            className="mx-1 my-2 block rounded-md border-0 p-1 shadow-sm ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Passwords must match"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <input
            className="mt-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
            value="Register"
          />
        </fieldset>
      </form>
    </div>
  );
}
