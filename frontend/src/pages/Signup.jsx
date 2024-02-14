import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserState } from "../contexts/userContextProvider";

const Signup = () => {
  const {user} = UserState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    profile: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    const { data } = await axios.post("/api/users/signup", formData);
    setLoading(false);
    if (data.success) {
      navigate("/");
    } else {
      console.log(data.message);
    }
  };

  function uploadProfile(file) {
    if (file === undefined) {
      return;
    }
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
      ){

    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "chatApp");
    fetch("https://api.cloudinary.com/v1_1/dq0ueqiga/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setLoading(false);
        setFormData({...formData, 
          profile: data.url.toString()},
        );
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    
    }
  }
  if(user){
    navigate('/dashboard')
  }
  return (
    <>
      <Navbar />
      <div className="flex items-center min-h-[70vh] w-full">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">
            Signup
          </span>

          <form className="mb-4" onSubmit={handleSubmit}>
            <div className="mb-4 md:w-full">
              <label for="fullName" className="block text-xs mb-1">
                Full Name
              </label>
              <input
                value={formData?.fullName}
                onChange={handleInputChange}
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Full Name"
                required
              />
            </div>
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
            <div className="mb-6 md:w-full">
              <div class="flex w-full items-center justify-center bg-grey-lighter">
                <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
                  
                  {formData?.profile ? <>
                  <img src={formData.profile} alt="" />
                  <button onClick={(e)=> { e.stopPropagation(); setFormData({...formData, profile: ""});}} className="mt-4 p-2 bg-red-500 text-white">Remove</button>
                  </>:<>
                  <svg
                    class="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span class="mt-2 text-base leading-normal">
                    Profile Picture
                  </span>
                  <input
                    accept=".png, .gif, .jpeg, .jpg, .heic"
                    onChange={(e) => uploadProfile(e.target.files[0])}
                    type="file"
                    class="hidden"
                  />
                  </>}
                  
                </label>
              </div>
              
            </div>
            <button
              disabled={loading ? true : false}
              type={loading ? "button" : "submit"}
              className={
                "bg-white border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 uppercase text-sm font-semibold px-4 py-2 rounded-md flex items-center justify-center gap-2 w-full"
              }
            >
              Sign Up{" "}
              {loading && (
                <>
                  <div
                    class="w-5 h-5 rounded-full animate-spin
                    border-2 border-solid border-yellow-300  border-t-transparent"
                  ></div>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
