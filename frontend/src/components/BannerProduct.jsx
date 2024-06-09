/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import desktopBannerImage1 from "../assets/banner/desktop/img1.webp";
import desktopBannerImage2 from "../assets/banner/desktop/img2.webp";
import desktopBannerImage3 from "../assets/banner/desktop/img3.jpg";
import desktopBannerImage4 from "../assets/banner/desktop/img4.jpg";
import desktopBannerImage5 from "../assets/banner/desktop/img5.webp";

import mobileBannerImage1 from "../assets/banner/mobile/img1_mobile.jpg";
import mobileBannerImage2 from "../assets/banner/mobile/img2_mobile.webp";
import mobileBannerImage3 from "../assets/banner/mobile/img3_mobile.jpg";
import mobileBannerImage4 from "../assets/banner/mobile/img4_mobile.jpg";
import mobileBannerImage5 from "../assets/banner/mobile/img5_mobile.png";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const BannerProduct = () => {
  const desktopBannerImages = [
    desktopBannerImage1,
    desktopBannerImage2,
    desktopBannerImage3,
    desktopBannerImage4,
    desktopBannerImage5,
  ];
  const mobileBannerImages = [
    mobileBannerImage1,
    mobileBannerImage2,
    mobileBannerImage3,
    mobileBannerImage4,
    mobileBannerImage5,
  ];

  const [currentBannerImage, setCurrentBannerImage] = useState(0);

  const handleNextImage = () => {
    if (desktopBannerImages.length - 1 > currentBannerImage) {
      setCurrentBannerImage((prevImg) => prevImg + 1);
    } else {
      setCurrentBannerImage(0);
    }
  };

  const handlePreviousImage = () => {
    if (currentBannerImage !== 0) {
      setCurrentBannerImage((prevImg) => prevImg - 1);
    } else {
      setCurrentBannerImage(desktopBannerImages.length - 1);
    }
    };
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (desktopBannerImages.length - 1 > currentBannerImage) {
                handleNextImage();
            }
            else {
                setCurrentBannerImage(0);
            }
        }, 5000)
        
        return () => clearInterval(intervalId)
    },[currentBannerImage])
  return (
    <div className="container mx-auto px-4">
      <div className="h-56 md:h-72 w-full  rounded-sm bg-slate-200 relative">
        <div className="absolute z-10 w-full h-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl px-1">
            <button
              onClick={handlePreviousImage}
              className="bg-white shadow-md rounded-full p-2"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleNextImage}
              className="bg-white shadow-md rounded-full p-2"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        {/* DESKTOP & TABLET SCREEN */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopBannerImages.map((image, index) => (
            <div
              key={index + "mobileBannerImage"}
              className="w-full h-full min-w-full min-h-full transition-all"
              style={{
                transform: `translateX(-${currentBannerImage * 100}%)`,
              }}
            >
              <img src={image} alt="Banner" className="w-full h-full" />
            </div>
          ))}
        </div>
        {/* MOBILE SCREEN */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileBannerImages.map((image, index) => (
            <div
              key={index + "desktopBannerImage"}
              className="w-full h-full min-w-full min-h-full transition-all"
              style={{
                transform: `translateX(-${currentBannerImage * 100}%)`,
              }}
            >
              <img
                src={image}
                alt="Banner"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
