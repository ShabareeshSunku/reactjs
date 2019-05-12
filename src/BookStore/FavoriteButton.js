import React from 'react'
import FavContext from './FavContext'

function FavoriteButton(props) {
    //console.log(props)
    return (
        <FavContext.Consumer>
            {
                (value) => {
                    //console.log(value)
                    let isFavorited = false
                    let favorites = value.favorites
                    for (let fav of favorites) {
                        if (fav.id === props.bookId) {
                            isFavorited = true
                            break
                        }
                    }
                    console.log(isFavorited)
                    const className = isFavorited ? 'fa fa-heart' : 'fa fa-heart-o'
                    return (
                        <span className={className+' favIcon'} onClick={() => {
                            if (isFavorited) {
                                value.removeFav(props.bookId)
                            } else {
                                value.addFav(props.book)
                            }
                        }}></span>
                    )

                }
            }
        </FavContext.Consumer>

    )
}

export default FavoriteButton