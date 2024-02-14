import React from "react";
import SingleUserAvatar from "./SingleUserAvatar";

const Comment = ({ comment }) => {
  const date = new Date(comment.createdAt);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Kathmandu",
  };

  const formattedDate = date.toLocaleDateString("ne-NP", options);
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="">
        <div className="flex flex-row justify-start items-center gap-4">
          <SingleUserAvatar user={comment?.commentedBy} />
        </div>
        <p className="mt-4 font-bold text-xs">{formattedDate}</p>
      </div>
      <p className="text-sm font-bold py-4">{comment.comment}</p>
    </div>
  );
};

export default Comment;
