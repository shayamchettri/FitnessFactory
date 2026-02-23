import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from '../../../Auths/api';

const CreateSurvey = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: ""
  });
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWithAuth("post", "surveys", formData);
      if (response.status === 201) {
        navigate("/admin/surveys");
        toast.success("Survey Created Successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="container mx-auto px-5 xl:w-5/5 my-6">
      <h2 className="text-2xl font-bold mb-4">Create Survey</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4">
        <div>
          <label htmlFor="title" className="block">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter survey title"
            value={formData.title}
            onChange={handleChange}
            required
            class="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
          />
        </div>

        <div>
          <label htmlFor="description" className="block">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter survey description"
            value={formData.description}
            onChange={handleChange}
            class="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
          />
        </div>
        </div>
        <div>
          <label htmlFor="url" className="block">URL:</label>
          <textarea
            id="url"
            name="url"
            placeholder="Enter survey URL"
            value={formData.url}
            onChange={handleChange}
            required
            className="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
          />

        </div>
        <button type="submit" className="bg-indigo-500 float-right  text-white px-4 py-2 rounded-sm hover:bg-blue-600">Create Survey</button>
      </form>
    </div>
  );
};

export default CreateSurvey;
