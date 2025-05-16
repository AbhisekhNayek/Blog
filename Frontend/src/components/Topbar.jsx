import React, { useState } from "react";
import logo from "@/assets/images/logo-dark.png";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import SearchBox from "./SearchBox";
import {
  RouteBlogAdd,
  RouteIndex,
  RouteProfile,
  RouteSignIn,
} from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import usericon from "@/assets/images/user.png";

import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoLogOutOutline, IoSearch } from "react-icons/io5";
import { removeUser } from "@/redux/user/user.slice";
import { showToast } from "@/helpers/showToast";
import { getEvn } from "@/helpers/getEnv";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { useSidebar } from "./ui/sidebar";

const Topbar = () => {
  const { toggleSidebar } = useSidebar();
  const [showSearch, setShowSearch] = useState(false);
  const dispath = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${getEvn("VITE_API_BASE_URL")}/auth/logout`,
        {
          method: "get",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispath(removeUser());
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
   <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-black px-5 border-b border-green-500 shadow-sm">
  <div className="flex justify-center items-center gap-2">
    <button
      onClick={toggleSidebar}
      className="md:hidden p-2 rounded hover:bg-green-800/20 focus:outline-none focus:ring-2 focus:ring-green-500 text-green-400"
      type="button"
      aria-label="Toggle Sidebar"
    >
      <AiOutlineMenu size={24} />
    </button>
    <Link to={RouteIndex}>
      <img src={logo} alt="Site Logo" className="md:w-auto w-48" />
    </Link>
  </div>

  <div className="w-[500px]">
    <div
      className={`md:relative md:block absolute bg-black left-0 w-full md:top-0 top-16 md:p-0 p-5 shadow-md rounded-b-md ${
        showSearch ? "block" : "hidden"
      }`}
    >
      <SearchBox />
    </div>
  </div>

  <div className="flex items-center gap-5">
    <button
      onClick={toggleSearch}
      type="button"
      className="md:hidden block p-2 rounded hover:bg-green-800/20 focus:outline-none focus:ring-2 focus:ring-green-500 text-green-400"
      aria-label="Toggle Search"
    >
      <IoMdSearch size={25} />
    </button>

    {!user.isLoggedIn ? (
      <Button
        asChild
        className="rounded-full px-4 py-1 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
      >
        <Link to={RouteSignIn} className="flex items-center gap-2">
          <MdLogin size={20} />
          Sign In
        </Link>
      </Button>
    ) : (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer ring-2 ring-green-500">
            <AvatarImage src={user.user.avatar || usericon} />
            <AvatarFallback>{user.user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48 bg-black text-white border border-green-600">
          <DropdownMenuLabel>
            <p className="font-semibold text-green-400">{user.user.name}</p>
            <p className="text-sm text-gray-400 truncate">{user.user.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-green-600" />

          <DropdownMenuItem
            asChild
            className="cursor-pointer hover:bg-green-800/30 text-white"
          >
            <Link to={RouteProfile} className="flex items-center gap-2">
              <FaRegUser />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="cursor-pointer hover:bg-green-800/30 text-white"
          >
            <Link to={RouteBlogAdd} className="flex items-center gap-2">
              <FaPlus />
              Create Blog
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-green-600" />

          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-red-500 hover:bg-red-900/20 flex items-center gap-2"
          >
            <IoLogOutOutline />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )}
  </div>
</div>

  );
};

export default Topbar;
