import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from '../../../Auths/api';

const CreateNotification = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    announcementDate: "",
    // Add more fields as needed
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
      const response = await fetchWithAuth("post", "notifications", formData);
      if (response.status === 201) {
        navigate("/admin/notifications");
        toast.success("Notification Created Successfully");
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
      <h2 className="text-2xl font-bold mb-4">Create Notification</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-col-1 md:grid-cols-2 gap-7">
        <div>
          <label htmlFor="title" className="block">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter notification title"
            value={formData.title}
            onChange={handleChange}
            required
            class="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
          />
        </div>
        <div>
          <label htmlFor="announcementDate" className="block">Announcement Date:</label>
          <input
            type="date"
            id="announcementDate"
            name="announcementDate"
            value={formData.announcementDate}
            onChange={handleChange}
            class="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
          />
        </div>
</div>
<div>
          <label htmlFor="description" className="block">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter notification description"
            value={formData.description}
            onChange={handleChange}
            class="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
          />
        </div>

        <button type="submit" className="bg-indigo-500 text-white px-4 py-3 float-right rounded-sm hover:bg-blue-600">Create Notification</button>
      </form>
    </div>
  );
};

export default CreateNotification;
