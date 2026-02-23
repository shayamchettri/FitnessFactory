import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useNavigation,Outlet } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { fetchWithAuth } from '../Auths/api';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
function GymDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  const handleLogout = async () => {
    Cookies.remove('accessToken');
    Cookies.remove('roleId');
    Cookies.remove('userId');
    navigate("/");
    toast.success('Logout successfull');
  };
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const closeDropdown = () => {
      setIsOpen(false);
    };
    const user_id = Cookies.get("userId");

    const [isOpenNotification, setIsOpenNotification] = useState(false);
  
    const toggleDropdownNotification = () => {
      setIsOpenNotification(!isOpenNotification);
    };
  
    const closeDropdownNotification = () => {
      setIsOpenNotification(false);
    };
    
  return (
    <div className="flex h-[100vh] bg-white">
      <aside
        className={`w-full md:w-[30%] xl:w-[20%] 2xl:w-[15%] h-full border-gray-300 shadow-lg  border-r relative p-4 ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="flex justify-center items-center">
          <img src="../img.png" className="w-[3em]" alt="" />
        <h2
          className="text-xl font-bold px-3 py-3 "
        >
   Fitness Factory
        </h2>
        </div>
        <div className="border-gray-500 border-b my-5"></div>
        <div className="mt-4">
        <Link to="memberDashboard">
            <p className="text-md my-3 font-medium  w-full text-white  hover:bg-slate-500 bg-gradient-to-br from-purple-500 to-indigo-500 px-5 py-3">
                <i class="fa-solid fa-house mr-1 text-sm"></i> Dashboard
                </p>
            </Link>
          <p className="mt-4 text-gray-500 text-[13px] font-medium">LAYOUTS & PAGES</p>
          <ul className="w-full">
          
              <Link to="notify">
            <li className="text-[16px] my-3 font-light  text-black w-full flex hover:bg-purple-200  px-5 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.54em" height="1.5rem" className="mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2a8.445 8.445 0 0 1 3.55-6.42m12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43a8.495 8.495 0 0 1 3.54 6.42M18 11c0-3.07-1.64-5.64-4.5-6.32V2.5h-3v2.18C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-6 11c.14 0 .27-.01.4-.04c.65-.14 1.18-.58 1.44-1.18c.1-.24.15-.5.15-.78h-4c.01 1.1.9 2 2.01 2"/></svg>
            Notifications
                </li>
              </Link>
              <Link to="survey">
            <li className="text-[16px] my-3 font-light  text-black w-full flex hover:bg-purple-200  px-5 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.54em" height="1.5rem" className="mr-2" viewBox="0 0 26 26"><path fill="currentColor" d="M8.813 0A1 1 0 0 0 8 1v1H4.406C3.606 2 3 2.606 3 3.406V24.5c0 .9.606 1.5 1.406 1.5H21.5c.8 0 1.406-.606 1.406-1.406V3.406c.1-.8-.512-1.406-1.312-1.406H18V1a1 1 0 0 0-1-1H9a1 1 0 0 0-.094 0a1 1 0 0 0-.094 0zM10 2h6v2h-6zM5 4h3v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4h3v20H5zm2 5v4h4V9zm1 1h2v2H8zm5 0v2h6v-2zm-6 5v4h4v-4zm6 1v2h6v-2z"/></svg>
            Surveys
                </li>
              </Link>
              
              <Link to="memberAppointment">
            <li className="text-[16px] my-3 font-light  text-black w-full flex hover:bg-purple-200  px-5 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.54em" height="1.5rem" className="mr-2"  viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M12 2h1.5A1.5 1.5 0 0 1 15 3.5v10a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 0 13.5v-10A1.5 1.5 0 0 1 1.5 2H3V0h1v2h7V0h1zM6 8H3V7h3zm6-1H9v1h3zm-6 4H3v-1h3zm3 0h3v-1H9z" clip-rule="evenodd"/></svg>             Appointments
                </li>
              </Link>
              <Link to="membershipHistory">
            <li className="text-[16px] my-3 font-light  text-black w-full flex hover:bg-purple-200  px-5 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.54em" height="1.5rem" className="mr-2"  
       viewBox="0 0 1536 1536"><path fill="currentColor" d="M1536 768q0 156-61 298t-164 245t-245 164t-298 61q-172 0-327-72.5T177 1259q-7-10-6.5-22.5t8.5-20.5l137-138q10-9 25-9q16 2 23 12q73 95 179 147t225 52q104 0 198.5-40.5T1130 1130t109.5-163.5T1280 768t-40.5-198.5T1130 406T966.5 296.5T768 256q-98 0-188 35.5T420 393l137 138q31 30 14 69q-17 40-59 40H64q-26 0-45-19T0 576V128q0-42 40-59q39-17 69 14l130 129Q346 111 483.5 55.5T768 0q156 0 298 61t245 164t164 245t61 298M896 480v448q0 14-9 23t-23 9H544q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h224V480q0-14 9-23t23-9h64q14 0 23 9t9 23"/></svg> 
            Membership History
                </li>
              </Link>
              <Link to="userWorkouts">
            <li className="text-[16px] my-3 font-light  text-black w-full flex hover:bg-purple-200  px-5 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.54em" height="1.5rem" className="mr-2" 
            viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" d="M9 6a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3zm23 10h-3v16h3zm2 3h3v4h1v2h-1v4h-3zM16 32h3V16h-3zm-2-3h-3v-4h-1v-2h1v-4h3zm7-4h6v-2h-6z" clip-rule="evenodd"/></svg>
           All Workouts
                </li>
              </Link>
          </ul>
        </div>
      </aside>
      <div className="flex-1">
        <header className="bg-white p-4 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="mr-4 text-[1.8rem] text-black">
              {<FaBars />}
              </button>
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </div>
            <div className="float-right mr-4 ">
              <div className="grid grid-cols-2 items-center">
              <div className="relative">
      <button onClick={toggleDropdownNotification} className="focus:outline-none">
        <img
          src="../noti.png"
          alt="Profile"
          className="w-16 rounded-full"
        />
      </button>
      {isOpenNotification && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg">
          <div className="py-1">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div key={notification.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-2 rounded-sm m-4">
                  <p className="text-gray-800 font-semibold flex items-center text-md border-b my-2"> <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6.429 2.413a.75.75 0 0 0-1.13-.986l-1.292 1.48a4.75 4.75 0 0 0-1.17 3.024L2.78 8.65a.75.75 0 0 0 1.5.031l.056-2.718a3.25 3.25 0 0 1 .801-2.069z"/><path fill="currentColor" fill-rule="evenodd" d="M6.237 7.7a4.214 4.214 0 0 1 4.206-3.95H11V3a1 1 0 1 1 2 0v.75h.557a4.214 4.214 0 0 1 4.206 3.95l.221 3.534a7.376 7.376 0 0 0 1.308 3.754a1.617 1.617 0 0 1-1.135 2.529l-3.407.408V19a2.75 2.75 0 1 1-5.5 0v-1.075l-3.407-.409a1.617 1.617 0 0 1-1.135-2.528a7.377 7.377 0 0 0 1.308-3.754zM10.75 19a1.25 1.25 0 0 0 2.5 0v-.75h-2.5z" clip-rule="evenodd"/><path fill="currentColor" d="M17.643 1.355a.75.75 0 0 0-.072 1.058l1.292 1.48a3.25 3.25 0 0 1 .8 2.07l.057 2.717a.75.75 0 1 0 1.5-.031l-.057-2.718a4.75 4.75 0 0 0-1.17-3.024l-1.292-1.48a.75.75 0 0 0-1.058-.072"/></svg> {notification.title}</p>
                  <p className="text-gray-600 text-md font-medium flex items-center "> <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21.25 8.18a9.78 9.78 0 0 0-2.16-3.25a10 10 0 0 0-14.15 0a9.76 9.76 0 0 0-2.17 3.25A10 10 0 0 0 2.01 12a9.74 9.74 0 0 0 .74 3.77l-.5 3.65a1.95 1.95 0 0 0 1.29 2.26c.297.098.613.122.92.07l3.65-.54a9.758 9.758 0 0 0 3.88.79a10 10 0 0 0 9.24-13.82zM7.73 13.61a1.61 1.61 0 1 1 .001-3.22a1.61 1.61 0 0 1 0 3.22m4.28 0a1.61 1.61 0 1 1 .001-3.22a1.61 1.61 0 0 1 0 3.22m4.28 0a1.61 1.61 0 1 1 .001-3.22a1.61 1.61 0 0 1 0 3.22"/></svg> {notification.description}</p>
                  <p className="text-gray-500 text-md flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><path fill="currentColor" d="M10 10a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1" class="clr-i-solid--badged clr-i-solid-path-1--badged"/><path fill="currentColor" d="M30 13.5A7.5 7.5 0 0 1 22.5 6H12.2v3a2.2 2.2 0 0 1-4.4 0V6h-4A1.78 1.78 0 0 0 2 7.81v22.38A1.78 1.78 0 0 0 3.75 32h28.5A1.78 1.78 0 0 0 34 30.19V12.34a7.45 7.45 0 0 1-4 1.16M10 26H8v-2h2Zm0-5H8v-2h2Zm0-5H8v-2h2Zm6 10h-2v-2h2Zm0-5h-2v-2h2Zm0-5h-2v-2h2Zm6 10h-2v-2h2Zm0-5h-2v-2h2Zm0-5h-2v-2h2Zm6 10h-2v-2h2Zm0-5h-2v-2h2Zm0-5h-2v-2h2Z" class="clr-i-solid--badged clr-i-solid-path-2--badged"/><circle cx="30" cy="6" r="5" fill="currentColor" class="clr-i-solid--badged clr-i-solid-path-3--badged clr-i-badge"/><path fill="none" d="M0 0h36v36H0z"/></svg> {notification.announcementDate}</p>
                </div>
              ))
            ) : (
              <p className="px-4 py-2 text-gray-600">No notifications</p>
            )}
          </div>
        </div>
      )}
    </div>
            <div className="relative">
      <button onClick={toggleDropdown} className="focus:outline-none">
        <img
          src="../img.png"
          alt="Profile"
          className="w-16 rounded-full"
        />
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg"
          onClick={closeDropdown}
        >
          <Link to={`/member/memberProfile/${user_id}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                      <i className="fa-regular fa-pen-to-square"></i> Your Profile
                    </Link>
          <a href="#" className="px-4 py-2 text-gray-800 flex items-center hover:bg-gray-200"onClick={handleLogout}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4q0 .425-.288.713T11 5H5v14h6q.425 0 .713.288T12 20q0 .425-.288.713T11 21zm12.175-8H10q-.425 0-.712-.288T9 12q0-.425.288-.712T10 11h7.175L15.3 9.125q-.275-.275-.275-.675t.275-.7q.275-.3.7-.313t.725.288L20.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288t-.713-.313q-.275-.3-.262-.712t.287-.688z"/></svg> Log Out</a>
        </div>
      )}
    </div>
              </div>

            </div>
          </div>
        </header>
       <main className="mx-8 overflow-y-auto h-[80%]">
        <Outlet/>
        </main>
          </div>
          
    </div>
  );
}

export default GymDashboard;
