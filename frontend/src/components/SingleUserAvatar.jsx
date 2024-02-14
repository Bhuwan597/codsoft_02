import React from "react";

const SingleUserAvatar = ({user}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
      <img
        className="w-8 h-8 rounded-full"
        src={user?.profile}
        alt=""
      />
      <p className="text-sm text-slate-700 font-bold">{user?.fullName}</p>
    </div>
  );
};

export default SingleUserAvatar;
