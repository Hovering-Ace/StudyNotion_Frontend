import React, { useEffect, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";


// import { getAllCourses } from "../../services/operations/courseDetailsAPI"

import Course_Card from "./Course_Card"

function Course_Slider({ Courses }) {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={50}
          loop={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          navigation={{ nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",}}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination,  EffectCoverflow]}
          coverflowEffect={{
            rotate: -20,
            stretch: 0,
            depth: 330,
            modifier: 1,
            slideShadows: true,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="max-h-[30rem] px-6"
        >
          {Courses.map((course) => (
            <SwiperSlide key={course._id}
             className="flex justify-center items-center">
              <Course_Card
                course={course}
                Height="h-[350px]"
                Width="w-[500px]"
                className="shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
              />
            </SwiperSlide>
          ))}
           <div className="swiper-button-prev !text-yellow-25 !font-extrabold !scale-150 hover:!text-yellow-100"></div>
          <div className="swiper-button-next !text-yellow-25 !font-extrabold !scale-150 hover:!text-yellow-100"></div>
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  );
}

export default Course_Slider
