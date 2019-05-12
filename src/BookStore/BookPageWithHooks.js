import React, { useState, useEffect } from 'react'
import PageWrapper from './PageWrapper'
import { parseBook } from './helpers'
import Rating from './Rating'
import BookViewer from './BookViewer'

function useBookFetch(bookId) {
    const [book, setBook] = useState({})
    useEffect(() => {
        if (bookId) {
            fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
                .then(function (res) { return res.json() })
                .then(function (data) {
                    const parsedBook = parseBook(data)
                    setBook(parsedBook)
                })
        }
    },[bookId])
    return book
}
export default function BookPage({ location, history, match, ...rest }) {
    const bookId = match && match.params && match.params.id || ''
    const book = useBookFetch(bookId)
    function showPreview() {
        var elmnt = document.getElementById("viewerCanvas");
        elmnt.scrollIntoView(true);
    }
    const {
        title = '',
        id = '',
        subtitle = '',
        thumbnail = '',
        price = '',
        rating = 0,
        authors = [],
        embeddable = false,
        description = '',
        buyLink = ''
    } = book || {}
    return id ? (
        <PageWrapper>
            <div className="row">
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                    <div className="card-image-container">
                        {
                            thumbnail ? (
                                <img src={thumbnail} alt={title} className="thumbnail-big" />
                            ) : <div className="placeholder">
                                    <span className="fa fa-book default-icon" />
                                </div>
                        }
                    </div>
                </div>
                <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                    <div style={{ padding: '12px' }}>
                        <h2>{title}</h2>
                        {
                            authors.length > 0 ? <p className="authors">By {authors.join(', ')}</p> : null
                        }
                        {price && <p className="price">₹ {price}</p>}
                        {rating ? <Rating rating={rating} /> : null}
                        {subtitle ? <div className="block-with-text" dangerouslySetInnerHTML={{ __html: subtitle }} /> : null}
                        {
                            (embeddable || buyLink.length) ? (
                                <div>
                                    <a href={buyLink}>
                                        <span className="chip button">
                                            Buy Book
                                        </span>
                                    </a>
                                    {
                                        embeddable ? (
                                            <span className="chip button" onClick={showPreview}>Preview Book</span>
                                        ) : null
                                    }

                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
            {
                description ? <div dangerouslySetInnerHTML={{ __html: subtitle }} /> : null
            }

            <BookViewer bookId={id} />

        </PageWrapper >
    ) : <div />
}