import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../Auths/api";
import { Link } from "react-router-dom";

function Contact() {
  const [contacts, setcontacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetchWithAuth("get", "contacts");
        setcontacts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch contact list.");
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleDeleteContact = async (contactId) => {
    try {
      await fetchWithAuth("delete", `contacts/${contactId}`);
      setcontacts(contacts.filter((contact) => contact.id !== contactId));
      toggleModal();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="px-4 py-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.54em" height="1.5rem" className="mr-2"  viewBox="0 0 24 24"><path fill="currentColor" d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2M8 6c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3m6 12H2v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1zm3.85-4h1.39c.16 0 .3.07.4.2l1.1 1.45c.15.2.13.48-.05.65l-1.36 1.36c-.18.18-.48.2-.67.04a7.557 7.557 0 0 1-2.38-3.71a7.248 7.248 0 0 1 0-3.99a7.513 7.513 0 0 1 2.38-3.71c.2-.17.49-.14.67.04l1.36 1.36c.18.18.2.46.05.65l-1.1 1.45a.48.48 0 0 1-.4.2h-1.39c-.22.63-.35 1.3-.35 2s.13 1.38.35 2.01"/></svg>
      All Enquires</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-slate-800">
              <tr>
                <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">
                  First Name
                </th>
                <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">
                  Last Name
                </th>
                <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-md text-center">
                    {contact.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md text-center">
                    {contact.firstName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md text-center">
                    {contact.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md text-center">
                    {contact.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md text-center">
                    {contact.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md text-center">
                    {contact.description}
                  </td>
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
                        <div className="flex items-center justify-center min-h-screen bg-slate-900 opacity-80">
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
                                onClick={() => handleDeleteContact(contact.id)}
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
      )}
    </div>
  );
}

export default Contact;
