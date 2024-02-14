import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import DashboardLayout from "../components/DashboardLayout";
import axios from "axios";

const Dasboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState(null);
  useEffect(() => {
    getProjects();
  }, [filter]);

  const getProjects = async () => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    setLoading(true)
    const { data } = await axios.get("/api/projects", options);
    setLoading(false)
    const filteredData = filter?data.projects.filter((d)=> d.status === filter):data.projects;
    setProjects(filteredData);
  }; 
  return (
    <>
      <DashboardLayout>
        <div className="mt-10 w-3/4 bg-white rounded-md mx-10 p-6 shadow-slate-300 shadow-md">
          <div className="flex flex-row items-center justify-start gap-4 flex-wrap">
            <p className="font-bold text-slate-500 mr-2">Filters:</p>
            <a
              onClick={() => setFilter("incompleted")}
              className={`font-semibold ${
                filter === "incompleted" ? "text-blue-500" : "text-slate-700"
              }  text-xs md:text-sm`}
              href="#"
            >
              Incompleted
            </a>
            <a
              onClick={() => setFilter("completed")}
              className={`font-semibold ${
                filter === "completed" ? "text-blue-500" : "text-slate-700"
              }  text-xs md:text-sm`}
              href="#"
            >
              Completed
            </a>
            {filter && (
              <button
                className="p-1 text-white bg-blue-500"
                onClick={() => setFilter("")}
              >
                Clear All
              </button>
            )}
          </div>
        </div>
        {loading && <p className="text-center text-lg mt-20">Loading. . . . .</p>}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center p-3 md:p-10 gap-4 place-items-center">
          {projects.map((project, index) => (
            <ProjectCard key={index + 1} project={project} />
          ))}
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dasboard;
