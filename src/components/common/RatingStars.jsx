import React, { useEffect, useState } from "react"
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"

function RatingStars({ Review_Count, Star_Size }) {
  const [starCount, SetStarCount] = useState({
    full: 0,
    half: 0,
    empty: 0,
  })

  useEffect(() => {
    const wholeStars = Math.floor(Review_Count) || 0
    SetStarCount({
      full: wholeStars,
      half: Number.isInteger(Review_Count) ? 0 : 1,
      empty: Number.isInteger(Review_Count) ? 5 - wholeStars : 4 - wholeStars,
    })
  }, [Review_Count])
  return (
    <div className="flex gap-1 text-yellow-100">
      {[...new Array(starCount.full)].map((_, i) => {
        return <TiStarFullOutline key={i} size={Star_Size || 20} />
      })}
      {[...new Array(starCount.half)].map((_, i) => {
        return <TiStarHalfOutline key={i} size={Star_Size || 20} />
      })}
      {[...new Array(starCount.empty)].map((_, i) => {
        return <TiStarOutline key={i} size={Star_Size || 20} />
      })}
    </div>
  )
}

export default RatingStars



// import React from "react"
// import {
//   TiStarFullOutline,
//   TiStarHalfOutline,
//   TiStarOutline,
// } from "react-icons/ti"

// function RatingStars({ rating, Star_Size = 20 }) {
//   // Clamp rating between 0 and 5
//   const safeRating = Math.min(Math.max(rating, 0), 5)

//   const full = Math.floor(safeRating)
//   const half = Number.isInteger(safeRating) ? 0 : 1
//   const empty = 5 - full - half

//   return (
//     <div className="flex gap-1 text-yellow-100">
//       {[...Array(full)].map((_, i) => (
//         <TiStarFullOutline key={`full-${i}`} size={Star_Size} />
//       ))}
//       {[...Array(half)].map((_, i) => (
//         <TiStarHalfOutline key={`half-${i}`} size={Star_Size} />
//       ))}
//       {[...Array(empty)].map((_, i) => (
//         <TiStarOutline key={`empty-${i}`} size={Star_Size} />
//       ))}
//     </div>
//   )
// }

// export default RatingStars
