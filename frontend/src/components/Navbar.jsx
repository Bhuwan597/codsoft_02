import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserState } from "../contexts/userContextProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = UserState();
  const handleLogout = ()=>{
    localStorage.removeItem("userInfo");
    navigate('/')
  }
  return (
    <header className="selection:bg-transparent">
      <nav className="flex flex-row justify-between items-center mx-4 md:mx-10 lg:mx-32">
        <Link to={"/"} className="brand flex flex-row gap-2 items-center mt-4">
          <img className="w-8 h-8 md:h-16 md:w-16" src="./logo.png" alt="" />
          <p className="md:text-lg font-bold text-xs">Project Manager</p>
        </Link>
        <div className="buttons flex flex-row justify-center items-center gap-3">
          {user ? (
            <>
              <button onClick={()=> handleLogout()} className="bg-white border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 uppercase text-xs md:text-sm font-semibold px-1 py-1 md:px-4 md:py-2 rounded-md">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="hover:underline" to={"/"}>
                Login
              </Link>
              <Link className="hover:underline" to={"/signup"}>
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
