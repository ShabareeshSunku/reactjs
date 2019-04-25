import React, { Component } from 'react'
import BookCard from './BookCard'
import ActivityIndicator from './ActivityIndicator'
import Header from './Header'
import Filter from './Filter'
import { parseBooks } from './helpers'
import './bookstore.css'
import './flex-grid.css'
function getInitialFilters() {
    return {
        authors: [],
        publishers: [],
        categories: []
    }
}
const intialSelctions = {
    selectedauthor: '',
    selectedcategory: '',
    selectedpublisher: ''
}
export default class BookStore extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: [],
            loading: false,
            query: 'react js',
            filters: getInitialFilters(),
            ...intialSelctions
        }
        this.fetchData = this.fetchData.bind(this)
        this.onScroll = this.onScroll.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.onFilterUpdate = this.onFilterUpdate.bind(this)
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
                let parsedData = parseBooks(data, filters)
                if (parsedData && parsedData.books.length) {
                    me.setState({
                        books: [].concat(books, parsedData.books),
                        loading: false,
                        filters: parsedData.filters
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
                books: [],
                filters: getInitialFilters(),
                ...intialSelctions
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
    onFilterUpdate(fiterValue, filterType) {
        this.setState({
            ['selected' + filterType]: fiterValue
        })
    }
    render() {
        let books = this.state.books || []
        let query = this.state.query || ''
        let { filters = {}, selectedauthor = '', selectedpublisher = '' } = this.state || {}
        return (
            <div>
                <Header query={query} onSearch={this.onSearch} />
                <Filter
                    items={filters.authors}
                    type='author'
                    selected={selectedauthor}
                    onFilterUpdate={this.onFilterUpdate}
                />
                <Filter
                    items={filters.publishers}
                    type='publisher'
                    selected={selectedpublisher}
                    onFilterUpdate={this.onFilterUpdate}
                />
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
