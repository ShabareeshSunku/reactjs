import React, { Component } from 'react'
import BookCard from './BookCard'
import ActivityIndicator from './ActivityIndicator'
import Header from './Header'
import { parseBooks, parseSearch } from './helpers'
import RefineSearch from './RefineSearch'
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
        this.onFilterUpdate = this.onFilterUpdate.bind(this)
        this.clearFilters = this.clearFilters.bind(this)
    }

    fetchData() {
        const me = this
        const {
            books = [],
            filters = {},
            query = '',
            selectedauthor,
            selectedcategory,
            selectedpublisher
        } = me.state
        const booklen = books.length
        let encodedQuery = query.replace(/^\s+|\s+$|\s+(?=\s)/g, '').split(' ').join('+')
        if (selectedauthor) {
            encodedQuery = `${encodedQuery}+inauthor:${selectedauthor}`
        }
        if (selectedcategory) {
            encodedQuery = `${encodedQuery}+subject:${selectedcategory}`
        }
        if (selectedpublisher) {
            encodedQuery = `${encodedQuery}+inpublisher:${selectedpublisher}`
        }
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
    componentWillReceiveProps(nextProps) {
        console.log('===>CWR')
        const me = this
        const { location = {} } = me.props
        const { location: nextLocation = {} } = nextProps
        if (location.search !== nextLocation.search) {
            const params = parseSearch(nextLocation.search)
            const stateObj = {
                loading: true
            }
            if (params.q) {
                stateObj.query = params.q.split('+').join(' ')
                stateObj.books = []
                stateObj.filters = getInitialFilters()
            }
            me.setState({ ...stateObj, ...intialSelctions }, function () {
                me.fetchData()
            })
        }
    }

    componentDidMount() {
        console.log('===>CDM')
        const me = this
        const { location = {} } = me.props
        const params = parseSearch(location.search)
        const stateObj = {
            loading: true
        }
        if (params.q) {
            stateObj.query = params.q.split('+').join(' ')
        }
        this.setState(stateObj, function () {
            me.fetchData()
            window.addEventListener('scroll', this.onScroll)
        })
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll)
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
            ['selected' + filterType]: fiterValue,
            books: []
        }, function () {
            this.fetchData()
        })
    }
    clearFilters() {
        this.setState({
            ...intialSelctions,
            books: []
        }, function () {
            this.fetchData()
        })
    }
    render() {
        let {
            books = [],
            query = '',
            filters = {},
            selectedauthor = '',
            selectedpublisher = '',
            selectedcategory = ''
        } = this.state || {}
        return (
            <div>
                <Header query={query}/>
                <div className="bookstore">
                    <RefineSearch
                        query={query}
                        selectedauthor={selectedauthor}
                        selectedcategory={selectedcategory}
                        selectedpublisher={selectedpublisher}
                        filters={filters}
                        onFilterUpdate={this.onFilterUpdate}
                        clearFilters={this.clearFilters}
                    />
                    <div className="row ">
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
                                        authors={book.authors}
                                        id={book.id} />
                                    //ES6 Syntax
                                    // <BookCard {...book} />
                                )
                            })
                        }
                    </div>
                    <ActivityIndicator />
                </div>
            </div>
        )
    }
}
