import React, { PureComponent } from 'react'
import Rating from './Rating'
export default class BookCard extends PureComponent {

    render() {
        //ES5 syntax
        // const title = this.props.title
        // const subtitle = this.props.subtitle
        // const thumbnail = this.props.thumbnail
        // const price = this.props.price

        //ES6 Syntax
        const { title = '', subtitle = '', thumbnail = '', price = '', rating = 0, authors = [] } = this.props

        return (
            <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                <div className="card">
                    <div className="card-inner row">
                        <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 card-image-container">
                            {
                                thumbnail ? (
                                    <img src={thumbnail} alt={title} className="thumbnail"/>
                                ) : <div className="placeholder">
                                        <span className="fa fa-book default-icon" />
                                    </div>
                            }
                        </div>
                        <div className="col-xs-6 col-sm-8 col-md-8 col-lg-8 card-text-container">
                            <h4 className="title">{title}</h4>
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
            </div>
        )
    }
}
