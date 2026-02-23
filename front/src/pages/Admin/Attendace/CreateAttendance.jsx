import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../Auths/api";
import { toast } from "react-toastify";

function CreateAttendance() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setDate(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth("get", `attendances?date=${date}`);
      setAttendanceData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [date]);

  useEffect(() => {
    fetchAttendanceData();
  }, [date]);

  const createAttendanceForDate = async () => {
    if (!date) {
      setError("Please select a date");
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth("post", "attendance", { date });
      if (response.status === 201) {
        toggleModal();
        toast.success(
          "Attendance records created successfully for the selected date"
        );
        fetchAttendanceData();
      } else {
        setError("Failed to create attendance records");
        toast.error("Failed to create attendance records");
      }
    } catch (error) {
      setError("Failed to create attendance records");
      console.error("Error creating attendance records:", error);
      toast.error("Failed to create attendance records");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e, id, oldStatus) => {
    e.preventDefault();
    try {
      const newStatus = e.target.value;
      const response = await fetchWithAuth("patch", `attendance/${id}/status`, {
        status: newStatus,
      });

      if (response.status === 200) {
        setAttendanceData((prevAttendances) =>
          prevAttendances.map((attendance) =>
            attendance.id === id
              ? { ...attendance, status: newStatus }
              : attendance
          )
        );
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const filteredAttendanceData = attendanceData.filter((attendance) => {
    const searchString = searchTerm.toLowerCase();
    return (
      attendance.user.name.toLowerCase().includes(searchString) ||
      attendance.user.email.toLowerCase().includes(searchString) ||
      attendance.user.phone.toLowerCase().includes(searchString) ||
      attendance.user.memberId.toLowerCase().includes(searchString)
    );
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Attendance</h2>
      <div className="flex mb-4">
        <button
          onClick={toggleModal}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-sm mr-4 focus:outline-none"
        >
          Create Attendance
        </button>
        <input
          type="date"
          value={date}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Search by Name, Email, Phone, or Member ID"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-3 py-1 ml-4 focus:outline-none"
        />
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Member ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Attendence</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendanceData.length > 0 ? (
            filteredAttendanceData.map((attendance) => (
              <tr key={attendance.id}>
                <td className="border px-4 py-2">{attendance.user.memberId}</td>
                <td className="text-center border px-4 py-2">
                  {attendance.user.name}
                </td>
                <td className="text-center border px-4 py-2">
                  {attendance.user.phone}
                </td>
                <td className="text-center border px-4 py-2">
                  {attendance.user.email}
                </td>
                <td className="text-center border px-4 py-2">
                  {attendance.date}
                </td>
                <td className="text-center border px-4 py-2">
                  {attendance.status}
                </td>
                <td className="text-center border px-4 py-2">
                  <select
                    value={attendance.status}
                    onChange={(e) =>
                      handleStatusChange(e, attendance.id, attendance.status)
                    }
                  >
                    <option value={attendance.status}>
                      {attendance.status}
                    </option>
                    <option value="Late">Late</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2 text-center " colSpan="7">
                No attendance records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {error && <div className="text-red-600">{error}</div>}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-1">Create Attendance</h2>
            <hr />
            <label htmlFor="date" className="mt-4">Select Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none block w-full max-w-xs"
              style={{ maxWidth: "calc(100% - 1rem)" }}
            />

            {error && <div className="text-red-600">{error}</div>}
            <div className="flex justify-end">
              <button
                onClick={createAttendanceForDate}
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-sm mr-2 focus:outline-none"
              >
                {loading ? "Creating Attendance..." : "Create Attendance"}
              </button>
              <button
                onClick={toggleModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-sm focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateAttendance;
