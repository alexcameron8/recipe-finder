import { Link } from "react-router-dom";
import { useCurrentUserResults } from "../App";
import { ProfileDropdown } from "./ProfileDropdown";
import { LuChefHat } from "react-icons/lu";
import { IoHomeOutline, IoHomeSharp, IoHeartOutline } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { MdOutlineExplore, MdExplore } from "react-icons/md";
import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

export function Nav() {
  const { currentUser, setCurrentUser } = useCurrentUserResults();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [curTab, setCurTab] = useState("home");
  const menuItems = [
    "Home",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <>
      <div className="align-center flex flex-row">
        <Navbar
          maxWidth="xl"
          onMenuOpenChange={setIsMenuOpen}
          classNames={{
            item: [
              "flex",
              "relative",
              "h-fit",
              "items-center",
              "data-[active=true]:after:content-['']",
              "data-[active=true]:after:absolute",
              "data-[active=true]:after:bottom-0",
              "data-[active=true]:after:left-0",
              "data-[active=true]:after:right-0",
              "data-[active=true]:after:h-[2px]",
              "data-[active=true]:after:rounded-[2px]",
              "data-[active=true]:after:bg-primary",
            ],
          }}
        >
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <h2 className=" self-center font-semibold text-white">
              <Link className="flex flex-row items-center text-black" to="/">
                <LuChefHat className="text-2xl" />
                &nbsp;RecipeApp
              </Link>
            </h2>
          </NavbarBrand>
          <NavbarContent className=" hidden gap-10 sm:flex" justify="center">
            <NavbarItem className="py-2" isActive={curTab === "home"}>
              <Link
                className="flex flex-row items-center font-semibold"
                onClick={() => setCurTab("home")}
                color="foreground"
                to="/"
              >
                {curTab === "home" ? <IoHomeSharp /> : <IoHomeOutline />}
                &nbsp;Home
              </Link>
            </NavbarItem>
            <NavbarItem className="py-2" isActive={curTab === "explore"}>
              <Link
                className="flex flex-row items-center font-semibold"
                onClick={() => setCurTab("explore")}
                to="/explore"
              >
                {curTab === "explore" ? <MdExplore /> : <MdOutlineExplore />}
                &nbsp;Explore
              </Link>
            </NavbarItem>
            {currentUser && (
              <NavbarItem className="py-2" isActive={curTab === "my-recipes"}>
                <Link
                  className="flex flex-row items-center font-semibold"
                  onClick={() => setCurTab("my-recipes")}
                  color="foreground"
                  to="/my-recipes"
                >
                  {curTab === "my-recipes" ? (
                    <IoMdHeart color="#f31260" />
                  ) : (
                    <IoHeartOutline />
                  )}
                  &nbsp;My Recipes
                </Link>
              </NavbarItem>
            )}
          </NavbarContent>
          <NavbarContent justify="end">
            {currentUser !== null ? (
              <ProfileDropdown />
            ) : (
              <>
                <NavbarItem className="hidden sm:flex">
                  <Link to="/login">Login</Link>
                </NavbarItem>
                <NavbarItem className="hidden sm:flex">
                  <Button color="primary" variant="flat">
                    <Link to="/register">Sign Up</Link>
                  </Button>
                </NavbarItem>
              </>
            )}
          </NavbarContent>
          <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === menuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  className="w-full"
                  href="#"
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
      </div>
    </>
  );
}
