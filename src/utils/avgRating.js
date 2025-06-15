export default function GetAvgRating(ratingArr) {
    if (!Array.isArray(ratingArr) || ratingArr.length === 0) {
      return 0; 
    }
  
    // Calculate total ratings
    const totalReviewCount = ratingArr.reduce((acc, curr) => {
      if (typeof curr === "number") {
        return acc + curr; 
      } else if (typeof curr === "object" && curr !== null && "rating" in curr) {
        return acc + curr.rating; 
      }
      return acc;
    }, 0);
  
    // Calculate average rating
    const avgReviewCount = (totalReviewCount / ratingArr.length).toFixed(1);
  
    return parseFloat(avgReviewCount);
  }
  