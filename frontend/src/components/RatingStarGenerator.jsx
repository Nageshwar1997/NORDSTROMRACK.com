import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

const RatingStarGenerator = () => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    function getRandomNumber() {
      // Generate a random number between 0 and 1
      let random = Math.random();

      // Scale it to the range 3 to 5
      let scaled = 3 + random * (5 - 3);

      // Round to one decimal place
      let result = Math.round(scaled * 10) / 10;

      return result;
    }
    const newRating = getRandomNumber();
    setRating(newRating);
  }, []);

  let ratingStarBag = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      ratingStarBag.push(<FaStar key={i + "FaStar"} />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      ratingStarBag.push(<FaStarHalfAlt key={i + "FaStarHalfAlt"} />);
    } else {
      ratingStarBag.push(<FaRegStar key={i + "FaRegStar"} />);
    }
  }

  return (
    <div className="flex text-red-600 text-xl items-center gap-1">
      {ratingStarBag.map((star, index) => (
        <span key={index + "star"}>{star}</span>
      ))}
    </div>
  );
};

export default RatingStarGenerator;
