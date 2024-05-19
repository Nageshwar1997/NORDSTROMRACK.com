import React from "react";

// Assets
import Logo from "./Logo";

// React Icons
import { HiSearch } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";

const Header = () => {
  return (
    <header className="h-16 shadow-md">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="cursor-pointer">
          <Logo w={140} h={50} />
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-xl rounded-full focus-within:shadow-md">
          <input
            type="text"
            placeholder="Search Products Here....."
            className="w-full border border-r-0 h-[35px] rounded-l-full px-4 outline-none"
          />
          <div className="text-2xl min-w-[90px] bg-blue-600 h-[35px] flex items-center justify-center rounded-r-full text-white cursor-pointer hover:bg-blue-700">
            <HiSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="text-3xl cursor-pointer">
            <FaRegUserCircle />
          </div>
          <div className="text-3xl cursor-pointer relative">
            <span>
              <TiShoppingCart />
              <div className="bg-blue-600 text-white w-4 h-4 p-1 flex items-center justify-center rounded-full absolute -top-2 right-1">
                <p className="text-xs">0</p>
              </div>
            </span>
          </div>
          <div className="cursor-pointer">
            <button className="px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
