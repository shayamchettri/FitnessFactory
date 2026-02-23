import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../Auths/api';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const MemberMemberships = () => {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const [formData, setFormData] = useState({
    user_id: user_id,
    membership_id: '',
    start_date: '',
    pay_amount: '',
    discount: '',
  });  
  const [error, setError] = useState(null);
  const [memberships, setMemberships] = useState([]);
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [dueAmount, setDueAmount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const selectedMembershipData = memberships.find(membership => membership.id === parseInt(value));
    setSelectedMembership(selectedMembershipData);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const calculateDueAmount = () => {
      if (selectedMembership && formData.discount !== '') {
        const discountedPrice = selectedMembership.price - formData.discount;
        const dueAmount = discountedPrice - formData.pay_amount;
        setDueAmount(dueAmount);
      }
    };

    calculateDueAmount();
  }, [selectedMembership, formData.discount, formData.pay_amount]);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await fetchWithAuth('get', 'memberships');
        setMemberships(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMemberships();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWithAuth('post', `createUserMemberships/${user_id}`, formData);
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

  return (
    <div className="px-4 py-4">
      <h2 className="text-2xl font-bold mb-4">Assign Membership</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <table className="w-full border border-gray-200 divide-y divide-gray-200 h-[80%]">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Membership Name</th>
              <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Price</th>
              <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Duration (Days)</th>
              <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Due Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-md text-center">{selectedMembership ? selectedMembership.name : ''}</td>
              <td className="px-6 py-4 whitespace-nowrap text-md text-center">{selectedMembership ? selectedMembership.price : ''}</td>
              <td className="px-6 py-4 whitespace-nowrap text-md text-center">{selectedMembership ? selectedMembership.duration : ''}</td>
              <td className="px-6 py-4 whitespace-nowrap text-md text-center">{dueAmount}</td>
            </tr>
          </tbody>
        </table>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label htmlFor="membership_id" className="block">Membership:</label>
            <select
              id="membership_id"
              name="membership_id"
              value={formData.membership_id}
              onChange={handleChange}
              required
              className="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
            >
              <option value="">Select Membership</option>
              {memberships.map(membership => (
                <option key={membership.id} value={membership.id}>{membership.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="start_date" className="block">Start Date:</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label htmlFor="discount" className="block">Discount Amount:</label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              required
              className="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
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
              className="border border-gray-500 focus:border rounded-sm px-6 py-3 w-full"
            />
          </div>
        </div>
        <button type="submit" className="bg-purple-500 mt-4 text-white px-4 float-right py-2 rounded-sm hover:bg-purple-600">Submit</button>
      </form>
    </div>
  );
};

export default MemberMemberships;
