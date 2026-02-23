import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../Auths/api_two';
import { Link } from "react-router-dom";

function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [memberships, setMemberships] = useState([]);
  const [error, setError] = useState(null);
  const itemsPerRow = 5;
  const URL = "http://localhost:5000/";

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerRow);
    }
  };

  const nextSlide = () => {
    if (currentIndex + itemsPerRow < memberships.length) {
      setCurrentIndex(currentIndex + itemsPerRow);
    }
  };

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await fetchApi('get', 'allMemberships');
        setMemberships(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMemberships();
  }, []);

  return (
    <section id='services'>
    <div className="px-2 py-10">
    <div className="text-center mb-7">
        <h2 className="text-3xl font-semibold flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" className="mr-3" viewBox="0 0 24 24"><path fill="currentColor" d="m14.17 13.71l1.4-2.42c.09-.15.05-.34-.08-.45l-1.48-1.16c.03-.22.05-.45.05-.68s-.02-.46-.05-.69l1.48-1.16c.13-.11.17-.3.08-.45l-1.4-2.42c-.09-.15-.27-.21-.43-.15l-1.74.7c-.36-.28-.75-.51-1.18-.69l-.26-1.85a.364.364 0 0 0-.35-.29h-2.8c-.17 0-.32.13-.35.3L6.8 4.15c-.42.18-.82.41-1.18.69l-1.74-.7c-.16-.06-.34 0-.43.15l-1.4 2.42c-.09.15-.05.34.08.45l1.48 1.16c-.03.22-.05.45-.05.68s.02.46.05.69l-1.48 1.16c-.13.11-.17.3-.08.45l1.4 2.42c.09.15.27.21.43.15l1.74-.7c.36.28.75.51 1.18.69l.26 1.85c.03.16.18.29.35.29h2.8c.17 0 .32-.13.35-.3l.26-1.85c.42-.18.82-.41 1.18-.69l1.74.7c.16.06.34 0 .43-.15M8.81 11c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m13.11 7.67l-.96-.74c.02-.14.04-.29.04-.44c0-.15-.01-.3-.04-.44l.95-.74c.08-.07.11-.19.05-.29l-.9-1.55c-.05-.1-.17-.13-.28-.1l-1.11.45c-.23-.18-.48-.33-.76-.44l-.17-1.18a.216.216 0 0 0-.21-.2h-1.79c-.11 0-.21.08-.22.19l-.17 1.18c-.27.12-.53.26-.76.44l-1.11-.45a.23.23 0 0 0-.28.1l-.9 1.55c-.05.1-.04.22.05.29l.95.74a3.145 3.145 0 0 0 0 .88l-.95.74c-.08.07-.11.19-.05.29l.9 1.55c.05.1.17.13.28.1l1.11-.45c.23.18.48.33.76.44l.17 1.18c.02.11.11.19.22.19h1.79c.11 0 .21-.08.22-.19l.17-1.18c.27-.12.53-.26.75-.44l1.12.45c.1.04.22 0 .28-.1l.9-1.55c.06-.09.03-.21-.05-.28m-4.29.16a1.35 1.35 0 1 1 .001-2.701a1.35 1.35 0 0 1-.001 2.701"/></svg>
       Our Services
        </h2>
        <p className="text-2xl text-gray-500 mt-3"> <span className='text-red-500 font-extrabold'>Where Your Fitness Journey Begins!</span></p>
      </div>
      <div id="services" className="mx-[8rem]  relative overflow-hidden">
      <div className="grid sm:grid-cols-1  md:grid-cols-2 xl:grid-cols-5 gap-4">
  {memberships.map((membership, index) => (
    <div key={membership.id} className="service flex flex-col items-center justify-center rounded-xl border-2 border-gray-500 bg-white px-2 py-5 shadow-sm">
      <img
        src={`${URL}${membership.image}`}
        alt="Service Image"
        className="w-[90%] h-[10rem] object-cover object-fit transition-opacity duration-300 rounded-md mb-4"
        title={membership.name}
      />
      <h3 className="text-lg font-semibold mb-2 flex"> <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h18v13h-6.077v4.27L12 18.807l-2.923 1.461V16H3zm1 9.577h16v-2.154H4z"/></svg> {membership.name}</h3>
      <p className="text-gray-600">{membership.description}</p>
      <p className="text-gray-900 font-semibold">NRS: {membership.price}</p>
    </div>
  ))}
</div>

        <div className="absolute top-0 flex w-full justify-between h-full items-center">
        <button className="text-[2rem]" onClick={prevSlide}>&#10094;</button>
        <button className="text-[2rem]" onClick={nextSlide}>&#10095;</button>
      </div>
      </div>
    </div>
    </section>
  );
}

export default Services;
