import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from '../../../Auths/api';

const CreateMembership = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    image: null,
  });
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const response = await fetchWithAuth("post", "createMembership", formDataToSend);
      if (response.status === 201) {
        navigate("/admin/memberships");
        toast.success("Membership Created Successfully");
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
      <h2 className="text-2xl font-bold mb-4">Create Membership</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-col-1 md:grid-cols-2 gap-7 ">
        <div>
          <label htmlFor="name" className="block">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter membership name"
            value={formData.name}
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
            placeholder="Enter membership description"
            value={formData.description}
            onChange={handleChange}
            class="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
          />
        </div>
</div>
<div className="grid grid-col-1 md:grid-cols-2 gap-7 ">
        <div>
          <label htmlFor="duration" className="block">Duration:</label>
          <input
            type="number"
            id="duration"
            name="duration"
            placeholder="Enter membership duration"
            value={formData.duration}
            onChange={handleChange}
            class="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
          />
        </div>

        <div>
          <label htmlFor="price" className="block">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Enter membership price"
            value={formData.price}
            onChange={handleChange}
            class="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
          />
        </div>
</div>
        <div className="mb-4">
          <label htmlFor="image" className="block mb-2">Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            class="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
          />
        </div>

        <button type="submit" className="bg-indigo-500 text-white float-right px-4 py-3 rounded-sm hover:bg-indigo-600">Create Membership</button>
      </form>
    </div>
  );
};

export default CreateMembership;
