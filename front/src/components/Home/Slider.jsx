import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';

export default function Slider() {
  return (
    <>
      <Swiper
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
        <div className='w-full h-[80vh] relative z-[-1]  '>    
        <img src='slider1.jpg' className='w-full h-full object-cover'/>
        <div className='absolute flex justify-center items-center top-0 w-full h-full bg-[rgba(0,0,0,0.1)] z-10 text-black'>
        <div className='w-[70%]'>
        <div class="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-32 lg:px-8">
          <div class="relative z-10 text-center lg:text-left">
            <div class="mt-12 flex justify-center">
              <div class="rounded-md shadow">
                <button class="w-full flex items-center justify-center px-8 py-3 text-base font-semibold rounded-md text-red-600 bg-white hover:text-red-500 hover:bg-red-100 transition duration-150 ease-in-out">
                <a
                 href="#services">
                  Get Memberships
                  </a>
                </button>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-4">
                <button class="w-full flex items-center justify-center px-8 py-3 text-base font-semibold rounded-md text-white bg-red-500 hover:bg-red-400 transition duration-150 ease-in-out">
                <a
                 href="#contact">
                  Contact Us
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='w-full h-[80vh] relative z-[-1]  '>    
        <img src='slider1.jpg' className='w-full h-full object-cover'/>
        <div className='absolute flex justify-center items-center top-0 w-full h-full bg-[rgba(0,0,0,0.1)] z-10 text-black'>
        <div className='w-[70%]'>
        <div class="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-32 lg:px-8">
          <div class="relative z-10 text-center lg:text-left">
            <div class="mt-12 flex justify-center">
              <div class="rounded-md shadow">
                <button class="w-full flex items-center justify-center px-8 py-3 text-base font-semibold rounded-md text-red-600 bg-white hover:text-red-500 hover:bg-red-100 transition duration-150 ease-in-out">
                <a
                 href="#services">
                  Get Memberships
                  </a>
                </button>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-4">
                <button class="w-full flex items-center justify-center px-8 py-3 text-base font-semibold rounded-md text-white bg-red-500 hover:bg-red-400 transition duration-150 ease-in-out">
                <a
                 href="#contact">
                  Contact Us
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
