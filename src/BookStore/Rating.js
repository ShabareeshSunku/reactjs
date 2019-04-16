import React from 'react'

function Rating(props) {
    const {
        rating = 0,
        color = 'orange'
    } = props

    const roundedRating = Math.ceil(rating)
    return (
        [1, 2, 3, 4, 5].map(function (x, index) {
            return (
                <span key={''+index} className="fa fa-star" style={{ color: index < roundedRating ? color : 'silver' }}></span>
            )
        })
    )
}

export default Rating
