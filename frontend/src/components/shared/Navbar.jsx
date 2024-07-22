import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ProfilePopover } from "../ProfilePopover";
import { useSelector } from "react-redux";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { authUser } = useSelector((store) => store.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Junction</span>
          </h1>
        </div>
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            <FiMenu className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex items-center gap-12">
          <ul className="flex flex-row font-medium items-center gap-5">
            {authUser && authUser.role === "recruiter" ? (
              <>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link to={"/browse"}>Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!authUser ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant={"outline"}>Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5f32ad]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <ProfilePopover />
          )}
        </div>
      </div>
      <div
        className={`fixed top-0 right-0 h-full bg-white w-64 transform ${
          menuOpen ? "translate-x-0 w-full" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Junction</span>
          </h1>
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <ul className="flex flex-col font-medium items-center gap-5 mt-10">
          {authUser && authUser.role === "recruiter" ? (
            <>
              <li className="hover:text-[#6A38C2] cursor-pointer">
                <Link to={"/admin/companies"}>Companies</Link>
              </li>
              <li className="hover:text-[#6A38C2] cursor-pointer">
                <Link to={"/admin/jobs"}>Jobs</Link>
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-[#6A38C2] cursor-pointer">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="hover:text-[#6A38C2] cursor-pointer">
                <Link to={"/jobs"}>Jobs</Link>
              </li>
              <li className="hover:text-[#6A38C2] cursor-pointer">
                <Link to={"/browse"}>Browse</Link>
              </li>
            </>
          )}
          {!authUser ? (
            <>
              <li className="hover:text-[#6A38C2] cursor-pointer">
                <Link to="/login">Login</Link>
              </li>
              <li className="hover:text-[#6A38C2] cursor-pointer">
                <Link to="/signup">Signup</Link>
              </li>
            </>
          ) : (
            <ProfilePopover />
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
