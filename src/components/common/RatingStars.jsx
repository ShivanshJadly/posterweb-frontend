import { useEffect, useState } from "react";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";

function RatingStars({ avgRating = 0, Star_Size = 20 }) {
  const [starCount, setStarCount] = useState({
    full: 0,
    half: 0,
    empty: 5,
  });

  useEffect(() => {
    const fullStars = Math.floor(avgRating);
    const halfStar = avgRating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    setStarCount({
      full: fullStars,
      half: halfStar,
      empty: emptyStars,
    });
  }, [avgRating]);

  return (
    <div className="flex gap-1 text-yellow-500">
      {[...Array(starCount.full)].map((_, i) => (
        <TiStarFullOutline key={`full-${i}`} size={Star_Size} />
      ))}
      {[...Array(starCount.half)].map((_, i) => (
        <TiStarHalfOutline key={`half-${i}`} size={Star_Size} />
      ))}
      {[...Array(starCount.empty)].map((_, i) => (
        <TiStarOutline key={`empty-${i}`} size={Star_Size} />
      ))}
    </div>
  );
}

export default RatingStars;
