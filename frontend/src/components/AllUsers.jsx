import React, { useEffect, useState } from "react";
import SingleUserAvatar from "./SingleUserAvatar";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get("/api/users", options);
      if (data.success === false ) {
        console.log(data)
      }else{
        setUsers(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col justify-start items-center pr-6">
        <h2 className="text-base md:text-xl font-bold text-slate-700 mt-10">
          All Users
        </h2>
        <div className="w-fit flex flex-col justify-center items-center mt-10 gap-4 mx-4">
          {users && users?.map((user, index) => (
            <SingleUserAvatar key={index + 1} user={user} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllUsers;
