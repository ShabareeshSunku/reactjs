import React from 'react'

const FavContext = React.createContext({
    favorites: [],
    addFav: () => { },
    removeFav: () => { },
    isFavorited:()=>{}
})
export default FavContext