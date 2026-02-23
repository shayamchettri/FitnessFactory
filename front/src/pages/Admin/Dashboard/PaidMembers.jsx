import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../Auths/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MembershipMembers = () => {
  const [membershipMembers, setMembershipMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [filteredMembershipMembers, setFilteredMembershipMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const togglePaymentModal = (id) => {
    setSelectedMemberId(id);
    setIsPaymentOpen(!isPaymentOpen);
  };

  const navigate = useNavigate();


  useEffect(() => {
    const fetchMembershipMembers = async () => {
      try {
        const response = await fetchWithAuth("get", "paidMemberMemberships");
        setMembershipMembers(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch membership members.");
        setLoading(false);
      }
    };

    fetchMembershipMembers();
  }, []);

  useEffect(() => {
    const filterMembers = (members) => {
      return members.filter(
        (member) =>
          (member.user.name &&
            member.user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (member.user.email &&
            member.user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (member.user.phone &&
            member.user.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (member.user.memberId &&
            member.user.memberId.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    };

    const filteredResults = filterMembers(membershipMembers);
    setFilteredMembershipMembers(filteredResults);
  }, [searchQuery, membershipMembers]);

  useEffect(() => {
    setCurrentPage(1); 
  }, [searchQuery]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredMembershipMembers.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const membershipStatus = (member) => {
    const endDate = new Date(member.end_date);
    const today = new Date();
    return endDate >= today ? "Active" : "Expired";
  };
  const handleDeleteMembershipMember = async (userId) => {
    try {
      const response = await fetchWithAuth("delete", `delMemberships/${userId}`);
      if (response.status === 200) {
        setMembershipMembers(membershipMembers.filter((member) => member.id !== userId));
        setFilteredMembershipMembers(filteredMembershipMembers.filter((member) => member.id !== userId));
        toggleModal();
        toast.success("Membership member deleted successfully.");
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
      <Link
        to="/admin/CreateMembershipMember"
        className="bg-indigo-500 float-right px-5 py-2 my-6 text-white text-lg rounded-sm inline-block"
      >
        <i className="fas fa-plus"></i> Create Membership
      </Link>
      <h2 className="text-2xl font-bold mb-4">All Membership Members</h2>
      <div className="my-4 w-[35%] border flex justify-center items-center border-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.7rem"
          height="1.7rem"
          className=" ml-4 mr-2"
          viewBox="0 0 50 50"
        >
          <path
            fill="currentColor"
            d="M23 36c-7.2 0-13-5.8-13-13s5.8-13 13-13s13 5.8 13 13s-5.8 13-13 13m0-24c-6.1 0-11 4.9-11 11s4.9 11 11 11s11-4.9 11-11s-4.9-11-11-11"
          />
          <path
            fill="currentColor"
            d="m32.682 31.267l8.98 8.98l-1.414 1.414l-8.98-8.98z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search by name, email, phone, or memberId"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-none rounded-sm px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : currentUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="max-h-[700px] overflow-y-auto">
              <table className="w-full border border-gray-200 divide-y divide-gray-200">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="px-4 text-white py-2 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                      SN
                    </th>
                    <th className="px-4 text-white py-2 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                      User Name
                    </th>
                    <th className="px-4 text-white py-2 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                      Membership Name
                    </th>
                    <th className="px-4 text-white py-2 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                      Membership Price
                    </th>
                    <th className="px-4 text-white py-2 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-4 text-white py-2 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                      Pay Amount
                    </th>
                    <th className="px-4 text-white py-2 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-4 text-white py-2 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                      Due Amount
                    </th>
                    <th className="px-4 text-white py-2 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 text-white py-2 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                      Paid Status
                    </th>
                    <th className="px-4 text-white py-2 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentUsers.map((member, index) => (
                    <tr key={member.id} className="hover:bg-gray-100">
                      <td className="px-4 py-4 whitespace-nowrap text-md">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-md">
                        {member.user.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-md">
                        {member.membership.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-md">
                        {member.membership.price}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-md">
                        {formatDate(member.end_date)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-md">
                        {member.pay_amount}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-md">
                        {member.discount}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-md">
                        {member.membership.price -
                          member.pay_amount -
                          member.discount}
                      </td>
                      <td>
                        <p
                          className={`px-4 py-2 rounded-sm text-white font-semibold whitespace-nowrap text-sm ${
                            membershipStatus(member) === "Active"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {membershipStatus(member)}
                        </p>
                      </td>
                      <td>
                        <p
                          className="px-4 text-center py-2 rounded-sm text-black font-semibold whitespace-nowrap text-sm"
                          style={{
                            backgroundColor:
                              member.status === "pending" ? "yellow" : "red",
                          }}
                        >
                          {member.status}
                        </p>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap text-md text-center">
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
                            <div className="flex items-center justify-center min-h-screen bg-slate-900 opacity-50">
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
                                  <p>
                                    Are you sure you want to delete this item?
                                  </p>
                                </div>

                                <div className="mt-6 flex justify-end">
                                  <button
                                    onClick={() =>
                                      handleDeleteMembershipMember(member.id)
                                    }
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
            <div className="flex justify-center mt-4">
            {currentUsers.length > 0 && (
  <ul className="pagination flex gap-2">
    <li className="page-item">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="page-link bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Previous
      </button>
    </li>
    {Array.from({ length: Math.ceil(filteredMembershipMembers.length / usersPerPage) }, (_, i) => (
      <li key={i} className="page-item">
        <button
          onClick={() => paginate(i + 1)}
          className={`page-link ${currentPage === i + 1 ? 'bg-red-500 text-white' : 'bg-red-200 text-white'} px-4 py-2 rounded-sm`}
        >
          {i + 1}
        </button>
      </li>
    ))}
    <li className="page-item">
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === Math.ceil(filteredMembershipMembers.length / usersPerPage)}
        className="page-link bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Next
      </button>
    </li>
  </ul>
)}

            </div>
          </div>
        ) : (
          <p>No membership members found.</p>
        )}
      </div>
    </div>
  );
};

export default MembershipMembers;
