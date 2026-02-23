import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../Auths/api";
import { Link } from "react-router-dom";

const UserWorkouts = () => {
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
        const response = await fetchWithAuth("get", "userWorkouts");
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

  const indexOfLastWorkout = currentPage * workoutsPerPage;
  const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;
  const currentWorkouts = filteredWorkouts.slice(
    indexOfFirstWorkout,
    indexOfLastWorkout
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-4 py-4">
      <h2 className="text-2xl flex items-center font-bold mb-[2rem]">
      <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" className="mr-2" 
            viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" d="M9 6a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3zm23 10h-3v16h3zm2 3h3v4h1v2h-1v4h-3zM16 32h3V16h-3zm-2-3h-3v-4h-1v-2h1v-4h3zm7-4h6v-2h-6z" clip-rule="evenodd"/></svg>
        All Workouts
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {currentWorkouts.length > 0 ? (
          currentWorkouts.map((workout, index) => (
            <Link to={`/member/showWorkout/${workout.id}`} key={workout.id}>
              <div
                className={`${
                  index % 2 === 0 ? "bg-purple-50" : "bg-white"
                } p-4 cursor-pointer`}
              >
                <img
                  src={`${URL}${workout.workout_image}`}
                  alt="Workout Image"
                  className="w-full h-auto"
                />
                <h3 className="text-lg font-semibold mt-2">{workout.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {workout.description}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center">No workouts found.</p>
        )}
      </div>
    </div>
  );
};

export default UserWorkouts;
