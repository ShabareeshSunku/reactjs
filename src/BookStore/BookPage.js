import React, { Component } from 'react'
import PageWrapper from './PageWrapper'
import { parseBook } from './helpers'
import Rating from './Rating'
import BookViewer from './BookViewer'
export default class BookPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            book: {},
            show: false
        }
        this.showPreview = this.showPreview.bind(this)
    }
    componentDidMount() {
        const me = this
        const { match = {} } = me.props
        const bookId = match.params && match.params.id || ''
        if (bookId) {
            fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
                .then(function (res) { return res.json() })
                .then(function (data) {
                    const parsedBook = parseBook(data)
                    me.setState({
                        book: parsedBook
                    })
                })
        }
    }

    showPreview() {
        var elmnt = document.getElementById("viewerCanvas");
        elmnt.scrollIntoView(true);
    }
    render() {
        const {
            title = '',
            id = '',
            subtitle = '',
            thumbnail = '',
            price = '',
            rating = 0,
            authors = [],
            embeddable = false,
            types = [],
            description = '',
            buyLink = ''
        } = this.state.book || {}
        return (
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
                                            <span className="chip button" onClick={this.showHideFilters}>
                                                Buy Book
                                            </span>
                                        </a>
                                        {
                                            embeddable ? <span className="chip button" onClick={this.showPreview}>
                                                {this.state.show ? 'Hide' : 'Show'} Preview
                                                        </span> : null
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
        )
    }
}