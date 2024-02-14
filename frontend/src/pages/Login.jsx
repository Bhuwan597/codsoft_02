import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserState } from "../contexts/userContextProvider";

const Login = () => {
  const navigate = useNavigate();
  const {user} = UserState()
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  if(user){
    navigate('/dashboard')
  }
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.post("/api/users/login", formData);
    setLoading(false);
    if (data.success) {
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      navigate("/dashboard");
    } else {
      console.log(data.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex items-center min-h-[90vh] w-full">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">
            Login
          </span>

          <form className="mb-4" onSubmit={handleSubmit}>
            <div className="mb-4 md:w-full">
              <label for="email" className="block text-xs mb-1">
                Email
              </label>
              <input
                value={formData?.email}
                onChange={handleInputChange}
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-6 md:w-full">
              <label for="password" className="block text-xs mb-1">
                Password
              </label>
              <input
                value={formData?.password}
                onChange={handleInputChange}
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
              />
            </div>
            <button
              disabled={loading ? true : false}
              type={loading ? "button" : "submit"}
              className={ "bg-white border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 uppercase text-sm font-semibold px-4 py-2 rounded-md flex items-center justify-center gap-2 w-full"}
            >
              Login {loading && <>
                <div class="w-5 h-5 rounded-full animate-spin
                    border-2 border-solid border-yellow-300  border-t-transparent"></div>
              </>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
