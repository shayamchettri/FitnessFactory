import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../Auths/api";

const EditUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confPassword: "",
    phone: "",
    memberId: "",
    date_of_birth: "",
    join_date: "",
    image: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const URL = "http://localhost:5000/";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchWithAuth("get", `getUser/${id}`);
        const userData = response.data.user; 
        setUserData(userData);
        setFormData({
          ...userData, 
          password: "", 
          confPassword: "",
        });
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, 
    });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confPassword) {
      setErrors({ ...errors, confPassword: "Passwords do not match" });
      return;
    }
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const response = await fetchWithAuth("put", `updateUser/${id}`, formDataToSend); // Send PATCH request to update user
      if (response.status === 200) {
        navigate("/admin/users");
        toast.success("User Updated Successfully");
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
      <h2 className="text-2xl flex items-center font-bold mb-[2rem] pb-4 border-b-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" className='mr-3' viewBox="0 0 640 512">
          <path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m32 32h-64c-17.6 0-33.5 7.1-45.1 18.6c40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64m-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32S208 82.1 208 144s50.1 112 112 112m76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2m-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4"/></svg> Edit User
      </h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="flex items-center justify-center">
      {userData && (
    <img
    src={`${URL}${userData.image}`}
    alt="Service Image"
    className="w-[180px] h-[180px] mt-4 object-cover object-fit transition-opacity duration-300 rounded-full mb-4"
      style={{ maxWidth: "200px" }}
    />
  )}
  </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <div>
            <label htmlFor="name" className="block">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter user name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
            />
          </div>
          <div>
            <label htmlFor="email" className="block">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter user email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <div>
            <label htmlFor="phone" className="block">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
            />
          </div>
          <div>
            <label htmlFor="memberId" className="block">Member ID:</label>
            <input
              type="number"
              id="memberId"
              name="memberId"
              placeholder="Enter member ID"
              value={formData.memberId}
              onChange={handleChange}
              className="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <div>
            <label htmlFor="date_of_birth" className="block">Date of Birth:</label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
            />
          </div>
          <div>
            <label htmlFor="join_date" className="block">Join Date:</label>
            <input
              type="date"
              id="join_date"
              name="join_date"
              value={formData.join_date}
              onChange={handleChange}
              className="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block mb-2">Image:</label>
  <input
    type="file"
    name="image"
    onChange={handleChange}
    className="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
  />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <div>
            <label htmlFor="password" className="block">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
            />
          </div>
          <div>
            <label htmlFor="confPassword" className="block">Confirm Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="confPassword" 
              name="confPassword"
              placeholder="Confirm your password"
              value={formData.confPassword}
              onChange={handleChange}
              className="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
            />
            {errors.confPassword && <p className="text-red-500">{errors.confPassword}</p>}
          </div>
        </div>

        <button type="submit" className="bg-purple-500 mt-4 text-white px-4 float-right py-2 rounded-sm hover:bg-purple-600">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
