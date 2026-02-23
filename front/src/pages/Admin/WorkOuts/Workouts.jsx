import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../Auths/api";
import { Link } from "react-router-dom";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [workoutsPerPage] = useState(8);

  const URL = "http://localhost:5000/";

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetchWithAuth("get", "workouts");
        setWorkouts(response.data);
        setFilteredWorkouts(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWorkouts();
  }, []);

  useEffect(() => {
    const filteredResults = workouts.filter(
      (workout) =>
        (workout.title &&
          workout.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (workout.description &&
          workout.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredWorkouts(filteredResults);
  }, [searchQuery, workouts]);

  const handleDeleteWorkout = async (workoutId) => {
    try {
      await fetchWithAuth("delete", `deleteWorkout/${workoutId}`);
      setWorkouts(workouts.filter((workout) => workout.id !== workoutId));
      setFilteredWorkouts(filteredWorkouts.filter((workout) => workout.id !== workoutId));
      toggleModal();
    } catch (error) {
      setError(error.message);
    }
  };

  const indexOfLastWorkout = currentPage * workoutsPerPage;
  const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;
  const currentWorkouts = filteredWorkouts.slice(indexOfFirstWorkout, indexOfLastWorkout);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-4 py-4">
      <h2 className="text-2xl flex items-center font-bold mb-[2rem]">
      <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" className="mr-2" 
            viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" d="M9 6a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3zm23 10h-3v16h3zm2 3h3v4h1v2h-1v4h-3zM16 32h3V16h-3zm-2-3h-3v-4h-1v-2h1v-4h3zm7-4h6v-2h-6z" clip-rule="evenodd"/></svg>
        All Workouts
      </h2>
      <div className="float-right">
        <Link
          to="/admin/createworkout"
          className="bg-gradient-to-br from-purple-500 to-indigo-500 hover:bg-slate-600 text-white px-7 py-2 rounded-sm text-md transition duration-300 ease-in-out flex items-center"
        >
          <i className="fa-solid fa-plus mr-2"></i> Create Workout
        </Link>
      </div>
      <div className="my-4 w-[40%] border flex justify-center items-center border-gray-300">
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
          placeholder="Search by title or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-none rounded-sm px-3 py-3 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="">
        <hr className="my-4" />
        {error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : currentWorkouts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-4 text-white py-3 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                    SN
                  </th>
                  <th className="px-4 text-white py-3 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                    WorkOut Image
                  </th>
                  <th className="px-4 text-white py-3 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 text-white py-3 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 text-white py-3 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentWorkouts.map((workout, index) => (
                  <tr
                    key={workout.id}
                    className={index % 2 === 0 ? "bg-purple-50" : "bg-white"}
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-md text-center">
                      {(currentPage - 1) * workoutsPerPage + index + 1}
                    </td>
                    <td className="flex items-center justify-center">
                      <img
                        src={`${URL}${workout.workout_image}`}
                        alt="Member Image"
                        className="w-[80px]  h-[80px] mt-4 object-cover object-fit transition-opacity duration-300 rounded-full mb-4"
                        title={workout.name}
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-md text-center">
                      {workout.title}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-md text-center">
                      {workout.description}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-md mt-6 text-center grid grid-cols-2 gap-4">
                      <button
                        onClick={toggleModal}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-sm transition duration-300 ease-in-out flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
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
                                      fillRule="evenodd"
                                      d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814l3.468-3.469l3.468 3.469a.575.575 0 0 0 .814-.814L8.313 7.5l3.469-3.469c.225-.225.225-.587 0-.812z"
                                      clipRule="evenodd"
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
                                  onClick={() => handleDeleteWorkout(workout.id)}
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
            <div className="flex justify-center py-4">
              <ul className="pagination flex gap-2">
                <li className="page-item">
                  <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="page-link bg-red-500 text-white px-4 py-2 rounded-md">
                    Previous
                  </button>
                </li>
                {Array.from({ length: Math.ceil(filteredWorkouts.length / workoutsPerPage) }, (_, i) => (
                  <li key={i} className="page-item">
                    <button onClick={() => paginate(i + 1)} className={`page-link ${currentPage === i + 1 ? 'bg-red-500 text-white' : 'bg-red-200 text-white'} px-4 py-2 rounded-sm`}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className="page-item">
                  <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredWorkouts.length / workoutsPerPage)} className="page-link bg-red-500 text-white px-4 py-2 rounded-md">
                    Next
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-center">No workouts found.</p>
        )}
      </div>
    </div>
  );
};

export default Workouts;
