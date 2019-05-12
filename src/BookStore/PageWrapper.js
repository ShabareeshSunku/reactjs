import React, { Component } from 'react'
import Header from './Header'
import FavContext from './FavContext'

export default class PageWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            favorites: []
        }
    }

    componentDidMount() {
        let favorites = []
        try {
            favorites = JSON.parse(localStorage.getItem('bookstore_favs') || '')
        } catch (e) {
            favorites = []
        }
        this.setState({ favorites: favorites })
    }

    addFav = (book) => {
        if (book.id) {
            let favorites
            try {
                favorites = JSON.parse(localStorage.getItem('bookstore_favs') || '')
            } catch (e) {
                favorites = []
            }
            favorites.push(book)
            localStorage.setItem('bookstore_favs', JSON.stringify(favorites))
            this.setState({
                favorites: favorites
            })
        }
    }

    removeFav = (id) => {
        if (id) {
            let favorites
            try {
                favorites = JSON.parse(localStorage.getItem('bookstore_favs') || '')
            } catch (e) {
                favorites = []
            }
            favorites = favorites.filter((fav) => fav.id !== id)
            localStorage.setItem('bookstore_favs', JSON.stringify(favorites))
            this.setState({
                favorites: favorites
            })
        }
    }

    isFavorited = (id) => {
        let favorites
        try {
            favorites = JSON.parse(localStorage.getItem('bookstore_favs') || '')
        } catch (e) {
            favorites = []
        }
        let found = false
        for (let fav in favorites) {
            if (fav.id === id) {
                found = true
                break
            }
        }
        return found
    }
    render() {
        let context = {
            favorites: this.state.favorites,
            addFav: this.addFav,
            isFavorited: this.isFavorited,
            removeFav: this.removeFav
        }
        return (
            <div>
                <FavContext.Provider value={context}>
                    <Header query={this.props.query || ''} />
                    <div className="bookstore">
                        {this.props.children}
                    </div>
                </FavContext.Provider>
            </div>
        )
    }
}
