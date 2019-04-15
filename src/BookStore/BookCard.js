import React, { PureComponent } from 'react'

export default class BookCard extends PureComponent {

    render() {
        //ES5 syntax
        // const title = this.props.title
        // const subtitle = this.props.subtitle
        // const thumbnail = this.props.thumbnail
        // const price = this.props.price

        //ES6 Syntax
        const { title = '', subtitle = '', thumbnail = '', price = '' } = this.props

        return (
            <div className="card">
                <img src={thumbnail} alt={title} style={{ width: '100%' }} />
                <h3>{title}</h3>
                {price && <p className="price">₹{price}</p>}
                <div className="subtitle">
                    <p>{subtitle}</p>
                </div>
                <p><button>Buy Now</button></p>
            </div>
        )
    }
}
