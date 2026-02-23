import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchWithAuth } from "../../Auths/api";

const ShowWorkout = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetchWithAuth("get", `getWorkout/${id}`);
        setWorkout(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWorkout();
  }, [id]);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!workout) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="px-4 py-4">
              <div className="float-right">
        <Link
          to="/member/userWorkouts"
          className="bg-gradient-to-br from-purple-500 to-indigo-500 hover:bg-slate-600 text-white px-7 py-2 rounded-sm text-md transition duration-300 ease-in-out flex items-center"
        >
   <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="1em" height="1em" viewBox="0 0 48 48"><path fill="currentColor" d="M13.81 6.81a1.5 1.5 0 0 0-2.12-2.12l-7.5 7.5a1.5 1.5 0 0 0 0 2.12l7.5 7.5a1.5 1.5 0 0 0 2.12-2.12l-4.939-4.94H26.5c7.042 0 12.75 5.708 12.75 12.75S33.542 40.25 26.5 40.25S13.75 34.542 13.75 27.5a1.5 1.5 0 0 0-3 0c0 8.699 7.052 15.75 15.75 15.75s15.75-7.051 15.75-15.75s-7.051-15.75-15.75-15.75H8.871z"/></svg>
    Go back
        </Link>
      </div>
        <div className="">
      <h2 className="text-2xl text-center font-bold mb-4">{workout.title}</h2>
      <div className="flex items-center justify-center m-4">
      <img
        src={`http://localhost:5000/${workout.workout_image}`}
        alt="Workout Image"
        className="w-[90%] h-auto mb-4"
      />
      </div>
      <p className="text-lg text-center mb-2">{workout.description}</p>
      </div>
    </div>
  );
};

export default ShowWorkout;
