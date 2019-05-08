import React, { PureComponent } from 'react'
import Rating from './Rating'
import { Link } from 'react-router-dom'
export default class BookCard extends PureComponent {

    render() {
        //ES5 syntax
        // const title = this.props.title
        // const subtitle = this.props.subtitle
        // const thumbnail = this.props.thumbnail
        // const price = this.props.price

        //ES6 Syntax
        const { title = '', id = '', subtitle = '', thumbnail = '', price = '', rating = 0, authors = [] } = this.props

        return (
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                <Link to={`/book/${id}`}>
                    <div className="card">
                        <div className="card-inner row">
                            <div className="col-xs-4 col-sm-3 col-md-4 col-lg-4">
                                <div className="card-image-container">
                                    {
                                        thumbnail ? (
                                            <img src={thumbnail} alt={title} className="thumbnail" />
                                        ) : <div className="placeholder">
                                                <span className="fa fa-book default-icon" />
                                            </div>
                                    }
                                </div>
                            </div>
                            <div className="col-xs-8 col-sm-9 col-md-8 col-lg-8 card-text-container">
                                <h2 className="title">{title}</h2>
                                {
                                    authors.length > 0 ? <p className="authors">By {authors.join(', ')}</p> : null
                                }
                                {price && <p className="price">₹ {price}</p>}
                                {rating ? <Rating rating={rating} /> : null}
                                <div className="block-with-text">
                                    {subtitle}
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}
