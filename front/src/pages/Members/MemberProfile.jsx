import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../Auths/api";

const MemberProfile = () => {
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
        const response = await fetchWithAuth("get", `getMember/${id}`);
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
      const response = await fetchWithAuth("put", `updateMember/${id}`, formDataToSend); // Send PATCH request to update user
      if (response.status === 200) {
        navigate("/member");
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
              readOnly
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
              readOnly
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
              readOnly
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
              readOnly
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
              readOnly
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
              readOnly
              value={formData.join_date}
              onChange={handleChange}
              className="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
            />
          </div>
        </div>
        <p className="text-red-500 my-4">Note: you Can change data below from here</p>
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

        <button type="submit" className="bg-purple-500 mt-4 flex items-center text-white px-4 float-right py-2 rounded-sm hover:bg-purple-600"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><path fill="currentColor" d="M19.5 28.1h-2.9c-.5 0-.9-.3-1-.8l-.5-1.8l-.4-.2l-1.6.9c-.4.2-.9.2-1.2-.2l-2.1-2.1c-.3-.3-.4-.8-.2-1.2l.9-1.6l-.2-.4l-1.8-.5c-.4-.1-.8-.5-.8-1v-2.9c0-.5.3-.9.8-1l1.8-.5l.2-.4l-.9-1.6c-.2-.4-.2-.9.2-1.2l2.1-2.1c.3-.3.8-.4 1.2-.2l1.6.9l.4-.2l.5-1.8c.1-.4.5-.8 1-.8h2.9c.5 0 .9.3 1 .8L21 10l.4.2l1.6-.9c.4-.2.9-.2 1.2.2l2.1 2.1c.3.3.4.8.2 1.2l-.9 1.6l.2.4l1.8.5c.4.1.8.5.8 1v2.9c0 .5-.3.9-.8 1l-1.8.5l-.2.4l.9 1.6c.2.4.2.9-.2 1.2L24.2 26c-.3.3-.8.4-1.2.2l-1.6-.9l-.4.2l-.5 1.8c-.2.5-.6.8-1 .8m-2.2-2h1.4l.5-2.1l.5-.2c.4-.1.7-.3 1.1-.4l.5-.3l1.9 1.1l1-1l-1.1-1.9l.3-.5c.2-.3.3-.7.4-1.1l.2-.5l2.1-.5v-1.4l-2.1-.5l-.2-.5c-.1-.4-.3-.7-.4-1.1l-.3-.5l1.1-1.9l-1-1l-1.9 1.1l-.5-.3c-.3-.2-.7-.3-1.1-.4l-.5-.2l-.5-2.1h-1.4l-.5 2.1l-.5.2c-.4.1-.7.3-1.1.4l-.5.3l-1.9-1.1l-1 1l1.1 1.9l-.3.5c-.2.3-.3.7-.4 1.1l-.2.5l-2.1.5v1.4l2.1.5l.2.5c.1.4.3.7.4 1.1l.3.5l-1.1 1.9l1 1l1.9-1.1l.5.3c.3.2.7.3 1.1.4l.5.2zm9.8-6.6"/><path fill="currentColor" d="M18 22.3c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3s4.3 1.9 4.3 4.3s-1.9 4.3-4.3 4.3m0-6.6c-1.3 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3c1.3 0 2.3-1 2.3-2.3s-1-2.3-2.3-2.3"/><path fill="currentColor" d="M18 2c-.6 0-1 .4-1 1s.4 1 1 1c7.7 0 14 6.3 14 14s-6.3 14-14 14S4 25.7 4 18c0-2.8.8-5.5 2.4-7.8v1.2c0 .6.4 1 1 1s1-.4 1-1v-5h-5c-.6 0-1 .4-1 1s.4 1 1 1h1.8C3.1 11.1 2 14.5 2 18c0 8.8 7.2 16 16 16s16-7.2 16-16S26.8 2 18 2"/><path fill="none" d="M0 0h36v36H0z"/></svg> Update Profile</button>
      </form>
    </div>
  );
};

export default MemberProfile;
