import React, { Component } from 'react'
import BookCard from './BookCard'
import ActivityIndicator from './ActivityIndicator'
import './bookstore.css'
import './flex-grid.css'
function parseBooks(bookData) {
    let books = []
    let items = (bookData && bookData.items && bookData.items) || []
    let itemLen = items.length
    if (itemLen) {
        for (let i = 0; i < itemLen; i++) {
            let ithItem = items[i]
            books.push({
                title: ithItem.volumeInfo.title,
                subtitle: ithItem.volumeInfo.subtitle || ithItem.volumeInfo.description || '',
                thumbnail: ithItem.volumeInfo.imageLinks ? ithItem.volumeInfo.imageLinks.thumbnail : '',
                price: ithItem.saleInfo && ithItem.saleInfo.retailPrice && ithItem.saleInfo.retailPrice.amount,
                buyLink: ithItem.saleInfo && ithItem.saleInfo.buyLink,
                id: ithItem.id,
                rating: ithItem.volumeInfo.averageRating || 0,
                authors: ithItem.volumeInfo.authors || []
            })
        }
    }
    return books
}
export default class BookStore extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: [],
            loading: false
        }
        this.fetchData = this.fetchData.bind(this)
        this.onScroll = this.onScroll.bind(this)
    }

    fetchData() {
        const me = this
        const books = me.state.books
        const booklen = books.length
        const url = `https://www.googleapis.com/books/v1/volumes?q=reactjs&startIndex=${booklen + 1}`
        fetch(url)
            .then(function (resp) { return resp.json() })
            .then(function (data) {
                let parsedBooks = parseBooks(data)
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
    componentWillUnmount(){
      window.removeEventListener('scroll')
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
        return (
            <div className="bookstore">
                <div className="row">
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
