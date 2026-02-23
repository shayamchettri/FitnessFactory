import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../Auths/api';
import { Link } from "react-router-dom";

const Survey = () => {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetchWithAuth('get', 'survey');
        setSurveys(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div className="px-4 py-4">
      <h2 className="text-2xl font-bold mb-4">Surveys</h2>
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
                  <th className="px-6 text-white py-3 text-[.7rem] xl:text-[.9rem] font-semibold uppercase tracking-wider">URL</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {surveys.map((survey, index) => (
                  <tr key={survey.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{index+1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{survey.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{survey.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-blue-500 text-center">
  <a href={survey.url}>{survey.url}</a>
</td>
                    {/* Add actions button */}
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

export default Survey;
