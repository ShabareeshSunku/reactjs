import React, { Component } from 'react'
import BookCard from './BookCard'
import bookData from './booksdata.json'
import './bookstore.css'

function parseBooks() {
    let books = []
    let items = bookData && bookData.items && bookData.items
    let itemLen = items.length
    if (itemLen) {
        for (let i = 0; i < itemLen; i++) {
            let ithItem = items[i]
            books.push({
                title: ithItem.volumeInfo.title,
                subtitle: ithItem.volumeInfo.subtitle || ithItem.volumeInfo.description || '',
                thumbnail: ithItem.volumeInfo.imageLinks ? ithItem.volumeInfo.imageLinks.thumbnail : '',
                price: ithItem.saleInfo && ithItem.saleInfo.retailPrice && ithItem.saleInfo.retailPrice.amount,
                buyLink: ithItem.saleInfo && ithItem.saleInfo.buyLink
            })
        }
    }
    return books
}
export default class BookStore extends Component {
    render() {
        let books = parseBooks()
        //console.log(books)
        return (
            <div>
                {/* <BookCard
                    title="Fullstack React"
                    subtitle="The Complete Guide to ReactJS and Friends The Complete Guide to ReactJS and Friends The Complete Guide to ReactJS and Friends"
                    thumbnail="http://books.google.com/books/content?id=ppjUtAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    price="2101.57" /> */}
                {
                    books.map(function (book, index) {
                        return (
                            <BookCard
                                title={book.title}
                                subtitle={book.subtitle}
                                thumbnail={book.thumbnail}
                                price={book.price} />
                            //ES6 Syntax
                            // <BookCard {...book} />
                        )
                    })
                }
            </div>
        )
    }
}
