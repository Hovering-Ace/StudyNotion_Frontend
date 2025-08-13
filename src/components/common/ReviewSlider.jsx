import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
// Icons
import { FaStar } from "react-icons/fa"
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper"

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"


function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15


  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        //console.log("API raw response:", data)

        if (data?.success) {
          setReviews(data?.allReviews)
        } else {
          console.warn("API success false or no reviews found")
        }
      } catch (err) {
        console.error("Error fetching reviews:", err)
      }
    })()
  }, [])

  return (
      <div className="px-4 py-6">
      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        grabCursor={true}
        className="w-full"
      >
        {reviews.map((review, i) => (
          <SwiperSlide key={i} className="!w-[280px] sm:!w-[320px]">
            <div className="flex flex-col gap-3 bg-richblack-800 p-4 text-sm text-richblack-25 rounded-md w-full h-[200px]">
              {/* User Info */}
              <div className="flex items-center gap-3">
                <img
                  src={
                    review.user.image
                      ? review.user.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${review.user.firstName} ${review.user.lastName}`
                  }
                  alt={`${review.user.firstName} ${review.user.lastName}`}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div>
                  <h1 className="font-semibold text-richblack-5">
                    {review.user.firstName} {review.user.lastName}
                  </h1>
                  <h2 className="text-xs text-richblack-500">
                    {review.course.courseName}
                  </h2>
                </div>
              </div>

              {/* Review Text - Wraps inside fixed height */}
              <p className="font-medium text-richblack-25 break-words overflow-auto">
                {review.review}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-auto">
                <h3 className="font-semibold text-yellow-100">
                  {review.rating.toFixed(1)}
                </h3>
                <ReactStars
                  count={5}
                  value={review.rating}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ReviewSlider
