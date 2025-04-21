import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Banner = () => {
  const setting = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    // nextArrow: <div className="hidden" />,
    // prevArrow: <div className="hidden" />,
  }
  return (
    <div className="slider-container mb-8 overflow-hidden">
      <Slider {...setting}>
        <div>
          <img className='w-full' src="https://cf.shopee.vn/file/vn-11134258-7ra0g-m8ld9u1jeidebc_xxhdpi" alt="" />
        </div>
        <div>
          <img className='w-full' src="https://cf.shopee.vn/file/vn-11134258-7ra0g-m8ldco7vu8w7a0_xxhdpi" alt="" />
        </div>
        <div>
          <img className='w-full' src="https://cf.shopee.vn/file/vn-11134258-7ras8-m5184szf0klz56_xxhdpi" alt="" />
        </div>
      </Slider>
    </div>
  )
}

export default Banner