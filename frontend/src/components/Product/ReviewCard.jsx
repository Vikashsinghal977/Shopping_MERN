import React from 'react'
import ReactStats from "react-rating-stars-component"
import profilePng from "../../images/user.png"

const ReviewCard = ( {review} ) => {

    const Options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true
      };

  return (
    <div className='reviewCard'>

        <img src={profilePng} alt="User" />

        <p>{review.name}</p>

        <ReactStats {...Options} />

        <span>{review.comment}</span>
      
    </div>
  )
}

export default ReviewCard
