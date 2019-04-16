import React, { Component } from 'react'
import BookCard from './BookCard'
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
            books: []
        }
    }

    componentDidMount() {
        const me = this
        fetch('https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=40')
            .then(function (resp) { return resp.json() })
            .then(function (data) {
                let books = parseBooks(data)
                if (books && books.length) {
                    me.setState({
                        books: books
                    })
                }
            })
    }

    render() {
        let books = this.state.books || []
        //console.log(books)
        return (
            <div className="container-fluid">
                <div className="row">
                    {/* <BookCard
                    title="Fullstack React"
                    subtitle="The Complete Guide to ReactJS and Friends The Complete Guide to ReactJS and Friends The Complete Guide to ReactJS and Friends"
                    thumbnail="http://books.google.com/books/content?id=ppjUtAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    price="2101.57" /> */}
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
            </div>
        )
    }
}
