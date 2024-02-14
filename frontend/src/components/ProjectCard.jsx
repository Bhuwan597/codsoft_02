import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const date = new Date(project.createdAt)
const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    timeZone: 'Asia/Kathmandu' 
};
const formattedDate = date.toLocaleString('ne-NP', options)
  return (
    <Link to={`/${project.slug}`} className="w-fit">
      <div className="bg-white p-4 w-full shadow-slate-300 shadow-md rounded-md">
        <div className="p-4">
          <h2 className="text-base font-bold">{project.title}</h2>
          <p className="text-slate-500 text-xs">{formattedDate}</p>
        </div>
        <hr class="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
        <div className="flex flex-row items-center justify-start gap-1">
          <div class="flex -space-x-2">
            {project?.members.map((user,index) => {
              return (
                <>
                  <a target="_blank" href={user.profile} key={index+1}>
                    <img
                      class="z-40 inline-block border border-cyan-500 h-8 w-8 rounded-full ring-2 ring-white ring-opacity-50"
                      src={user.profile}
                      alt=""
                    />
                  </a>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
