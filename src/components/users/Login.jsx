import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCurrentUserResults } from "../App";

export function Login() {
  const default_errors = {
    email: false,
    password: false,
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState(default_errors);
  const { currentUser, setCurrentUser } = useCurrentUserResults();
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
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
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
        navigate("/");
      } else if (response.status === 403) {
        console.log("Status 403");
        // Data error message
        console.error("Data error:", response.data);
        // Display error message to user
      } else if (response.status === 500) {
        console.log("Status 500");
        // Registration error failure
        console.error("Login failure:", response.data);
        // Display error message to user
      } else {
        console.log("Status unknown");
        console.log("Login response:", response);
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
      } else {
        // Data error message
        console.error("Data errors:", error.response.data);
      }
    }
  };
  return (
    <div className="flex h-min items-center justify-center">
      <form className="mt-5 w-2/3" onSubmit={handleSubmit}>
        <fieldset className="flex flex-col">
          <h2 className="text-center text-2xl font-semibold">Login</h2>
          <label className="ml-1 font-medium" htmlFor="email">
            Email Address:
          </label>
          {formErrors.email && (
            <span className="ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
              * Invalid email format
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
          <label className="ml-1 font-medium" htmlFor="password">
            Password
          </label>
          {formErrors.password && (
            <span className="ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
              * Invalid credentials. Please try again.
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
          <input
            className="mt-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
            value="Login"
          />
        </fieldset>
      </form>
    </div>
  );
}
