import React from "react";
import { Link } from "react-router-dom";
import {
  FaGripVertical,
  FaPlusCircle,
} from "react-icons/fa";
import {UserState} from '../contexts/userContextProvider'
const Sidebar = () => {
  const {user} = UserState();
  return (
    <>
      <div className="flex flex-col items-center justify-start gap-32 min-h-screen">
        <div className="flex flex-col items-center gap-2 justify-center mt-10">
          <img
            className="w-20 h-20 rounded-full"
            src={user?user?.profile:"https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"}
            alt=""
          />
          <p className="text-lg text-center text-slate-700 font-bold">{user?.fullName || "Unknown"}</p>
        </div>
        <div className="w-full px-2">
          <Link
            className="w-full px-4 py-1 hover:bg-blue-500 hover:text-white text-xs md:text-base flex flex-row items-center justify-start rounded-md ease-in-out duration-300 gap-2"
            to={"/dashboard"}
          >
            <FaGripVertical /> Dashboard
          </Link>
          <Link
            className="w-full px-4 py-1 hover:bg-blue-500 hover:text-white text-xs md:text-base flex flex-row items-center justify-start rounded-md ease-in-out duration-300 gap-2"
            to={"/create"}
          >
            <FaPlusCircle /> Add Project
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
