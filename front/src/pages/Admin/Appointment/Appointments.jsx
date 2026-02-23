import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../Auths/api';
import { Link } from "react-router-dom";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetchWithAuth('get', 'appointments');
        setAppointments(response.data); 
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAppointments();
  }, []);

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await fetchWithAuth('delete', `appointments/${appointmentId}`);
      setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
      toggleModal();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="px-4 py-4">
      <h2 className="text-md font-bold flex items-center mb-4"> 
      <svg xmlns="http://www.w3.org/2000/svg" width="1.54em" height="1.5rem"  className="mr-2" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M12 2h1.5A1.5 1.5 0 0 1 15 3.5v10a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 0 13.5v-10A1.5 1.5 0 0 1 1.5 2H3V0h1v2h7V0h1zM6 8H3V7h3zm6-1H9v1h3zm-6 4H3v-1h3zm3 0h3v-1H9z" clip-rule="evenodd"/></svg> All Appointments</h2>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="max-h-[700px] overflow-y-auto">
            <table className="w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">ID</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">First Name</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Last Name</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Email</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Appointment Date</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Appointment Time</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment, index) => (
                  <tr key={appointment.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{appointment.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{appointment.first_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{appointment.last_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{appointment.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{appointment.appointment_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{appointment.appointment_time}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={toggleModal}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-sm transition duration-300 ease-in-out flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.2em"
                        height="1.2em"
                        viewBox="0 0 2048 2048"
                      >
                        <path
                          fill="currentColor"
                          d="M1792 384h-128v1472q0 40-15 75t-41 61t-61 41t-75 15H448q-40 0-75-15t-61-41t-41-61t-15-75V384H128V256h512V128q0-27 10-50t27-40t41-28t50-10h384q27 0 50 10t40 27t28 41t10 50v128h512zM768 256h384V128H768zm768 128H384v1472q0 26 19 45t45 19h1024q26 0 45-19t19-45zM768 1664H640V640h128zm256 0H896V640h128zm256 0h-128V640h128z"
                        />
                      </svg>
                    </button>
                  </td>
                  <td>
                    {isOpen && (
                      <div className="fixed z-10 inset-0 overflow-y-auto ">
                        <div className="flex items-center justify-center min-h-screen bg-slate-900 opacity-40">
                          <div className="relative bg-white  p-12 rounded-md max-w-lg mx-auto">
                            <div className="flex justify-between items-center">
                              <h2 className="text-lg font-semibold">
                                Delete Confirmation
                              </h2>
                              <button
                                onClick={toggleModal}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none relative top-[-15px]"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1.2rem"
                                  height="1.2rem"
                                  viewBox="0 0 15 15"
                                >
                                  <path
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                    d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="mt-4">
                              <p>Are you sure you want to delete this item?</p>
                            </div>

                            <div className="mt-6 flex justify-end">
                              <button
                   onClick={() => handleDeleteAppointment(appointment.id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none"
                              >
                                Delete
                              </button>
                              <button
                                onClick={toggleModal}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
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

export default Appointments;
