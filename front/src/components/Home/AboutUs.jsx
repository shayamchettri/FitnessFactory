import React from 'react';

function AboutUs() {
  return (
    <section id='aboutUs'>
    <div className="py-12 bg-gray-200  px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-7">
        <h2 className="text-3xl font-semibold flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" className="mr-3" viewBox="0 0 24 24">
            <path fill="currentColor" d="M11 9h2V7h-2m1 13c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m-1 15h2v-6h-2z"/>
          </svg>
          About Us
        </h2>
        <p className="text-2xl text-gray-500 mt-3">Welcome to Fitness Factory -- <span className='text-red-500 font-extrabold'>Where Your Fitness Journey Begins!</span></p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="md:order-2">
          <img src="./slider1.jpg" alt="Our Team" className="w-[34rem] h-[22rem]  rounded-lg shadow-lg" />
        </div>
        <div className="md:order-1 mt-3">
          <h1 className="text-3xl font-bold text-gray-800 my-4">Discover Fitness Excellence</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Fitness Factory, we're dedicated to helping you achieve your fitness goals. 
            Our supportive environment and expert guidance ensure every workout is a step towards success.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you're a beginner or a seasoned athlete, our facility is equipped to meet your needs. 
            Join us today and let's embark on this journey to a healthier, stronger you together!
          </p>
          <div class="mt-3 w-1/3">
                <button class="w-full flex items-center justify-center px-8 py-3 text-base font-semibold rounded-md text-white bg-red-500 hover:bg-red-400 transition duration-150 ease-in-out" >
                <a
                 href="#services">
                 Our services
                </a> 
                </button>
              </div>
        </div>
      </div>
    </div>
    </section>
  );
}

export default AboutUs;
