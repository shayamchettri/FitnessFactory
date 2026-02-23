import { Link, useNavigate, useNavigation,Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useState } from 'react';
function Nav() {
  const navigate = useNavigate();
  const isLoggedIn = () => {
    return Cookies.get('accessToken') && Cookies.get('roleId');
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setTimeout(() => {
      setIsOpen(!isOpen);
    }, 300); 
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    Cookies.remove('accessToken');
    Cookies.remove('roleId');
    Cookies.remove('userId');
    navigate("/");
    toast.success('Logout successfull');
  };
  function isMember() {
    const roleId = Cookies.get("roleId");
    return roleId === "2"; 
  }
  return (

    <> 
      <div className="sticky top-0 z-50 bg-white">
      <div className="main -2 w-full xl:w-4/5 xl:mx-auto py-[15px]">
        <nav className="w-full transition-opacity duration-500 ">
          <div className="px-4 py-2 md:flex md:justify-between md:items-center">
            <div className="flex justify-between items-center ">
              <a href="#" className=" flex justify-center text-[1.2rem] font-semibold items-center relative">
                <img src="./img.png" className="w-[3rem] " alt="" /> Fitness Factory
              </a>
              <button
                onClick={toggleMenu}
                className="block text-gray-800 hover:text-black focus:text-black focus:outline-none md:hidden"
              >
                {isOpen ? (
                  <svg
                    className="h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.293 7.707a1 1 0 011.414 0L12 12.586l4.293-4.293a1 1 0 111.414 1.414L13.414 14l4.293 4.293a1 1 0 11-1.414 1.414L12 15.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 14 6.293 9.707a1 1 0 010-1.414z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zM3 11a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zM9 16a1 1 0 100 2h6a1 1 0 100-2H9z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <ul className={`md:flex md:flex-row ${isOpen ? 'block' : 'hidden'} md:space-x-4`}>
              <li className="  pr-[15px] py-[17px] ">
                <Link
                  to="/"
                  className="nav md:text-[.9rem]  2xl:text-[1rem] font-semibold text-black transition-colors duration-300 hover:text-red-500"
                >
                  Home
                </Link>
              </li>
              <li className="  pr-[15px] py-[17px]">
                <a
                 href="#services"
                  className="nav md:text-[.9rem]  2xl:text-[1rem] font-semibold text-black transition-colors duration-300 hover:text-red-500"
                >
                  Services
                </a>
              </li>
              <li className="  pr-[15px] py-[17px]">
                <a
                 href="#aboutUs"
                  className="nav md:text-[.9rem]  2xl:text-[1rem] font-semibold text-black transition-colors duration-300 hover:text-red-500"
                >
                  About Us
                </a>
              </li>
              <li className="  pr-[15px] py-[17px]">
                <a
                 href="#contact"
                  className="nav md:text-[.9rem]  2xl:text-[1rem] font-semibold text-black transition-colors duration-300 hover:text-red-500"
                >
                  Contact
                </a>
              </li>
              <li className="  pr-[15px] py-[11px]">
              <div className="">
      {isLoggedIn() ? (
        <button onClick={handleLogout}
        className="text-white flex   text-[.9rem]  font-semibold px-9 py-2  rounded-sm hover:bg-gray-700 border hover:border-red-600 border-slate-900 bg-black">
        Logout
        </button>
        
      ) : (
        <>
          <a href="/login">
            <button 
            className="text-white flex justify-center items-center   text-[.9rem]  font-semibold px-9 py-2  rounded-sm hover:bg-gray-700 border hover:border-red-600 border-slate-900 bg-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M3.5 9.568v4.864c0 2.294 0 3.44.722 4.153c.655.647 1.674.706 3.596.712a7.656 7.656 0 0 1-.015-.105c-.115-.844-.115-1.916-.115-3.247v-.053c0-.403.331-.73.74-.73c.408 0 .739.327.739.73c0 1.396.001 2.37.101 3.105c.098.714.275 1.093.548 1.362c.273.27.656.445 1.379.54c.744.1 1.731.101 3.146.101h.985c1.415 0 2.401-.002 3.146-.1c.723-.096 1.106-.272 1.378-.541c.273-.27.451-.648.548-1.362c.1-.734.102-1.709.102-3.105V8.108c0-1.397-.002-2.37-.102-3.105c-.097-.714-.275-1.093-.547-1.362c-.273-.27-.656-.445-1.38-.54C17.728 3 16.742 3 15.327 3h-.985c-1.415 0-2.402.002-3.146.1c-.723.096-1.106.272-1.379.541c-.273.27-.45.648-.548 1.362c-.1.734-.101 1.708-.101 3.105c0 .403-.331.73-.74.73a.734.734 0 0 1-.739-.73v-.053c0-1.33 0-2.403.115-3.247l.015-.105c-1.922.006-2.94.065-3.596.712c-.722.713-.722 1.86-.722 4.153m9.885 5.38l2.464-2.432a.723.723 0 0 0 0-1.032l-2.464-2.432a.746.746 0 0 0-1.045 0a.723.723 0 0 0 0 1.032l1.202 1.186H6.457a.734.734 0 0 0-.74.73c0 .403.331.73.74.73h7.085l-1.202 1.186a.723.723 0 0 0 0 1.032a.746.746 0 0 0 1.045 0" clip-rule="evenodd"/></svg>  Login
            </button>
          </a>
        </>
      )}
{isMember() ? (
  <Link to={"/Member"}
    className="text-white w-20 md:w-auto   text-xs md:text-sm font-semibold px-4 py-2 rounded-md hover:bg-red-600 border hover:border-red-600 border-red-600 bg-red-500"
  >
    Dashboard
  </Link>
) :null}
    </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    
     </>

  );
}

export default Nav;
