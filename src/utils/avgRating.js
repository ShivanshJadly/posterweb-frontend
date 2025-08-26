export default function GetAvgRating(ratingArr) {
    if (!Array.isArray(ratingArr) || ratingArr.length === 0) {
      return 0;
    }
  
    const totalReviewCount = ratingArr.reduce((acc, curr) => {
      if (typeof curr === "number") {
        return acc + curr;
      } else if (typeof curr === "object" && curr !== null && "rating" in curr) {
        return acc + curr.rating;
      }
      return acc;
    }, 0);
  
    const avgReviewCount = (totalReviewCount / ratingArr.length).toFixed(1);
  
    return parseFloat(avgReviewCount);
  }
  