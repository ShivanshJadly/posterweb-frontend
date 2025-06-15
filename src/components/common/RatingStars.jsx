import React, { useEffect, useState } from "react"
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"
import { getAvgRating } from "../../services/operations/RatingAPI"
import { useSelector } from "react-redux"

function RatingStars({ posterId,Star_Size = 20 }) { // Set default size
  const { token } = useSelector((state) => state.auth)

  // State to store the average rating and star counts
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  const [starCount, setStarCount] = useState({
    full: 0,
    half: 0,
    empty: 5,
  })

  useEffect(() => {
    async function fetchAvgRating() {
      try {
        if (!posterId) return

        // Fetch rating from API
        const response = await getAvgRating(posterId, token)

        if (response >= 0) {
          setAvgReviewCount(response)
        }
      } catch (error) {
        console.error("Error fetching average rating:", error)
      }
    }

    fetchAvgRating()
  }, [posterId, token])

  useEffect(() => {
    // Calculate star breakdown
    const wholeStars = Math.floor(avgReviewCount) || 0
    const hasHalfStar = !Number.isInteger(avgReviewCount)
    setStarCount({
      full: wholeStars,
      half: hasHalfStar ? 1 : 0,
      empty: 5 - wholeStars - (hasHalfStar ? 1 : 0),
    })
  }, [avgReviewCount])

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
  )
}

export default RatingStars
