import React from 'react';
import './card.css';

function Card(props) {
    return (
        <div className="card">
            <img src="https://www.w3schools.com/w3images/jeans3.jpg" alt="Denim Jeans" style={{ width: '100%' }} />
            <h1>Tailored Jeans</h1>
            <p className="price">$19.99</p>
            <p>Some text about the jeans..</p>
            <p><button>Add to Cart</button></p>
        </div>
    )
}
export default Card