import React, { useContext, useState } from "react";

// Assets
import Logo from "./Logo";

// React Icons
import { HiSearch } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const searchInputValue = useLocation()
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [searchInput, setSearchInput] = useState(
    searchInputValue?.search?.split("=")[1]
  );
  const user = useSelector((state) => state.user?.user);
  const context = useContext(Context);
  const navigate = useNavigate();

  // console.log("user header", user);

  console.log("Search Input Value", searchInputValue.search.split("=")[1]);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  // console.log("Header Cart Count", context?.cartProductCount);

  const handleSearchInput = (e) => {
    const { value } = e.target;
    setSearchInput(value)

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white w-full transition-all fixed top-0 left-0 right-0 z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="cursor-pointer pt-1">
          <Link to="/">
            <Logo w={128} h={50} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-xl rounded-full focus-within:shadow-md">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInput}
            placeholder="Search Products Here....."
            className="w-full border border-r-0 h-[35px] rounded-l-full px-4 outline-none"
          />
          <div className="text-2xl min-w-[90px] bg-blue-600 h-[35px] flex items-center justify-center rounded-r-full text-white cursor-pointer hover:bg-blue-700">
            <HiSearch />
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    alt={user.name}
                    className={`w-10 h-10 rounded-full`}
                  />
                ) : (
                  <FaRegUserCircle />
                )}
              </div>
            )}
            {menuDisplay && (
              <div className="absolute hidden md:block bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded-md">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"admin-panel/all-products"}
                      onClick={() => setMenuDisplay((prev) => !prev)}
                      className="whitespace-nowrap hover:bg-blue-100 rounded-sm p-1"
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
            <Link to={"/cart"} className="text-3xl cursor-pointer relative">
              <span>
                <FaShoppingCart />
                {context?.cartProductCount > 0 && (
                  <div className="bg-blue-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-3">
                    <p className="text-xs">{context?.cartProductCount}</p>
                  </div>
                )}
              </span>
            </Link>
          )}
          <div className="cursor-pointer">
            {user?._id ? (
              <Link
                to={"/"}
                onClick={handleLogout}
                className="px-4 pb-2 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                Logout
              </Link>
            ) : (
              <Link
                to={"/login"}
                className="px-4 pb-2 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
