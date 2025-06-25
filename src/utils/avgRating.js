export default function GetAvgRating(ratingArr) {
    if (!Array.isArray(ratingArr) || ratingArr.length === 0) {
      return 0; // Return 0 if the input is not an array or is empty
    }
  
    // Calculate total ratings
    const totalReviewCount = ratingArr.reduce((acc, curr) => {
      if (typeof curr === "number") {
        return acc + curr; // Add directly if the element is a number
      } else if (typeof curr === "object" && curr !== null && "rating" in curr) {
        return acc + curr.rating; // Add the rating value if it's an object with a rating field
      }
      return acc; // Skip invalid entries
    }, 0);
  
    // Calculate average rating
    const avgReviewCount = (totalReviewCount / ratingArr.length).toFixed(1);
  
    return parseFloat(avgReviewCount); // Convert the result to a float for consistency
  }
  