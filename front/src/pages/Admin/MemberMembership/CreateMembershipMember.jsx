import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../Auths/api';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateMembershipMember = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: '',
    membership_id: '',
    start_date: '',
    pay_amount: '',
  });
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [memberships, setMemberships] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWithAuth('post', 'createMemberMemberships', formData);
      if (response.status === 201) {
        navigate("/admin/MembershipMembers");
        toast.success("Membership Created Successfully");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetchWithAuth('get', 'users');
        const membershipsResponse = await fetchWithAuth('get', 'memberships');
        setUsers(usersResponse.data);
        setMemberships(membershipsResponse.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-4 py-4">
      <h2 className="text-2xl font-bold mb-4">Assign Membership</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-col-1 md:grid-cols-2 gap-7">
        <div>
          <label htmlFor="user_id" className="block">User:</label>
          <select
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            required
         class="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="membership_id" className="block">Membership:</label>
          <select
            id="membership_id"
            name="membership_id"
            value={formData.membership_id}
            onChange={handleChange}
            required
         class="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
          >
            <option value="">Select Membership</option>
            {memberships.map(membership => (
              <option key={membership.id} value={membership.id}>{membership.name}</option>
            ))}
          </select>
        </div>
        </div>
      <div className="grid grid-col-1 md:grid-cols-2 gap-7 ">
        <div>
          <label htmlFor="start_date" className="block">Start Date:</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
         class="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
          />
        </div>
        <div>
          <label htmlFor="pay_amount" className="block">Pay Amount:</label>
          <input
            type="number"
            id="pay_amount"
            name="pay_amount"
            value={formData.pay_amount}
            onChange={handleChange}
            required
         class="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
          />
        </div>
        </div>
        <button type="submit" className="bg-indigo-500 text-white px-4 py-3 float-right rounded-sm hover:bg-indigo-600">Assign Membership</button>
      </form>
    </div>
  );
};

export default CreateMembershipMember;
