import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from '../../../Auths/api';
import Cookies from "js-cookie";

const CreateAppointment = () => {
  const navigate = useNavigate();
  const user_id = Cookies.get("userId");
  const [formData, setFormData] = useState({
    user_id: user_id,
    first_name: "",
    last_name: "",
    email: "",
    appointment_date: "",
    appointment_time: "",
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
      const response = await fetchWithAuth("post", "appointments", formData);
      if (response.status === 201) {
        navigate("/member/memberAppointment");
        toast.success("Appointment Created Successfully");
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
      <h2 className="text-2xl font-bold mb-4">Create Appointment</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-col-1 md:grid-cols-2 gap-7">
        <div>
          <label htmlFor="first_name" className="block">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="Enter first name"
            value={formData.first_name}
            onChange={handleChange}
            required
         class="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Enter last name"
            value={formData.last_name}
            onChange={handleChange}
            required
         class="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
          />
        </div>
</div>
<div className="grid grid-col-1 md:grid-cols-2 gap-7">
        <div>
          <label htmlFor="email" className="block">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
         class="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
          />
        </div>

        <div>
          <label htmlFor="appointment_date" className="block">Appointment Date:</label>
          <input
            type="date"
            id="appointment_date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            required
         class="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
          />
        </div>
</div>
        <div>
          <label htmlFor="appointment_time" className="block">Appointment Time:</label>
          <input
            type="time"
            id="appointment_time"
            name="appointment_time"
            value={formData.appointment_time}
            onChange={handleChange}
            required
         class="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
          />
        </div>

        <button type="submit" className="bg-indigo-500 text-white px-4 py-3 float-right rounded-sm hover:bg-blue-600">Create Appointment</button>
      </form>
    </div>
  );
};

export default CreateAppointment;
