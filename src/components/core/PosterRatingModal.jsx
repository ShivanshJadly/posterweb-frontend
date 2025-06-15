import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"
import { useSelector } from "react-redux"

import { createRating } from "../../services/operations/RatingAPI"
import IconBtn from "../common/IconBtn"

export default function PosterRatingModal({ setRatingModal,order }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)

  const {
    handleSubmit,
    setValue,
  } = useForm()

  useEffect(() => {
    setValue("posterRating", 0)
  }, [])

  const ratingChanged = (newRating) => {
    setValue("posterRating", newRating)
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        posterId: order?.poster?.id,
        rating: data.posterRating,
      },
      token
    )
    setRatingModal(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                onClick={() => setRatingModal(false)}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
              >
                Cancel
              </button>
              <IconBtn text="Save" />
            </div>
          </form>
        </div>
      </div>  
  )
}
