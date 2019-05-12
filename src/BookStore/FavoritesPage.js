import React, { Component } from 'react';
import FavContext from './FavContext'
import PageWrapper from './PageWrapper'
import BookCard from './BookCard'
class FavList extends Component {
    render() {
        const { favorites: books = [] } = this.context
        return (
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
                        )
                    })
                }
            </div>
        )
    }
}
FavList.contextType = FavContext
export default function Favorites() {
    return (
        <PageWrapper>
            <FavList />
        </PageWrapper>
    )
}