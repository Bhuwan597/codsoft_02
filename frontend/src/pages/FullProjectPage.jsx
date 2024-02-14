import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import "../App.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Comment from "../components/Comment";

const FullProjectPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState("");
  const [comments, setComments] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false)
  const [commentData, setCommentData] = useState({
    comment: "",
    commentedIn: project._id,
  });
  const navigate = useNavigate();
  useEffect(() => {
    getProject();
  }, [slug]);

  useEffect(() => {
    if(!project) return;
    getComments();
  }, [project, fetchAgain]);

  const getProject = async () => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/projects/${slug}`, options);
    if(!data) return navigate('/dashboard')
    setProject(data);
  };
  const date1 = new Date(project.deadline);
  const date2 = new Date(project.createdAt);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kathmandu",
  };
  const formattedDate1 = date1.toLocaleString("ne-NP", options);
  const formattedDate2 = date2.toLocaleString("ne-NP", options);

  const updateProject = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `/api/projects/update/${project._id}`,
        {},
        options
      );
      setProject(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getComments = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const url = `/api/comments/${project._id}`;
      const { data } = await axios.get(url, options);
      setComments(data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post("/api/comments", commentData, options);
      setCommentData({ ...commentData, comment: "" });
      setFetchAgain(prev=>!prev);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <DashboardLayout>
      {project && (
        <>
          <div className="flex flex-col md:flex-row items-start justify-between w-full gap-4 p-4">
            <div className="w-full md:w-1/2 rounded-md flex flex-col gap-8">
              <div className="bg-white p-4">
                <h1 className="text-xl font-bold">{project.title} <span className={`uppercase text-xs mx-2 ${project.status ==='completed'?'text-green-500':'text-yellow-400'}`}>{project.status}</span> </h1>
                <p className="font-semibold text-sm">
                  By {project.createdBy?.fullName}
                </p>
                <p className="font-bold text-xs mt-4">
                  Project Assigned on {formattedDate2}
                </p>
                <p className="font-bold text-xs mt-4">
                  Project Due by {formattedDate1}
                </p>
                <div className="mt-6">
                  <h2 className="text-sm">Project Assigned to:</h2>
                  <div className="flex flex-row items-center justify-start gap-1">
                    <div class="flex -space-x-2">
                      {project?.members.map((user, index) => {
                        return (
                          <>
                            <a
                              target="_blank"
                              href={user.profile}
                              key={index + 1}
                            >
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
                <div className="mt-6">
                  {project && (
                    <button
                      onClick={updateProject}
                      className="text-white border bg-blue-500 hover:text-blue-500 hover:bg-white uppercase text-sm font-semibold px-4 py-2 rounded-md border-blue-500"
                    >
                      {project.status === "completed"
                        ? "Mark as incompleted"
                        : "Mark as completed"}
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-white pb-4 pl-4 pr-4 rounded-md">
                <p className="text-base font-bold">Post a new comment</p>
                <form
                  onSubmit={handleSubmit}
                  id="form"
                  className="md:p-4 flex flex-col gap-8"
                >
                  <textarea
                  required
                    value={commentData.comment}
                    onChange={(e) =>
                      setCommentData({
                        ...commentData,
                        comment: e.target.value,
                        commentedIn: project._id
                      })
                    }
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Comment. . . . . ."
                  ></textarea>
                  <button className="text-white border bg-blue-500 hover:text-blue-500 hover:bg-white uppercase text-sm font-semibold px-4 py-2 rounded-md border-blue-500">
                    Post
                  </button>
                </form>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:p-4 rounded-md flex flex-col gap-4 max-h-screen overflow-y-scroll no-scrollbar">
              <h2 className="text-xl font-bold mb-4">Project Comments</h2>
              {comments.length === 0 && <p>No comments!</p>}
              {comments?.map((comment, index) => (
               <Comment comment={comment} key={index+1}/>
              ))}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default FullProjectPage;
