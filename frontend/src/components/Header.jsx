import React from "react";
import Logo from "./Logo";

import { HiSearch } from "react-icons/hi";

const Header = () => {
  return (
    <header className="h-16 shadow-md">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
          <Logo w={140} h={50} />
        </div>
        <div className="flex items-center w-full justify-between max-w-xl rounded-full focus-within:shadow-md">
          <input
            type="text"
            placeholder="Search Products Here....."
            className="w-full border border-r-0 h-[35px] rounded-l-full px-4 outline-none"
          />
          <div className="text-2xl min-w-[90px] bg-red-600 h-[35px] flex items-center justify-center rounded-r-full text-white">
            <HiSearch />
          </div>
        </div>
        <div>Icons</div>
      </div>
    </header>
  );
};

export default Header;
