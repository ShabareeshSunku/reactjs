import React, { Component } from 'react'
import BookCard from './BookCard'
import ActivityIndicator from './ActivityIndicator'
import Header from './Header'
import { parseBooks } from './helpers'
import './bookstore.css'
import './flex-grid.css'

export default class BookStore extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: [],
            loading: false,
            query: 'react js',
            filters: {
                authors: [],
                publishers: [],
                categories: []
            }
        }
        this.fetchData = this.fetchData.bind(this)
        this.onScroll = this.onScroll.bind(this)
        this.onSearch = this.onSearch.bind(this)
    }

    fetchData() {
        const me = this
        const books = me.state.books
        const query = me.state.query
        const filters = me.state.filters
        const booklen = books.length
        const encodedQuery = query.replace(/^\s+|\s+$|\s+(?=\s)/g, '').split(' ').join('+')
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&startIndex=${booklen + 1}`
        fetch(url)
            .then(function (resp) { return resp.json() })
            .then(function (data) {
                let parsedBooks = parseBooks(data, filters)
                if (parsedBooks && parsedBooks.length) {
                    me.setState({
                        books: [].concat(books, parsedBooks),
                        loading: false
                    })
                }
            })
    }
    componentDidMount() {
        const me = this
        this.setState({
            loading: true
        }, function () {
            me.fetchData()
            window.addEventListener('scroll', this.onScroll)
        })
    }
    componentWillUnmount() {
        window.removeEventListener('scroll')
    }

    onSearch(query = '') {
        const me = this
        if (query.length) {
            me.setState({
                query: query,
                books: []
            }, function () {
                me.fetchData()
            })
        }
    }

    onScroll() {
        const innerHeight = window.innerHeight
        const scrollTop = document.documentElement.scrollTop
        const offsetHeight = document.documentElement.offsetHeight
        if (innerHeight + scrollTop === offsetHeight && this.state.loading === false) {
            this.fetchData()
        }
    }
    render() {
        let books = this.state.books || []
        let query = this.state.query || ''
        return (
            <div>
                <Header query={query} onSearch={this.onSearch} />
                <div className="row bookstore">
                    {
                        books.map(function (book, index) {
                            return (
                                <BookCard
                                    key={book.id + '-' + index}
                                    title={book.title}
                                    subtitle={book.subtitle}
                                    thumbnail={book.thumbnail}
                                    price={book.price}
                                    rating={book.rating}
                                    buyLink={book.buyLink}
                                    authors={book.authors} />
                                //ES6 Syntax
                                // <BookCard {...book} />
                            )
                        })
                    }
                </div>
                <ActivityIndicator />
            </div>
        )
    }
}
