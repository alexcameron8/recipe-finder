import { Avatar, Input, Checkbox, Button, useInput } from "@nextui-org/react";
import { useState, useMemo } from "react";
import { MdOutlineEmail, MdEdit } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Nav } from "../navbar/Navbar";

export function Profile() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
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
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Nav />
      <div className="flex min-h-screen flex-col items-center bg-orange-50 ">
        <div className="my-4 flex w-2/3 flex-col items-center gap-2 rounded-lg bg-orange-100 p-4 shadow-lg">
          <h2 className="my-4 text-2xl font-semibold">Profile Settings</h2>
          <Avatar
            isBordered
            color="default"
            name="AC"
            // icon={<MdEdit />}
            className="m-2 h-20 w-20 items-center text-large"
          />
          <Input
            name="firstName"
            id="firstName"
            errorMessage=""
            variant="faded"
            type="firstName"
            label="First Name"
            placeholder="Alex"
            labelPlaceholder="First Name"
            endContent={<MdEdit className="hover:cursor-pointer" />}
            onChange={handleChange}
          />
          <Input
            name="lastName"
            id="lastName"
            errorMessage=""
            variant="faded"
            type="lastName"
            label="Last Name"
            placeholder="Cameron"
            labelPlaceholder="Last Name"
            endContent={<MdEdit className="hover:cursor-pointer" />}
            onChange={handleChange}
          />
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
            placeholder="alex8cameron@gmail.com"
            labelPlaceholder="email"
            startContent={<MdOutlineEmail />}
            endContent={<MdEdit className="hover:cursor-pointer" />}
            onChange={handleChange}
          />
          <Input
            name="password"
            id="password"
            variant="faded"
            type={isVisible ? "text" : "password"}
            label="Password"
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
            onChange={handleChange}
          />
          <Input
            name="confirmPassword"
            id="confirmPassword"
            variant="faded"
            type="Password"
            label="Confirm Password"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          <Button className="w-full" type="submit" value="Save" color="primary">
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
