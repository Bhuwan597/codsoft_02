import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import Select from "react-select";
import Categories from "../data/categories.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserState } from "../contexts/userContextProvider";
const Project = () => {
  const navigate = useNavigate();
  const {user} = UserState();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    category: "",
    members: [],
  });
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.label });
  };
  const handleAssignTo = (selectedOptions) => {
    const userArray = selectedOptions.map((option) => option.value);
    userArray.push(user._id);
    setFormData({ ...formData, members: userArray });
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
      const { data } = await axios.post(
        "/api/projects/create",
        formData,
        options
      );
      if (data.success) {
        navigate(`/${data.data.slug}`);
      } else {
        alert("Some Error Occured!");
      }
    } catch (error) {
      alert(error.message);
    }
  };
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
      const userList = [];
      if (data) {
        data?.map((user,index) => {
          userList[index] = {
            label: user.fullName,
            value: user._id
          }
        });
        setUsers(userList)
      }
    } catch (error) {
      setUsers([])
      console.log(error.message);
    }
  };
  return (
    <DashboardLayout>
      <form
        onSubmit={handleSubmit}
        className="w-full p-4 max-h-screen overflow-y-scroll no-scrollbar"
      >
        <h1 className="text-xl font-bold my-4">Create a new Project</h1>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
            Project Name
          </label>
          <input
            required
            value={formData.title}
            onChange={handleOnChange}
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            placeholder="Project Title. . . . "
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="description"
          >
            Project Details
          </label>
          <textarea
            required
            value={formData.description}
            onChange={handleOnChange}
            class="shadow appearance-none border rounded w-full h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            name="description"
            placeholder="Project Details. . . . "
          ></textarea>
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="deadline"
          >
            Due Date
          </label>
          <input
            required
            value={formData.deadline}
            onChange={handleOnChange}
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="deadline"
            name="deadline"
            type="date"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="dueDate"
          >
            Category
          </label>
          <Select
            required
            onChange={handleCategoryChange}
            options={Categories}
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="dueDate"
          >
            Assign to
          </label>
          <Select required onChange={handleAssignTo} isMulti options={users} />
        </div>
        <button className="text-white border mt-4 mb-20 bg-blue-500 hover:text-blue-500 hover:bg-white uppercase text-sm font-semibold px-4 py-2 rounded-md border-blue-500">
          Add
        </button>
      </form>
    </DashboardLayout>
  );
};

export default Project;
