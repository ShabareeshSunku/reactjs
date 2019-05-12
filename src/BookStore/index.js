import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import BookPage from './BookPage'
import HomePage from './Home'
import SearchPage from './SearchPage'
import FavoritesPage from './FavoritesPage'
import BookWithHookPage from './BookPageWithHooks'
export default function () {
    return (
        <Router basename="/bookstore">
            <Route exact path='/' component={HomePage}/>
            <Route path='/book/:id' component={BookPage} />
            <Route path='/bookwithhook/:id' component={BookWithHookPage} />
            <Route path='/search' component={SearchPage} />
            <Route path='/favorites' component={FavoritesPage} />
        </Router>
    )
}
