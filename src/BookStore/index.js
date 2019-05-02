import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import BookPage from './BookPage'
import HomePage from './Home'
import SearchPage from './SearchPage'

export default function () {
    return (
        <Router basename="/bookstore">
            <Route exact path='/' component={HomePage}/>
            <Route path='/book/:id' component={BookPage} />
            <Route path='/search' component={SearchPage} />
        </Router>
    )
}
