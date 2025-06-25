import React from 'react';

// npm i swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import image1 from '../../../additionalFile/home-image/homeImage_1.jpg';
import image2 from '../../../additionalFile/home-image/homeImage_2.jpg';
import image3 from '../../../additionalFile/home-image/homeImage_3.jpg';

const Section_1 = () => {
  const slides = [
    { image: image1, heading: "Posters That Make a Statement." },
    { image: image2, heading: "Express Yourself, Shop Unique Posters Now!" },
    { image: image3, heading: "Art That Speaks, Posters That Inspire!" },
  ];

  return (
    <div className="w-full lg:h-auto overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000, 
          disableOnInteraction: false, 
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full flex justify-center items-center">
              {/* Heading overlay */}
              <div className="absolute lg:bottom-32 bg-black bg-opacity-50 text-white p-4 rounded-lg">
                <h2 className="lg:text-6xl font-bold">{slide.heading}</h2>
              </div>
              {/* Image */}
              <img
                src={slide.image}
                alt={`Carousel slide ${index + 1}`}
                className="w-full md:h-[30rem] lg:h-[50rem] object-cover md:object-fill"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Section_1;
