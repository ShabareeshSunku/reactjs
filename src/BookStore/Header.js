import React from 'react'
import Search from './Search'

function Header(props) {
    return (
        <header className="header">
            <div className="text-box">
                <h1 className="heading-primary">
                    <span className="heading-primary-main">The Book Store</span>
                    <span className="heading-primary-sub">Ultimate destination for a Bookworm</span>
                </h1>
            </div>
            <div style={{ position: 'relative' }}>
                <div className='searchbox-container'>
                    <Search {...props} />
                </div>
            </div>
        </header>
    )
}

export default Header