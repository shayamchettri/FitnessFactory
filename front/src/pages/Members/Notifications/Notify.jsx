import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../Auths/api';

const Notify = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetchWithAuth('get', 'allNotifications');
        setNotifications(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchNotifications();
  }, []);


  return (
    <div className="px-4 py-4">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="max-h-[700px] overflow-y-auto">
            <table className="w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 text-white py-3 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">ID</th>
                  <th className="px-6 text-white py-3 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">Title</th>
                  <th className="px-6 text-white py-3 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">Description</th>
                  <th className="px-6 text-white py-3 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">Announcement Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {notifications.map((notification, index) => (
                  <tr key={notification.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{notification.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{notification.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{notification.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{notification.announcementDate}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notify;
