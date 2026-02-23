import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../Auths/api";

const Profile = () => {
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
      <div className="flex justify-center items-center">
      <h2 className="text-2xl flex items-center font-bold mb-[2rem] pb-4 border-b-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" className="mr-3" viewBox="0 0 14 14"><path fill="currentColor" fill-rule="evenodd" d="M1.573 1.573A.25.25 0 0 1 1.75 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5A1.75 1.75 0 0 0 0 1.75v1.5a.75.75 0 0 0 1.5 0v-1.5a.25.25 0 0 1 .073-.177M14 10.75a.75.75 0 0 0-1.5 0v1.5a.25.25 0 0 1-.25.25h-1.5a.75.75 0 0 0 0 1.5h1.5A1.75 1.75 0 0 0 14 12.25zM.75 10a.75.75 0 0 1 .75.75v1.5a.25.25 0 0 0 .25.25h1.5a.75.75 0 0 1 0 1.5h-1.5A1.75 1.75 0 0 1 0 12.25v-1.5A.75.75 0 0 1 .75 10m10-10a.75.75 0 0 0 0 1.5h1.5a.25.25 0 0 1 .25.25v1.5a.75.75 0 0 0 1.5 0v-1.5A1.75 1.75 0 0 0 12.25 0zM7 7.776a4.423 4.423 0 0 0-4.145 2.879c-.112.299.127.595.446.595h7.396c.32 0 .558-.296.447-.595a4.423 4.423 0 0 0-4.145-2.879Zm2.208-3.315a2.21 2.21 0 1 1-4.421 0a2.21 2.21 0 0 1 4.421 0" clip-rule="evenodd"/></svg>
           My Profile
      </h2>
      </div>
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

        <button type="submit" className="bg-purple-500 mt-4 text-white px-4 float-right py-2 rounded-sm hover:bg-purple-600">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
