import React, { useState, useEffect } from "react";
import { fetchWithAuth } from '../../Auths/api';
import Cookies from 'js-cookie'; // Importing the 'js-cookie' library

function MembershipHistory() {
  const [memberMemberships, setMemberMemberships] = useState([]);
  const [error, setError] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const user_id = Cookies.get('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const membershipsResponse = await fetchWithAuth("get", `memberMembership/${user_id}/memberships`);
        const memberships = membershipsResponse.data;

        setMemberMemberships(memberships);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const calculateRemainingTime = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;

    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const latestSubscription = memberMemberships.length > 0 ? memberMemberships[0] : null;
      if (latestSubscription) {
        const remaining = calculateRemainingTime(latestSubscription.end_date);
        setRemainingTime(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [memberMemberships]);

  const isSubscriptionOverdue = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    return end < today;
  };

  return (
    <div className="container mx-auto">
      <div className="my-8">
        {remainingTime !== null && (
          <div className="bg-gray-200 p-4 rounded-md mb-4">
            <h2 className="text-lg font-semibold">Your Subcription will expire On:</h2>
            <p className="text-red-500 font-semibold text-xl">
              {remainingTime.days} days, {remainingTime.hours} hours, {remainingTime.minutes} minutes, {remainingTime.seconds} seconds
            </p>
          </div>
        )}
        {error && <div className="text-red-500">Error: {error}</div>}
        <h2 className="text-xl font-semibold mb-4">Membership History</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border text-center">Membership Name</th>
              <th className="py-2 px-4 border text-center">Amount Paid</th>
              <th className="py-2 px-4 border text-center">Discount</th>
              <th className="py-2 px-4 border text-center">Start Date</th>
              <th className="py-2 px-4 border text-center">End Date</th>
              <th className="py-2 px-4 border text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {memberMemberships.map((membership, index) => (
              <tr key={index} className="border">
                <td className="py-2 px-4 border text-center">{membership.membership.name}</td>
                <td className="py-2 px-4 border text-center">{membership.pay_amount}</td>
                <td className="py-2 px-4 border text-center">{membership.discount}</td>
                <td className="py-2 px-4 border text-center">{new Date(membership.start_date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border text-center">{new Date(membership.end_date).toLocaleDateString()}</td>
                <td className={`py-2 px-4 border text-center ${isSubscriptionOverdue(membership.end_date) ? 'text-red-500' : 'text-green-500'}`}>
                  {isSubscriptionOverdue(membership.end_date) ? 'Expired' : 'Active'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MembershipHistory;
