import { Outlet, Navigate } from "react-router-dom";
import { UserState } from "../contexts/userContextProvider";

const Auth = () => {
  const {user} = UserState();
  const storedUser = JSON.parse(localStorage.getItem("userInfo"));

  if (typeof window === "undefined") return null;

  return (storedUser || user ? <Outlet /> : <Navigate to="/" />)
};

export default Auth;
