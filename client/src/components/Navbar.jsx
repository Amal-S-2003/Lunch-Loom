import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { getUserData } from "../services/all_api";
function Navbar() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [loggedUserData, setLoggedUserData] = useState({cart:0});
  

    const fetchLoggedUserData = async () => {
      try {
        const result = await getUserData({ userId });
        setLoggedUserData(result.data[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      
    };
  
    useEffect(() => {
      fetchLoggedUserData();
    }, [userId]);


  return (
    <header className=" mb-2   fixed-top bg-white">
      {/* <div className="relative max-w-screen-lg  mx-5 py-2 flex sm:items-center bg-slate-600 w-full sm:justify-between flex-col sm:flex-row"> */}
      <div className="relative  mx-5 py-2 flex sm:items-center sm:justify-between flex-col sm:flex-row">
        <NavLink to="/" className="text-3xl flex items-center font-black">
          <span>
            <img className="w-14 h-14" src={assets.logo} alt="" />
          </span>
          <span>LUNCH-LOOM</span>
        </NavLink>
        <input className="peer hidden" type="checkbox" id="navbar-open" />
        <label
          htmlFor="navbar-open"
          className="cursor-pointer sm:hidden text-xl absolute right-3 top-5 "
        >
          <i class="fa-solid fa-bars"></i>
          <span className="sr-only">Toggle Navigation</span>
        </label>
        <nav
          aria-label="Header Navigation"
          className="peer-checked:block hidden py-4 sm:py-0 sm:block"
        >
          <ul className="flex flex-col sm:flex-row md:gap-x-8 gap-y-4 items-center">
            <li className="">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `text-gray-600 py-1 px-3 rounded-full hover:text-white hover:bg-gray-600 ${
                    isActive && "text-white bg-gray-600"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to={"/foods"}
                className={({ isActive }) =>
                  `text-gray-600 py-1 px-3 rounded-full hover:text-white hover:bg-gray-600 ${
                    isActive && "text-white bg-gray-600"
                  }`
                }
              >
                Food
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                to={"/cart"}
                className={({ isActive }) =>
                  `text-gray-600 py-1 px-3 w-fit flex rounded-full hover:text-white hover:bg-gray-600 ${
                    isActive && "text-white bg-gray-600"
                  }`
                }
              >
                Cart
                {
                  loggedUserData?.cart?.length>0?
                  <p className="bg-green-500 flex items-center justify-center ms-2 rounded-full w-6 text-white">{loggedUserData.cart.length}</p>:""
                }
              </NavLink>
            </li>
            <li className=" sm:mt-0">
              {userId ? (
                <NavLink
                  to={"/profile"}
                  className={({ isActive }) =>
                    `text-gray-600 py-1 px-3 rounded-full hover:text-white hover:bg-gray-600 ${
                      isActive && "text-white bg-gray-600"
                    }`
                  }
                >
                  Profile
                </NavLink>
              ) : (
                <a
                  className="border-2 px-6 py-1.5 rounded-lg border-gray-600 font-medium text-gray-600 hover:bg-gray-600 hover:text-white btn"
                  onClick={() => navigate("/login")}
                >
                  Login
                </a>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
