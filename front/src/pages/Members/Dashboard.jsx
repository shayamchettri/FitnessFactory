import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { fetchWithAuth } from '../../Auths/api';
import Cookies from 'js-cookie'; 

function DashboardMember() {
  const [allNotifications, setAllNotifications] = useState(0);
  const [survey, setSurvey] = useState(0);
  const [memberMemberships, setMemberMemberships] = useState([]);
  const [error, setError] = useState(null);
  const user_id = Cookies.get('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersCountResponse = await fetchWithAuth("get", "allNotifications");
        setAllNotifications(usersCountResponse.data.length);

        const membershipsResponse = await fetchWithAuth("get", `memberMembership/${user_id}/memberships`);
        const memberships = membershipsResponse.data;
        setMemberMemberships(memberships);

        const surveyResponse = await fetchWithAuth("get", "survey");
        setSurvey(surveyResponse.data.length);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);
  const calculateRemainingDays = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const latestSubscription = memberMemberships.length > 0 ? memberMemberships[0] : null;
  const remainingDays = latestSubscription ? calculateRemainingDays(latestSubscription.end_date) : null;


  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 mx-4">
      <Link to="/member/notify" className="border-2 shadow-sm p-4 rounded-md">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-[.9rem] xl:text-[1rem] font-semibold">Total Notifications</h2>
            <p className="text-[3rem] font-semibold">{allNotifications}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="text-red-500" width="4rem" height="4rem" viewBox="0 0 32 32">
            <path fill="#7c7f3d" d="M27.5 5.5h-9.3l-2.1 4.2H4.4v16.8h25.2v-21Zm0 4.2h-8.2l1.1-2.1h7.1Z"/><path fill="#eaea28" d="M26.893 25.147H14.352c0-1.771-.005-3.537.018-5.3a6.083 6.083 0 0 1 3.13-5.491a14.624 14.624 0 0 1 1.715-.743a1.648 1.648 0 0 1-.168-1.454a2.246 2.246 0 0 1 .612-.831a1.587 1.587 0 0 1 1.926 0c.692.5.822 1.168.451 2.291l1.976.827a4.6 4.6 0 0 0 2.883 7.8Zm-13.09.844a.78.78 0 0 0-.881.6a9.553 9.553 0 0 0-.2 1.66c-.03.584.089.677.686.677c1.407 0 2.814.01 4.221-.008c.354 0 .538.066.664.444A2.408 2.408 0 0 0 20.658 31a2.435 2.435 0 0 0 2.293-1.685a.474.474 0 0 1 .536-.4h.019c1.463.019 2.927 0 4.39.008c.272 0 .57-.039.593-.344a3.421 3.421 0 0 0-.274-2.141a.812.812 0 0 0-.779-.448c-2.279.021-4.558.01-6.837.01s-4.531.02-6.8-.009ZM27.264 13.98a3.713 3.713 0 1 0 .048 0Zm-14.585 4.231c0-.042-.259-4.161 4.619-5.887l-.225-.639a7.3 7.3 0 0 0-4.562 3.991a6.035 6.035 0 0 0-.5 2.587Z"/><path fill="#fff" d="M26.585 19.651a.68.68 0 1 1 .684.693a.661.661 0 0 1-.684-.637a.523.523 0 0 1 0-.056m.25-1.074l-.175-3.451h1.209l-.169 3.451Z"/></svg>
        </div>
      </Link>

      <Link to="/member/survey" className="border-2 shadow-sm p-4 rounded-md">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-[.9rem] xl:text-[1rem] font-semibold">Total Surveys</h2>
            <p className="text-[2.5rem] font-semibold mt-2">{survey}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="text-green-500" width="4rem" height="4rem"
           viewBox="0 0 128 128"><path fill="#f44336" d="m31.9 88.1l1.8-80c.1-2.2-1.8-4.1-4-4.1H18c-2.3 0-4.1 1.9-4 4.1l1.8 80c.1 2.2 1.8 3.9 4 3.9h8c2.2 0 4-1.7 4.1-3.9"/><circle cx="78" cy="112" r="12" fill="#c33"/><circle cx="76.3" cy="112" r="10.3" fill="#f44336"/><g fill="#fff"><path d="M26.1 50c.3-1.9-.5-26.2-.5-26.2s.1-3.5-2.8-3.8c-2.8-.3-3.8 2.3-3.8 4.1c0 1.8.4 21.5.6 23.3c.1 1.8 1.9 3.7 3.6 4.2s2.7-.2 2.9-1.6" opacity="0.2"/><circle cx="21.7" cy="13.4" r="3.3" opacity="0.2"/></g><circle cx="26.2" cy="112" r="12" fill="#c33"/><circle cx="24.5" cy="112" r="10.3" fill="#f44336"/><path fill="#fff" d="M18.6 108.4c1.2-1.8 3.8-3.3 6.5-3.7c.7-.1 1.3-.1 1.9.1c.4.2.8.6.5 1c-.2.4-.7.5-1.1.6c-2.5.7-4.8 2.4-6.2 4.4c-.5.8-1.4 2.9-2.4 2.4c-1-.7-.7-2.6.8-4.8m51.9 0c1.2-1.8 3.8-3.3 6.5-3.7c.7-.1 1.3-.1 1.9.1c.4.2.8.6.5 1c-.2.4-.7.5-1.1.6c-2.5.7-4.8 2.4-6.2 4.4c-.5.8-1.4 2.9-2.4 2.4c-1-.7-.7-2.6.8-4.8" opacity="0.2"/><path fill="#c33" d="M61.6 24.3c-2.1 2-3.4 4.4-4 7.4c-.3 1.9-2 3.2-3.9 3.2h6.9c1.9 0 3.6-1.3 3.9-3.2c.5-3 1.9-5.4 4-7.4c2.1-1.9 4.7-3.1 7.8-3.6c-1.1-.2-2.3-.3-3.5-.3c-4.7.1-8.4 1.4-11.2 3.9"/><path fill="#c33" d="M104.9 12.2C98.9 6.7 90.4 4 79.6 4c-1.2 0-2.3 0-3.4.1c9.1.5 16.4 3.2 21.8 8.1c6.1 5.5 9.1 13.2 9.1 23c0 8.8-4.1 17.4-12.2 25.9l-9.8 9.6l-.3.3c-2.9 3.4-4.6 8-5.2 13.9c-.2 2-1.9 3.6-4 3.6h6.9c2 0 3.8-1.6 4-3.6c.5-5.9 2.3-10.5 5.2-13.9l.3-.3l9.8-9.6C109.9 52.6 114 44 114 35.2c0-9.8-3-17.5-9.1-23"/><path fill="#f44336" d="M79.6 85c.5-5.9 2.3-10.5 5.2-13.9l.3-.3l9.8-9.6c8.2-8.5 12.2-17.1 12.2-25.9c0-9.8-3-17.5-9.1-23c-5.4-4.9-12.6-7.6-21.8-8.1c-8.9.5-16.2 3.2-21.8 8.1C49 17 45.9 23 44.9 30.5c-.3 2.4 1.6 4.4 4 4.4h4.8c1.9 0 3.6-1.3 3.9-3.2c.5-3 1.9-5.4 4-7.4c2.8-2.6 6.6-3.9 11.2-3.9c1.2 0 2.4.1 3.5.3c1.1-.2 2.2-.3 3.4-.3c4.8 0 8.5 1.3 11 4s3.8 6.5 3.8 11.5c0 3.8-1.1 7.4-3.2 10.6c-1.4 2.2-4.7 5.8-10 10.9c-5.2 5.1-8.8 9.8-10.5 14c-1.4 3.4-2.3 7.7-2.5 12.9c-.1 2.3 1.7 4.2 4 4.2h3.5c1.9.1 3.6-1.5 3.8-3.5"/><path fill="#fff" d="M55.1 15.9c3.4-4.2 9.9-7.2 16.4-7.6c1.6-.1 3.2 0 4.5.7c1 .5 1.7 1.6 1 2.6c-.6.8-1.8 1.1-2.8 1.3c-6.1 1.2-12 4.7-15.9 9.3c-1.5 1.8-4 6.8-6.2 5.2c-2.4-1.9-1.3-6.4 3-11.5" opacity="0.2"/><path fill="#c33" d="M34 4h-4.3c2.3 0 4.1 1.9 4 4.1l-1.8 80c-.1 2.2-1.8 3.9-4 3.9h4.3c2.2 0 4-1.7 4-3.9l1.8-80c.1-2.2-1.8-4.1-4-4.1"/></svg>
        </div>
      </Link>
      <Link to="/member/membershipHistory" className="border-2 shadow-sm p-4 rounded-md">
<div className="flex justify-between items-center">
  <div>
    <h2 className="text-[.9rem] xl:text-[1rem] font-semibold">Your Membership will expire after:</h2>
    <p className="text-[2.5rem] font-semibold mt-2">{remainingDays} Days</p>
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" className="text-green-500" width="4rem" height="4rem"
   viewBox="0 0 24 24"><path fill="currentColor" d="M4.615 3h14.77q.69 0 1.152.463T21 4.615v9.77q0 .69-.462 1.153T19.385 16h-4.462v2.952q0 .46-.379.699t-.782.028l-1.408-.685q-.162-.086-.354-.086t-.354.086l-1.408.685q-.403.211-.782-.028q-.38-.24-.38-.7V16h-4.46q-.691 0-1.153-.462T3 14.385v-9.77q0-.69.463-1.152T4.615 3M4 12.577h16v-2.154H4z"/></svg>
</div>
</Link>
</div>
  );
}

export default DashboardMember;
